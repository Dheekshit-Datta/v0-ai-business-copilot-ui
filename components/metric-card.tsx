"use client"

import { motion } from "framer-motion"
import { TrendingUp, TrendingDown } from "lucide-react"
import { Card } from "@/components/ui/card"
import { useEffect, useState } from "react"

interface MetricCardProps {
  title: string
  value: string
  change: string
  isPositive: boolean
  delay?: number
}

export default function MetricCard({ title, value, change, isPositive, delay = 0 }: MetricCardProps) {
  const [displayValue, setDisplayValue] = useState("0")

  useEffect(() => {
    const numValue = Number.parseInt(value.replace(/[^0-9]/g, ""))
    const duration = 1000
    const steps = 60
    const stepValue = numValue / steps

    let current = 0
    const interval = setInterval(() => {
      current += stepValue
      if (current >= numValue) {
        setDisplayValue(value)
        clearInterval(interval)
      } else {
        setDisplayValue(`$${Math.floor(current).toLocaleString()}`)
      }
    }, duration / steps)

    return () => clearInterval(interval)
  }, [value])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(0,0,0,0.1)" }}
    >
      <Card className="p-6 bg-gradient-to-br from-white to-slate-50 border-slate-200 hover:shadow-lg transition-shadow">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-sm font-medium text-slate-600">{title}</h3>
          <div
            className={`flex items-center gap-1 text-xs font-semibold ${isPositive ? "text-green-600" : "text-red-600"}`}
          >
            {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            {change}
          </div>
        </div>
        <p className="text-2xl font-bold text-foreground">{displayValue}</p>
      </Card>
    </motion.div>
  )
}
