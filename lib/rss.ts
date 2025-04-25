"use server"

import Parser from "rss-parser"
import type { FeedItem } from "./types"

// Create a new parser instance
const parser = new Parser({
  customFields: {
    item: [
      ["content:encoded", "content"],
      ["dc:creator", "creator"],
    ],
  },
})

export async function fetchRssFeed(url: string) {
  try {
    // Fetch the feed directly from the server
    const response = await fetch(url, { next: { revalidate: 60 } })

    if (!response.ok) {
      throw new Error(`Failed to fetch RSS feed: ${response.status} ${response.statusText}`)
    }

    const xml = await response.text()

    // Parse the XML string
    const feed = await parser.parseString(xml)

    // 处理items，确保所有对象都是可序列化的纯对象
    const serializedItems = feed.items.map(item => {
      // 创建新的纯对象，避免类实例或非可序列化对象
      const serializedItem: FeedItem = {
        title: item.title || "",
        link: item.link || "",
        pubDate: item.pubDate || "",
        isoDate: item.isoDate || "",
        content: item.content || "",
        contentSnippet: item.contentSnippet || "",
        creator: item.creator || "",
      }
      
      // 如果存在enclosure，以纯对象形式添加
      if (item.enclosure) {
        serializedItem.enclosure = {
          url: item.enclosure.url || "",
          type: item.enclosure.type || "",
        }
      }
      
      return serializedItem
    })

    return {
      title: feed.title || "",
      description: feed.description || "",
      link: feed.link || "",
      items: serializedItems,
    }
  } catch (error) {
    console.error("Error fetching RSS feed:", error)
    throw new Error(`Failed to fetch RSS feed: ${error instanceof Error ? error.message : String(error)}`)
  }
}
