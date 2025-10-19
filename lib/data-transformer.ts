export interface BusinessData {
  [key: string]: any
}

export interface MetricData {
  title: string
  value: string
  change: string
  isPositive: boolean
}

export interface ChartDataPoint {
  name: string
  [key: string]: string | number
}

export function transformToMetrics(data: BusinessData): MetricData[] {
  const metrics: MetricData[] = []

  // Auto-detect common metric patterns
  const commonMetrics = ["sales", "revenue", "profit", "margin", "growth", "efficiency", "spend"]

  for (const [key, value] of Object.entries(data)) {
    const lowerKey = key.toLowerCase()
    const isCommonMetric = commonMetrics.some((m) => lowerKey.includes(m))

    if (isCommonMetric && typeof value === "object" && value !== null) {
      metrics.push({
        title: formatTitle(key),
        value: formatValue(value.current || value.value || 0),
        change: formatChange(value.change || value.growth || 0),
        isPositive: (value.change || value.growth || 0) >= 0,
      })
    }
  }

  return metrics.length > 0 ? metrics : getDefaultMetrics()
}

export function transformToChartData(data: BusinessData): ChartDataPoint[] {
  if (Array.isArray(data)) {
    return data.map((item) => ({
      name: item.name || item.date || item.period || "Data",
      ...item,
    }))
  }

  if (data.timeseries && Array.isArray(data.timeseries)) {
    return data.timeseries
  }

  return getDefaultChartData()
}

export function transformToPredictions(data: BusinessData): any[] {
  if (data.predictions && Array.isArray(data.predictions)) {
    return data.predictions
  }

  if (data.forecast && Array.isArray(data.forecast)) {
    return data.forecast
  }

  return getDefaultPredictions()
}

function formatTitle(key: string): string {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/_/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

function formatValue(value: any): string {
  if (typeof value === "number") {
    if (value > 1000000) return `$${(value / 1000000).toFixed(1)}M`
    if (value > 1000) return `$${(value / 1000).toFixed(1)}K`
    return `$${value.toFixed(0)}`
  }
  return String(value)
}

function formatChange(value: any): string {
  const num = Number(value)
  if (isNaN(num)) return "0%"
  return `${num >= 0 ? "+" : ""}${num.toFixed(1)}%`
}

function getDefaultMetrics(): MetricData[] {
  return [
    { title: "Total Sales", value: "$0", change: "0%", isPositive: true },
    { title: "Profit Margin", value: "$0", change: "0%", isPositive: true },
    { title: "Ad Spend Efficiency", value: "0x", change: "0%", isPositive: true },
    { title: "Growth Rate", value: "0%", change: "0%", isPositive: true },
  ]
}

function getDefaultChartData(): ChartDataPoint[] {
  return [
    { name: "Mon", value: 0 },
    { name: "Tue", value: 0 },
    { name: "Wed", value: 0 },
    { name: "Thu", value: 0 },
    { name: "Fri", value: 0 },
    { name: "Sat", value: 0 },
    { name: "Sun", value: 0 },
  ]
}

function getDefaultPredictions(): any[] {
  return [
    { week: "Next week", revenue: "$0", change: "0%" },
    { week: "Week after", revenue: "$0", change: "0%" },
    { week: "Month end", revenue: "$0", change: "0%" },
  ]
}
