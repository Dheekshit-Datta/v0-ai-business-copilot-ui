import { callLLM } from "@/lib/llm-client"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { messages, businessContext, openaiApiKey } = await request.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages format" }, { status: 400 })
    }

    const response = await callLLM(messages, businessContext, openaiApiKey)

    return NextResponse.json({ response })
  } catch (error) {
    console.error("[v0] Chat API Error:", error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
