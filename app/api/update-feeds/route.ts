import { type NextRequest, NextResponse } from "next/server"
import { updateAllFeeds } from "@/lib/update-service"
import { config } from "@/config/rss-config"

// 检查请求授权
function isAuthorized(request: NextRequest): boolean {
  // 检查环境变量中的API密钥
  const apiKey = process.env.UPDATE_API_KEY
  if (!apiKey) {
    console.warn("UPDATE_API_KEY environment variable is not set")
    return false
  }

  // 从请求头中获取授权信息
  const authHeader = request.headers.get("Authorization")
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return false
  }

  // 验证密钥
  const providedKey = authHeader.substring(7) // 去除 "Bearer " 前缀
  return providedKey === apiKey
}

export async function GET(request: NextRequest) {
  // 检查更新功能是否启用
  if (!config.updateEnabled) {
    return NextResponse.json({ success: false, message: "Updates are disabled" }, { status: 400 })
  }

  // 验证请求
  const isDev = process.env.NODE_ENV === "development"
  const hasApiKey = isAuthorized(request)

  if (!(isDev || hasApiKey)) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
  }

  try {
    const results = await updateAllFeeds()
    return NextResponse.json({ success: true, results })
  } catch (error) {
    console.error("Error in update job:", error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    )
  }
}
