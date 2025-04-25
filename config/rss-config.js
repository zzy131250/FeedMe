// RSS源接口
// name: 信息源名称
// url: RSS URL地址
// category: 分类名称

// 默认配置
export const config = {
  sources: [
    // 科技类
    {
      name: "Hacker News Best",
      url: "https://hnrss.org/best",
      category: "科技资讯",
    },
    {
      name: "Github Trending Today",
      url: "https://rsshub.rssforever.com/github/trending/daily/any",
      category: "代码项目",
    },
    {
      name: "Hugging Face Daily Papers",
      url: "https://rsshub.rssforever.com/huggingface/daily-papers",
      category: "科研论文",
    },
    {
      name: "Hugging Face Blog",
      url: "https://rsshub.rssforever.com/huggingface/blog",
      category: "科研论文",
    },
    {
      name: "Product Hunt Today",
      url: "https://rsshub.rssforever.com/producthunt/today",
      category: "产品资讯",
    },
    {
      name: "V2EX 最热主题",
      url: "https://rsshub.rssforever.com/v2ex/topics/hot",
      category: "论坛",
    },
  ],
  maxItemsPerFeed: 30,
  dataPath: "./data",
}

export const defaultSource = config.sources[0]

export function findSourceByUrl(url) {
  return config.sources.find((source) => source.url === url)
}

export function getSourcesByCategory() {
  return config.sources.reduce(
    (acc, source) => {
      if (!acc[source.category]) {
        acc[source.category] = []
      }
      acc[source.category].push(source)
      return acc
    },
    {},
  )
} 