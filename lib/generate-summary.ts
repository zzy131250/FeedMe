"use server"

import OpenAI from 'openai';

// 从环境变量中获取API密钥
const OPENAI_API_KEY = process.env.SILICONFLOW_API_KEY;

// 创建OpenAI客户端
const openai = new OpenAI({
  baseURL: "https://api.siliconflow.cn/v1",
  apiKey: OPENAI_API_KEY,
});

export async function generateSummary(title: string, content: string): Promise<string> {
  try {
    // 清理内容 - 移除HTML标签
    const cleanContent = content.replace(/<[^>]*>?/gm, "");

    // 准备提示词
    const prompt = `
你是一个专业的内容摘要生成器。请根据以下文章标题和内容，生成一个简洁、准确的中文摘要。
摘要应该：
1. 捕捉文章的主要观点和关键信息
2. 使用清晰、流畅的中文
3. 长度控制在100字左右
4. 保持客观，不添加个人观点
5. 如果内容为空或不包含有效信息，只需对标题进行翻译，不要生成未提及的无关内容

文章标题：${title}

文章内容：
${cleanContent.slice(0, 5000)} // 限制内容长度以避免超出token限制
`;

    const completion = await openai.chat.completions.create({
      model: "THUDM/GLM-4-9B-0414",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 500,
    });

    return completion.choices[0].message.content?.trim() || "无法生成摘要。";
  } catch (error) {
    console.error("生成摘要时出错:", error);
    return "无法生成摘要。AI 模型暂时不可用。";
  }
}
