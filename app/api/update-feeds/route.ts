import { type NextRequest, NextResponse } from "next/server"
import { updateAllFeeds } from "@/lib/update-service"
import { config } from "@/config/rss-config"

// 验证请求是否来自Vercel Cron
function isVercelCron(request: NextRequest): boolean {
  // 在实际环境中，你可能需要更严格的验证
  const cronHeader = request.headers.get("x-vercel-cron")
  return cronHeader === "1"
}

export async function GET(request: NextRequest) {
  // 检查cron是否启用
  if (!config.cron.enabled) {
    return NextResponse.json({ success: false, message: "Cron is disabled" }, { status: 400 })
  }

  // 验证请求
  const isAuthorized = process.env.NODE_ENV === "development" || isVercelCron(request)

  if (!isAuthorized) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
  }

  try {
    const results = await updateAllFeeds()
    return NextResponse.json({ success: true, results })
  } catch (error) {
    console.error("Error in cron job:", error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    )
  }
}
