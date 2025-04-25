export interface Source {
  name: string
  url: string
  category: string
}

export const sources: Source[] = [
  // 科技类
  {
    name: "Hacker News",
    url: "https://hnrss.org/frontpage",
    category: "科技",
  },
  {
    name: "TechCrunch",
    url: "https://techcrunch.com/feed/",
    category: "科技",
  },
  {
    name: "The Verge",
    url: "https://www.theverge.com/rss/index.xml",
    category: "科技",
  },
  {
    name: "Wired",
    url: "https://www.wired.com/feed/rss",
    category: "科技",
  },

  // 新闻类
  {
    name: "BBC News",
    url: "http://feeds.bbci.co.uk/news/world/rss.xml",
    category: "新闻",
  },
  {
    name: "CNN",
    url: "http://rss.cnn.com/rss/edition.rss",
    category: "新闻",
  },
  {
    name: "NPR News",
    url: "https://feeds.npr.org/1001/rss.xml",
    category: "新闻",
  },

  // 中文科技
  {
    name: "少数派",
    url: "https://sspai.com/feed",
    category: "中文科技",
  },
  {
    name: "36氪",
    url: "https://36kr.com/feed",
    category: "中文科技",
  },
  {
    name: "InfoQ",
    url: "https://feed.infoq.com/cn/articles",
    category: "中文科技",
  },

  // 博客
  {
    name: "CSS Tricks",
    url: "https://css-tricks.com/feed/",
    category: "博客",
  },
  {
    name: "Smashing Magazine",
    url: "https://www.smashingmagazine.com/feed/",
    category: "博客",
  },
]

export const defaultSources = [
  sources[0], // Hacker News as default
]

export function findSourceByUrl(url: string): Source | undefined {
  return sources.find((source) => source.url === url)
}
