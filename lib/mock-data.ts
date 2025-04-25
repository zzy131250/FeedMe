import type { FeedData } from "@/lib/types"

// 创建模拟数据，用于在浏览器环境中替代API调用
export const mockFeedData: Record<string, FeedData> = {
  // 默认模拟数据，当没有特定源的数据时使用
  default: {
    sourceUrl: "default",
    title: "模拟数据源",
    description: "这是一个模拟的数据源，用于在浏览器环境中展示",
    link: "https://example.com",
    items: Array.from({ length: 10 }).map((_, i) => ({
      title: `模拟文章 ${i + 1}`,
      link: `https://example.com/article-${i + 1}`,
      pubDate: new Date(Date.now() - i * 86400000).toISOString(),
      isoDate: new Date(Date.now() - i * 86400000).toISOString(),
      content: `<p>这是模拟文章 ${i + 1} 的内容。这里包含了一些示例文本，用于展示文章的排版和样式。</p>`,
      contentSnippet: `这是模拟文章 ${i + 1} 的内容。这里包含了一些示例文本。`,
      creator: "模拟作者",
      summary: `这是模拟文章 ${i + 1} 的AI生成摘要。该文章讨论了一个重要的技术话题，包含了对最新发展的分析和见解。作者提出了一些有趣的观点，并提供了实用的建议。`,
    })),
    lastUpdated: new Date().toISOString(),
  },

  // 为特定源提供模拟数据
  "https://hnrss.org/best": {
    sourceUrl: "https://hnrss.org/best",
    title: "Hacker News: Best",
    description: "Hacker News RSS",
    link: "https://news.ycombinator.com/best",
    items: [
      {
        title: "开源项目如何可持续发展",
        link: "https://example.com/article-1",
        pubDate: new Date(Date.now() - 2 * 3600000).toISOString(),
        isoDate: new Date(Date.now() - 2 * 3600000).toISOString(),
        content: "<p>开源项目的可持续发展一直是社区关注的焦点。本文探讨了几种成功的商业模式和社区建设策略。</p>",
        contentSnippet: "开源项目的可持续发展一直是社区关注的焦点。本文探讨了几种成功的商业模式和社区建设策略。",
        creator: "开源爱好者",
        summary:
          "本文深入探讨了开源项目的可持续发展模式，分析了包括企业赞助、开源基金会支持、双重许可等多种商业模式的优缺点。作者强调社区建设和透明治理对项目长期成功的重要性，并提供了实际案例分析。",
      },
      {
        title: "人工智能在医疗领域的伦理挑战",
        link: "https://example.com/article-2",
        pubDate: new Date(Date.now() - 5 * 3600000).toISOString(),
        isoDate: new Date(Date.now() - 5 * 3600000).toISOString(),
        content:
          "<p>随着AI在医疗诊断中的应用日益广泛，相关的伦理问题也日益凸显。本文讨论了隐私、责任归属和算法偏见等关键问题。</p>",
        contentSnippet: "随着AI在医疗诊断中的应用日益广泛，相关的伦理问题也日益凸显。",
        creator: "医学科技评论员",
        summary:
          "随着人工智能在医疗领域的应用不断深入，本文探讨了其带来的伦理挑战，包括患者数据隐私保护、诊断责任归属、算法偏见等问题。作者呼吁建立更完善的监管框架和伦理准则，确保AI技术在造福患者的同时不侵犯其权益。",
      },
      {
        title: "远程工作的未来：后疫情时代的工作模式变革",
        link: "https://example.com/article-3",
        pubDate: new Date(Date.now() - 8 * 3600000).toISOString(),
        isoDate: new Date(Date.now() - 8 * 3600000).toISOString(),
        content: "<p>疫情加速了远程工作的普及，本文分析了这一趋势对企业文化、生产力和城市发展的长期影响。</p>",
        contentSnippet: "疫情加速了远程工作的普及，本文分析了这一趋势的长期影响。",
        creator: "职场观察家",
        summary:
          "本文分析了疫情后远程工作模式的持续影响，指出混合工作模式正成为主流。研究表明，灵活的工作安排提高了员工满意度和生产力，但也带来了团队协作和企业文化维护的挑战。文章还探讨了这一趋势对城市规划、房地产市场和通勤模式的深远影响。",
      },
      {
        title: "量子计算的商业应用前景",
        link: "https://example.com/article-4",
        pubDate: new Date(Date.now() - 12 * 3600000).toISOString(),
        isoDate: new Date(Date.now() - 12 * 3600000).toISOString(),
        content: "<p>量子计算技术正从实验室走向商业应用。本文介绍了金融、物流和药物研发等领域的潜在应用案例。</p>",
        contentSnippet: "量子计算技术正从实验室走向商业应用。",
        creator: "科技分析师",
        summary:
          "量子计算正逐步从理论研究迈向实际应用，本文详细分析了其在金融风险建模、供应链优化和药物分子模拟等领域的商业前景。尽管量子优势尚未在所有领域实现，但领先企业已开始布局相关技术，为未来竞争做准备。文章还讨论了量子计算面临的技术挑战和投资机会。",
      },
      {
        title: "编程语言的演化：从命令式到声明式",
        link: "https://example.com/article-5",
        pubDate: new Date(Date.now() - 24 * 3600000).toISOString(),
        isoDate: new Date(Date.now() - 24 * 3600000).toISOString(),
        content:
          "<p>编程范式的变化反映了软件开发理念的演进。本文追溯了从早期命令式语言到现代声明式和函数式语言的发展历程。</p>",
        contentSnippet: "编程范式的变化反映了软件开发理念的演进。",
        creator: "编程语言专家",
        summary:
          "本文梳理了编程语言从命令式到声明式的演化历程，分析了这一转变背后的技术驱动因素和思维模式变化。作者指出，随着系统复杂度增加和并行计算需求提升，声明式和函数式编程的优势日益凸显。文章还探讨了不同范式的适用场景，以及未来编程语言可能的发展方向。",
      },
    ],
    lastUpdated: new Date().toISOString(),
  },

  "https://rsshub.rssforever.com/github/trending/daily/any": {
    sourceUrl: "https://rsshub.rssforever.com/github/trending/daily/any",
    title: "GitHub Trending",
    description: "GitHub 每日热门项目",
    link: "https://github.com/trending",
    items: [
      {
        title: "openai/gpt-4",
        link: "https://github.com/openai/gpt-4",
        pubDate: new Date(Date.now() - 1 * 3600000).toISOString(),
        isoDate: new Date(Date.now() - 1 * 3600000).toISOString(),
        content: "<p>GPT-4是OpenAI最新的大型多模态模型，能够接受图像和文本输入并生成文本输出。</p>",
        contentSnippet: "GPT-4是OpenAI最新的大型多模态模型。",
        creator: "OpenAI",
        summary:
          "GPT-4是OpenAI推出的最新一代大型语言模型，支持多模态输入，可处理图像和文本并生成高质量文本输出。该模型在各种专业和学术基准测试中表现出色，具有更强的推理能力和创造性。项目仓库包含模型架构说明、使用指南和API文档，吸引了大量开发者关注。",
      },
      {
        title: "facebook/react-native",
        link: "https://github.com/facebook/react-native",
        pubDate: new Date(Date.now() - 3 * 3600000).toISOString(),
        isoDate: new Date(Date.now() - 3 * 3600000).toISOString(),
        content: "<p>React Native是一个框架，允许开发者使用React和原生平台的能力来构建Android和iOS应用。</p>",
        contentSnippet: "React Native是一个框架，允许开发者使用React构建移动应用。",
        creator: "Facebook",
        summary:
          "React Native是Facebook开发的跨平台移动应用框架，允许开发者使用JavaScript和React构建原生体验的Android和iOS应用。该框架近期更新了新的架构，提升了性能和开发体验，引入了Fabric渲染器和Turbo模块系统。项目持续活跃开发，社区贡献活跃，是移动应用开发的主流选择之一。",
      },
      {
        title: "microsoft/TypeScript",
        link: "https://github.com/microsoft/TypeScript",
        pubDate: new Date(Date.now() - 6 * 3600000).toISOString(),
        isoDate: new Date(Date.now() - 6 * 3600000).toISOString(),
        content: "<p>TypeScript是JavaScript的超集，添加了静态类型定义。</p>",
        contentSnippet: "TypeScript是JavaScript的超集，添加了静态类型定义。",
        creator: "Microsoft",
        summary:
          "TypeScript是由Microsoft开发的JavaScript超集，通过添加静态类型系统增强了代码质量和开发效率。最新版本引入了更多高级类型功能和性能优化，支持更精确的类型推断和更好的IDE集成体验。该项目在GitHub上拥有大量星标，是现代Web开发的重要工具，被众多大型项目和框架采用。",
      },
      {
        title: "denoland/deno",
        link: "https://github.com/denoland/deno",
        pubDate: new Date(Date.now() - 9 * 3600000).toISOString(),
        isoDate: new Date(Date.now() - 9 * 3600000).toISOString(),
        content: "<p>Deno是一个简单、现代且安全的JavaScript和TypeScript运行时环境。</p>",
        contentSnippet: "Deno是一个简单、现代且安全的JavaScript和TypeScript运行时环境。",
        creator: "Deno Land",
        summary:
          "Deno是由Node.js原创者开发的新一代JavaScript/TypeScript运行时，采用Rust构建，内置安全特性和现代Web标准。它无需package.json和node_modules，支持ES模块和顶级await，提供内置工具链和标准库。最新版本增强了npm兼容性和性能，使其更适合生产环境使用，吸引了大量开发者尝试和贡献。",
      },
      {
        title: "rust-lang/rust",
        link: "https://github.com/rust-lang/rust",
        pubDate: new Date(Date.now() - 15 * 3600000).toISOString(),
        isoDate: new Date(Date.now() - 15 * 3600000).toISOString(),
        content: "<p>Rust是一种系统编程语言，专注于安全性、速度和并发性。</p>",
        contentSnippet: "Rust是一种系统编程语言，专注于安全性、速度和并发性。",
        creator: "Rust Team",
        summary:
          "Rust是一种现代系统编程语言，以内存安全、无数据竞争和零成本抽象为特点。该语言在不牺牲性能的前提下提供了强大的安全保障，广泛应用于系统工具、WebAssembly、嵌入式系统和云基础设施。最新版本改进了编译器性能和错误信息，扩展了标准库功能，并增强了跨平台支持，持续吸引开发者从C++等语言迁移。",
      },
    ],
    lastUpdated: new Date().toISOString(),
  },
}
