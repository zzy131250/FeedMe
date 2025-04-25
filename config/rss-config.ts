export interface RssSource {
  name: string
  url: string
  category: string
}

export interface AppConfig {
  sources: RssSource[]
  maxItemsPerFeed: number
  dataPath: string
  updateEnabled: boolean  // 更新为简单的启用/禁用标志
}

// 默认配置
export const config: AppConfig = {
  sources: [
    // 科技类
    {
      name: "Hacker News Best",
      url: "https://hnrss.org/best",
      category: "资讯",
    },
    {
      name: "Github Trending Today",
      url: "https://rsshub.rssforever.com/github/trending/daily/any",
      category: "项目",
    },
    {
      name: "Hugging Face Daily Papers",
      url: "https://rsshub.rssforever.com/huggingface/daily-papers",
      category: "科研",
    },
    {
      name: "Hugging Face Blog",
      url: "https://rsshub.rssforever.com/huggingface/blog",
      category: "科研",
    },
    {
      name: "Product Hunt Today",
      url: "https://rsshub.rssforever.com/producthunt/today",
      category: "产品",
    }
  ],
  maxItemsPerFeed: 20,
  dataPath: "./data",
  updateEnabled: true,  // 默认启用更新功能
}

export const defaultSource = config.sources[0]

export function findSourceByUrl(url: string): RssSource | undefined {
  return config.sources.find((source) => source.url === url)
}

export function getSourcesByCategory(): Record<string, RssSource[]> {
  return config.sources.reduce(
    (acc, source) => {
      if (!acc[source.category]) {
        acc[source.category] = []
      }
      acc[source.category].push(source)
      return acc
    },
    {} as Record<string, RssSource[]>,
  )
}
