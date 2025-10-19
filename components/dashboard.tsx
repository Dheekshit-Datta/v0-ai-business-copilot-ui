"use client"

import MetricCard from "./metric-card"
import ChartCard from "./chart-card"

const metricsData = [
  { title: "Total Sales", value: "$45,000", change: "+12%", isPositive: true },
  { title: "Profit Margin", value: "$9,000", change: "-3%", isPositive: false },
  { title: "Ad Spend Efficiency", value: "3.2x", change: "+8%", isPositive: true },
  { title: "Growth Rate", value: "+24%", change: "+5%", isPositive: true },
]

const chartData = [
  { name: "Mon", sales: 4000, expenses: 2400 },
  { name: "Tue", sales: 3000, expenses: 1398 },
  { name: "Wed", sales: 2000, expenses: 9800 },
  { name: "Thu", sales: 2780, expenses: 3908 },
  { name: "Fri", sales: 1890, expenses: 4800 },
  { name: "Sat", sales: 2390, expenses: 3800 },
  { name: "Sun", sales: 3490, expenses: 4300 },
]

const forecastData = [
  { name: "Week 1", revenue: 45000 },
  { name: "Week 2", revenue: 48600 },
  { name: "Week 3", revenue: 52000 },
  { name: "Week 4", revenue: 55800 },
]

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-4">Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metricsData.map((metric, index) => (
            <MetricCard key={metric.title} {...metric} delay={index * 0.1} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Sales vs Expenses" type="bar" data={chartData} dataKey="sales" delay={0.4} />
        <ChartCard title="Revenue Forecast" type="line" data={forecastData} dataKey="revenue" delay={0.5} />
      </div>
    </div>
  )
}
