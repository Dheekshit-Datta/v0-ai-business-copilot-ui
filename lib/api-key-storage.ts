// Utility to store and retrieve API keys from localStorage
export const apiKeyStorage = {
  setOpenAIKey: (key: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("openai_api_key", key)
    }
  },

  getOpenAIKey: (): string | null => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("openai_api_key")
    }
    return null
  },

  removeOpenAIKey: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("openai_api_key")
    }
  },

  hasOpenAIKey: (): boolean => {
    if (typeof window !== "undefined") {
      return !!localStorage.getItem("openai_api_key")
    }
    return false
  },
}
