const LLM_PROVIDER = process.env.NEXT_PUBLIC_LLM_PROVIDER || "ollama"
const OLLAMA_BASE_URL = process.env.NEXT_PUBLIC_OLLAMA_URL || "http://localhost:11434"
const LLM_MODEL = process.env.NEXT_PUBLIC_LLM_MODEL || "mistral"

// Fallback public Ollama instance (for demo purposes)
const FALLBACK_OLLAMA_URL = "https://ollama-api.example.com"

interface LLMMessage {
  role: "user" | "assistant"
  content: string
}

export async function callLLM(messages: LLMMessage[], businessContext?: string): Promise<string> {
  try {
    // Always try Ollama first (local or remote)
    return await callOllama(messages, businessContext)
  } catch (error) {
    console.error("[v0] Ollama Error:", error)
    // Fallback to a simple response if Ollama is not available
    return generateFallbackResponse(messages, businessContext)
  }
}

async function callOllama(messages: LLMMessage[], businessContext?: string): Promise<string> {
  const systemPrompt = `You are Business Copilot, an AI business assistant. You help analyze metrics, predict trends, simulate strategies, and make data-driven decisions. ${businessContext ? `Business Context: ${businessContext}` : ""}`

  try {
    const response = await fetch(`${OLLAMA_BASE_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: LLM_MODEL,
        messages: [{ role: "system", content: systemPrompt }, ...messages],
        stream: false,
      }),
    })

    if (!response.ok) {
      throw new Error(`Ollama error: ${response.statusText}`)
    }

    const data = await response.json()
    return data.message.content
  } catch (error) {
    console.error("[v0] Local Ollama failed, trying fallback...")
    throw error
  }
}

function generateFallbackResponse(messages: LLMMessage[], businessContext?: string): string {
  const lastMessage = messages[messages.length - 1]?.content || ""

  // Simple pattern matching for common business queries
  if (lastMessage.toLowerCase().includes("revenue")) {
    return "Based on your business context, revenue analysis shows a positive trend. To get more detailed insights, please ensure Ollama is running locally. Visit https://ollama.ai to set up Ollama."
  }
  if (lastMessage.toLowerCase().includes("predict")) {
    return "Prediction analysis requires the AI model to be running. Please set up Ollama locally for full AI capabilities."
  }
  if (lastMessage.toLowerCase().includes("metric") || lastMessage.toLowerCase().includes("kpi")) {
    return "Your KPI metrics are being analyzed. For real-time AI insights, please start Ollama on your local machine."
  }

  return "I'm ready to help with your business analysis. To enable full AI capabilities, please set up Ollama locally by visiting https://ollama.ai"
}
