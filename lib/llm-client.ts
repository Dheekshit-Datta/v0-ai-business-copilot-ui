const OPENAI_API_KEY = process.env.OPENAI_API_KEY

interface LLMMessage {
  role: "user" | "assistant"
  content: string
}

export async function callLLM(
  messages: LLMMessage[],
  businessContext?: string,
  clientApiKey?: string,
): Promise<string> {
  const apiKey = clientApiKey || OPENAI_API_KEY

  if (!apiKey) {
    return generateFallbackResponse(messages, businessContext)
  }

  try {
    return await callOpenAI(messages, businessContext, apiKey)
  } catch (error) {
    console.error("[v0] OpenAI Error:", error)
    return generateFallbackResponse(messages, businessContext)
  }
}

async function callOpenAI(messages: LLMMessage[], businessContext?: string, apiKey: string): Promise<string> {
  const systemPrompt = `You are Business Copilot, an AI business assistant. You help analyze metrics, predict trends, simulate strategies, and make data-driven decisions. ${businessContext ? `Business Context: ${businessContext}` : ""}`

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "system", content: systemPrompt }, ...messages],
      temperature: 0.7,
      max_tokens: 1000,
    }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(`OpenAI error: ${error.error?.message || response.statusText}`)
  }

  const data = await response.json()
  return data.choices[0].message.content
}

function generateFallbackResponse(messages: LLMMessage[], businessContext?: string): string {
  const lastMessage = messages[messages.length - 1]?.content || ""

  if (lastMessage.toLowerCase().includes("revenue")) {
    return "To enable AI analysis, please add your OpenAI API key in Settings."
  }
  if (lastMessage.toLowerCase().includes("predict")) {
    return "Prediction analysis requires AI capabilities. Please add your OpenAI API key in Settings."
  }
  if (lastMessage.toLowerCase().includes("metric") || lastMessage.toLowerCase().includes("kpi")) {
    return "KPI analysis is ready. For AI-powered insights, please add your OpenAI API key in Settings."
  }

  return "I'm ready to help with your business analysis. To enable full AI capabilities, please add your OpenAI API key in Settings."
}
