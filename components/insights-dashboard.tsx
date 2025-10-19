"use client"

import { useState, useEffect } from "react"
import MetricCard from "./metric-card"
import ChartCard from "./chart-card"
import { Skeleton } from "@/components/ui/skeleton"

interface MetricData {
  title: string
  value: string
  change: string
  isPositive: boolean
}

interface ChartDataPoint {
  name: string
  [key: string]: string | number
}

export default function InsightsDashboard() {
  const [metrics, setMetrics] = useState<MetricData[]>([])
  const [chartData, setChartData] = useState<ChartDataPoint[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const [analyticsRes, chartsRes] = await Promise.all([fetch("/api/analytics"), fetch("/api/charts")])

        if (!analyticsRes.ok || !chartsRes.ok) throw new Error("Failed to fetch data")

        const analyticsData = await analyticsRes.json()
        const chartsDataRes = await chartsRes.json()

        setMetrics(analyticsData.metrics || [])
        setChartData(chartsDataRes.chartData || [])
      } catch (err) {
        console.error("[v0] Insights error:", err)
        setError(String(err))
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (error) {
    return (
      <div className="p-6 space-y-6">
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          Error loading insights: {error}
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-4">Insights Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {isLoading
            ? Array(4)
                .fill(0)
                .map((_, i) => <Skeleton key={i} className="h-32 rounded-lg" />)
            : metrics.map((metric, index) => <MetricCard key={metric.title} {...metric} delay={index * 0.1} />)}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {isLoading ? (
          <>
            <Skeleton className="h-80 rounded-lg" />
            <Skeleton className="h-80 rounded-lg" />
          </>
        ) : (
          <>
            <ChartCard title="Sales vs Expenses" type="bar" data={chartData} dataKey="sales" delay={0.4} />
            <ChartCard title="Revenue Forecast" type="line" data={chartData} dataKey="revenue" delay={0.5} />
          </>
        )}
      </div>
    </div>
  )
}
