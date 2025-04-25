import { Suspense } from "react"
import { RssFeed } from "@/components/rss-feed"
import { SourceSwitcher } from "@/components/source-switcher"
import { ThemeToggle } from "@/components/theme-toggle"
import { defaultSource } from "@/config/rss-config"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container py-10 mx-auto max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold">feedme</h1>
          <ThemeToggle />
        </div>
        <p className="text-muted-foreground mb-8">从多个信息源获取最新内容，并通过 AI 生成中文摘要</p>

        <div className="mb-8">
          <SourceSwitcher />
        </div>

        <Suspense fallback={<FeedSkeleton />}>
          <RssFeed defaultSource={defaultSource.url} />
        </Suspense>
      </div>
    </main>
  )
}

function FeedSkeleton() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="border rounded-lg p-6 space-y-4">
          <div className="h-7 bg-muted rounded-md animate-pulse w-3/4" />
          <div className="h-4 bg-muted rounded-md animate-pulse w-1/2" />
          <div className="space-y-2">
            <div className="h-4 bg-muted rounded-md animate-pulse w-full" />
            <div className="h-4 bg-muted rounded-md animate-pulse w-full" />
            <div className="h-4 bg-muted rounded-md animate-pulse w-4/5" />
          </div>
        </div>
      ))}
    </div>
  )
}
