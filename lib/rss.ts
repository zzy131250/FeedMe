import type { FeedData, FeedItem } from "./types"
import { loadFeedData } from "./data-store"

/**
 * 获取RSS源数据
 */
export async function fetchRssFeed(url: string): Promise<FeedData> {
  try {
    // 从静态数据加载
    const cachedData = await loadFeedData(url)
    if (cachedData) {
      return cachedData
    }

    // 如果没有找到数据，返回空数据对象
    console.warn(`No data available for ${url}`)
    return {
      sourceUrl: url,
      title: "未找到数据",
      description: "没有可用的数据源",
      link: url,
      items: [],
      lastUpdated: new Date().toISOString(),
    }
  } catch (error) {
    console.error("Error fetching RSS feed:", error)
    throw new Error(`获取RSS源失败: ${error instanceof Error ? error.message : String(error)}`)
  }
}
