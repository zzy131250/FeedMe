"use server"

import fs from "fs"
import path from "path"
import { config } from "@/config/rss-config"
import type { FeedData, FeedItem } from "@/lib/types"

// 确保数据目录存在
async function ensureDataDir() {
  const dataDir = path.join(process.cwd(), config.dataPath)
  if (!fs.existsSync(dataDir)) {
    await fs.promises.mkdir(dataDir, { recursive: true })
  }
  return dataDir
}

// 获取源的文件路径
async function getSourceFilePath(sourceUrl: string): Promise<string> {
  const dataDir = await ensureDataDir()
  // 使用URL的哈希作为文件名，避免非法字符
  const sourceHash = Buffer.from(sourceUrl).toString("base64").replace(/[/+=]/g, "_")
  return path.join(dataDir, `${sourceHash}.json`)
}

// 保存源数据到文件
export async function saveFeedData(sourceUrl: string, data: FeedData): Promise<void> {
  const filePath = await getSourceFilePath(sourceUrl)

  try {
    await fs.promises.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8")
    console.log(`Saved data for ${sourceUrl} to ${filePath}`)
  } catch (error) {
    console.error(`Error saving data for ${sourceUrl}:`, error)
    throw new Error(`Failed to save feed data: ${error instanceof Error ? error.message : String(error)}`)
  }
}

// 从文件加载源数据
export async function loadFeedData(sourceUrl: string): Promise<FeedData | null> {
  const filePath = await getSourceFilePath(sourceUrl)

  try {
    if (!fs.existsSync(filePath)) {
      return null
    }

    const data = await fs.promises.readFile(filePath, "utf-8")
    return JSON.parse(data) as FeedData
  } catch (error) {
    console.error(`Error loading data for ${sourceUrl}:`, error)
    return null
  }
}

// 获取所有已缓存的源URL
export async function getAllCachedSources(): Promise<string[]> {
  const dataDir = await ensureDataDir()

  try {
    const files = await fs.promises.readdir(dataDir)
    const sources: string[] = []

    for (const file of files) {
      if (file.endsWith(".json")) {
        try {
          const data = await fs.promises.readFile(path.join(dataDir, file), "utf-8")
          const feedData = JSON.parse(data) as FeedData
          if (feedData.sourceUrl) {
            sources.push(feedData.sourceUrl)
          }
        } catch {
          // Skip invalid files
        }
      }
    }

    return sources
  } catch (error) {
    console.error("Error getting cached sources:", error)
    return []
  }
}

// 合并新旧数据，只保留最新的条目并且只为新条目生成摘要
export async function mergeFeedItems(
  oldItems: FeedItem[] = [],
  newItems: FeedItem[] = [],
  maxItems: number = config.maxItemsPerFeed,
): Promise<{
  mergedItems: FeedItem[]
  newItemsForSummary: FeedItem[]
}> {
  // 创建一个Map来存储所有条目，使用链接作为键
  const itemsMap = new Map<string, FeedItem>()

  // 添加旧条目到Map
  for (const item of oldItems) {
    if (item.link) {
      itemsMap.set(item.link, item)
    }
  }

  // 识别需要生成摘要的新条目
  const newItemsForSummary: FeedItem[] = []

  // 添加新条目到Map，并标记需要生成摘要的条目
  for (const item of newItems) {
    if (item.link) {
      const existingItem = itemsMap.get(item.link)

      if (!existingItem) {
        // 这是一个新条目，需要生成摘要
        newItemsForSummary.push(item)
      }

      // 无论如何都更新Map，使用新条目（但保留旧摘要如果有的话）
      const serializedItem: FeedItem = {
        ...item,
        summary: existingItem?.summary || item.summary,
      }
      
      // 确保enclosure是纯对象，防止序列化问题
      if (item.enclosure) {
        serializedItem.enclosure = {
          url: item.enclosure.url || "",
          type: item.enclosure.type || "",
        }
      }
      
      itemsMap.set(item.link, serializedItem)
    }
  }

  // 将Map转换回数组，但保持原始RSS源的顺序
  // 使用newItems的顺序作为基准，确保显示的是最新抓取的RSS源顺序
  const mergedItems = newItems
    .filter(item => item.link && itemsMap.has(item.link as string))
    .map(item => item.link ? itemsMap.get(item.link) as FeedItem : item)
    .slice(0, maxItems); // 只保留指定数量的条目

  return { mergedItems, newItemsForSummary }
}
