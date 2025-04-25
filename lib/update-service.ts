import { fetchRssFeed } from "@/lib/rss"
import { generateSummary } from "@/lib/generate-summary"
import { loadFeedData, saveFeedData, mergeFeedItems } from "@/lib/data-store"
import { config } from "@/config/rss-config"
import type { FeedData } from "@/lib/types"

// 针对客户端检查
const isClient = typeof window !== 'undefined';

// 更新单个源
export async function updateFeed(sourceUrl: string): Promise<FeedData> {
  // 客户端不支持此功能
  if (isClient) {
    console.warn("updateFeed功能在浏览器环境中不可用");
    // 返回已缓存的数据，如果有的话
    const cachedData = await loadFeedData(sourceUrl);
    if (cachedData) {
      return cachedData;
    }
    throw new Error("无法在浏览器环境中更新源");
  }

  console.log(`Updating feed for ${sourceUrl}`)

  try {
    // 获取现有数据
    const existingData = await loadFeedData(sourceUrl)

    // 获取新数据
    const newFeed = await fetchRssFeed(sourceUrl)

    // 合并数据，找出需要生成摘要的新条目
    const { mergedItems, newItemsForSummary } = await mergeFeedItems(
      existingData?.items || [],
      newFeed.items,
      config.maxItemsPerFeed,
    )

    console.log(`Found ${newItemsForSummary.length} new items for ${sourceUrl}`)

    // 为新条目生成摘要
    const itemsWithSummaries = await Promise.all(
      mergedItems.map(async (item) => {
        // 如果是新条目且需要生成摘要
        if (newItemsForSummary.some((newItem) => newItem.link === item.link) && !item.summary) {
          try {
            const summary = await generateSummary(item.title, item.content || item.contentSnippet || "")
            return { ...item, summary }
          } catch (err) {
            console.error(`Error generating summary for ${item.title}:`, err)
            return { ...item, summary: "无法生成摘要。" }
          }
        }
        // 否则保持不变
        return item
      }),
    )

    // 创建新的数据对象
    const updatedData: FeedData = {
      sourceUrl,
      title: newFeed.title,
      description: newFeed.description,
      link: newFeed.link,
      items: itemsWithSummaries,
      lastUpdated: new Date().toISOString(),
    }

    // 保存到文件
    await saveFeedData(sourceUrl, updatedData)

    return updatedData
  } catch (error) {
    console.error(`Error updating feed for ${sourceUrl}:`, error)
    throw new Error(`Failed to update feed: ${error instanceof Error ? error.message : String(error)}`)
  }
}

// 更新所有源
export async function updateAllFeeds(): Promise<Record<string, boolean>> {
  // 客户端不支持此功能
  if (isClient) {
    console.warn("updateAllFeeds功能在浏览器环境中不可用");
    return {};
  }

  console.log("Starting update for all feeds")

  const results: Record<string, boolean> = {}

  for (const source of config.sources) {
    try {
      await updateFeed(source.url)
      results[source.url] = true
    } catch (error) {
      console.error(`Failed to update ${source.url}:`, error)
      results[source.url] = false
    }
  }

  console.log("Completed update for all feeds")
  return results
}
