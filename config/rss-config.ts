export interface RssSource {
  name: string
  url: string
  category: string
}

export interface CronConfig {
  schedule: string // cron表达式，例如 "0 */6 * * *" 表示每6小时
  enabled: boolean
}

export interface AppConfig {
  sources: RssSource[]
  cron: CronConfig
  maxItemsPerFeed: number
  dataPath: string
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
  cron: {
    schedule: "0 */6 * * *", // 每6小时执行一次
    enabled: true,
  },
  maxItemsPerFeed: 20,
  dataPath: "./data",
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
