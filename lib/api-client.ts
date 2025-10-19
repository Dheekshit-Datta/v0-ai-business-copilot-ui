export async function fetchWithErrorHandling<T>(
  url: string,
  options?: RequestInit,
): Promise<{ data: T | null; error: string | null; isLoading: boolean }> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    return { data, error: null, isLoading: false }
  } catch (error) {
    console.error("[v0] API Error:", error)
    return { data: null, error: String(error), isLoading: false }
  }
}
