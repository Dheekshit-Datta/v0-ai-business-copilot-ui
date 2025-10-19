"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

interface ChartCardProps {
  title: string
  type: "line" | "bar"
  data: any[]
  dataKey: string
  delay?: number
}

export default function ChartCard({ title, type, data, dataKey, delay = 0 }: ChartCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ y: -4 }}
    >
      <Card className="p-6 bg-gradient-to-br from-white to-slate-50 border-slate-200">
        <h3 className="text-sm font-semibold text-foreground mb-4">{title}</h3>
        <ResponsiveContainer width="100%" height={300}>
          {type === "line" ? (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: "#f8fafc", border: "1px solid #e2e8f0" }} />
              <Legend />
              <Line type="monotone" dataKey={dataKey} stroke="#2563eb" strokeWidth={2} dot={{ fill: "#2563eb" }} />
            </LineChart>
          ) : (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: "#f8fafc", border: "1px solid #e2e8f0" }} />
              <Legend />
              <Bar dataKey={dataKey} fill="#2563eb" radius={[8, 8, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </Card>
    </motion.div>
  )
}
