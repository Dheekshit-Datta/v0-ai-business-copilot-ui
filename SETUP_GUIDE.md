# Business Copilot - Setup Guide

## Quick Start with Ollama (Free, No API Keys Required)

### 1. Install Ollama

**macOS/Linux:**
\`\`\`bash
curl https://ollama.ai/install.sh | sh
\`\`\`

**Windows:**
Download from https://ollama.ai/download

### 2. Start Ollama

\`\`\`bash
ollama serve
\`\`\`

This starts Ollama on `http://localhost:11434`

### 3. Pull a Model

In a new terminal:
\`\`\`bash
# Pull Mistral (recommended, fast and accurate)
ollama pull mistral

# Or pull Llama 2 (larger, more capable)
ollama pull llama2

# Or pull Neural Chat (optimized for chat)
ollama pull neural-chat
\`\`\`

### 4. Run Business Copilot

\`\`\`bash
npm run dev
\`\`\`

The app will automatically connect to Ollama at `http://localhost:11434`

## Environment Variables (Optional)

Create a `.env.local` file to customize:

\`\`\`env
# LLM Configuration
NEXT_PUBLIC_LLM_PROVIDER=ollama
NEXT_PUBLIC_LLM_MODEL=mistral
NEXT_PUBLIC_OLLAMA_URL=http://localhost:11434

# For remote Ollama instance
# NEXT_PUBLIC_OLLAMA_URL=https://your-ollama-instance.com
\`\`\`

## Using Business Data

### Upload Business Data

Send a POST request to `/api/analytics` with your business JSON:

\`\`\`bash
curl -X POST http://localhost:3000/api/analytics \
  -H "Content-Type: application/json" \
  -d '{
    "sales": {
      "current": 45000,
      "change": 12
    },
    "profit": {
      "current": 9000,
      "change": -3
    },
    "timeseries": [
      { "name": "Mon", "sales": 4000, "expenses": 2400 },
      { "name": "Tue", "sales": 3000, "expenses": 1398 }
    ]
  }'
\`\`\`

### Supported Data Formats

The system auto-adapts to any business JSON:

\`\`\`json
{
  "sales": { "current": 45000, "change": 12 },
  "revenue": { "current": 50000, "change": 8 },
  "profit_margin": { "current": 20, "change": -2 },
  "ad_spend_efficiency": { "current": 3.2, "change": 5 },
  "growth_rate": { "current": 24, "change": 5 },
  "timeseries": [
    { "name": "Week 1", "sales": 10000, "expenses": 5000 },
    { "name": "Week 2", "sales": 12000, "expenses": 5500 }
  ],
  "predictions": [
    { "week": "Next week", "revenue": "$52,000", "change": "+8.2%" }
  ]
}
\`\`\`

## Features

✅ **Live LLM Chat** - Ask business questions, get AI-powered insights
✅ **Dynamic Dashboards** - Auto-adapts to any business data format
✅ **Real-time Analytics** - Charts and metrics update instantly
✅ **Predictions & Simulations** - Run what-if scenarios
✅ **No API Keys** - Everything runs locally with Ollama
✅ **Production Ready** - Full error handling and loading states

## Troubleshooting

### Ollama Connection Error
- Ensure Ollama is running: `ollama serve`
- Check URL: `curl http://localhost:11434/api/tags`

### Model Not Found
- Pull a model: `ollama pull mistral`
- List available models: `ollama list`

### Slow Responses
- Use a smaller model: `ollama pull neural-chat`
- Increase system resources for Ollama

## Next Steps

1. Upload your business data via the API
2. Chat with the AI about your metrics
3. Run simulations to test strategies
4. Connect integrations (Slack, Notion, etc.)
