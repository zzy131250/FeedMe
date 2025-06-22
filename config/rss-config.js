// RSS源接口
// name: 信息源名称
// url: RSS URL地址
// category: 分类名称

/**
 * @typedef {object} RssSource
 * @property {string} name - 信息源名称
 * @property {string} url - RSS URL地址
 * @property {string} category - 分类名称
 */

// 默认配置
export const config = {
  sources: [
    {
      name: "Hacker News 近期最佳",
      url: "https://hnrss.org/best",
      category: "科技资讯",
    },
    {
      name: "36Kr热榜",
      url: "https://rsshub.app/36kr/hot-list",
      category: "科技资讯",
    },
    {
      name: "Github Trending",
      url: "https://rsshub.app/github/trending/daily/javascript/en",
      category: "代码项目",
    },
    {
      name: "Hugging Face 每日论文",
      url: "https://rsshub.app/huggingface/daily-papers",
      category: "科研论文",
    },
    {
      name: "lwn.net",
      url: "https://lwn.net/headlines/rss",
      category: "论坛",
    },
    {
      name: "V2EX 今日热门",
      url: "https://rsshub.app/v2ex/topics/hot",
      category: "论坛",
    },
    {
      name: "云原生社区（中国）",
      url: "https://rsshub.app/cloudnative/blog",
      category: "博客",
    },
  ],
  maxItemsPerFeed: 10,
  dataPath: "./data",
}

export const defaultSource = config.sources[0]

/**
 * @param {string} url
 * @returns {RssSource | undefined}
 */
export function findSourceByUrl(url) {
  return config.sources.find((source) => source.url === url)
}

export function getSourcesByCategory() {
  return config.sources.reduce((acc, source) => {
    if (!acc[source.category]) {
      acc[source.category] = []
    }
    acc[source.category].push(source)
    return acc
  }, {})
}
