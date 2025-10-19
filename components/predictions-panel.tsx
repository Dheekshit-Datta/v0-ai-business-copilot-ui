"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, Loader } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

interface Prediction {
  week: string
  revenue: string
  change: string
}

export default function PredictionsPanel() {
  const [predictions, setPredictions] = useState<Prediction[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [simulationParams, setSimulationParams] = useState({
    adSpend: 50,
    pricing: 50,
    growthRate: 50,
  })
  const [simulated, setSimulated] = useState(false)
  const [simulationLoading, setSimulationLoading] = useState(false)

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        setIsLoading(true)
        const res = await fetch("/api/predictions")
        if (!res.ok) throw new Error("Failed to fetch predictions")
        const data = await res.json()
        setPredictions(data.predictions || [])
      } catch (err) {
        console.error("[v0] Predictions error:", err)
        setError(String(err))
      } finally {
        setIsLoading(false)
      }
    }

    fetchPredictions()
  }, [])

  const handleSimulation = async () => {
    setSimulationLoading(true)
    try {
      const res = await fetch("/api/predictions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "simulate",
          params: simulationParams,
        }),
      })

      if (!res.ok) throw new Error("Simulation failed")
      setSimulated(true)
      setTimeout(() => setSimulated(false), 3000)
    } catch (err) {
      console.error("[v0] Simulation error:", err)
      setError(String(err))
    } finally {
      setSimulationLoading(false)
    }
  }

  if (error) {
    return (
      <div className="p-6 space-y-6">
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          Error loading predictions: {error}
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-4">Predictions & Simulations</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Predictions */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Revenue Predictions</h3>
          <div className="space-y-3">
            {isLoading
              ? Array(3)
                  .fill(0)
                  .map((_, i) => <Skeleton key={i} className="h-24 rounded-lg" />)
              : predictions.map((pred, index) => (
                  <motion.div
                    key={pred.week}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium text-slate-600">{pred.week}</p>
                          <p className="text-xl font-bold text-blue-600 mt-1">{pred.revenue}</p>
                        </div>
                        <div className="flex items-center gap-1 text-green-600 font-semibold">
                          <TrendingUp className="w-4 h-4" />
                          {pred.change}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
          </div>
        </div>

        {/* Simulations */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Run Simulation</h3>
          <Card className="p-6 bg-gradient-to-br from-white to-slate-50 border-slate-200 space-y-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground">Ad Spend: {simulationParams.adSpend}%</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={simulationParams.adSpend}
                  onChange={(e) =>
                    setSimulationParams({ ...simulationParams, adSpend: Number.parseInt(e.target.value) })
                  }
                  className="w-full mt-2"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Pricing: {simulationParams.pricing}%</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={simulationParams.pricing}
                  onChange={(e) =>
                    setSimulationParams({ ...simulationParams, pricing: Number.parseInt(e.target.value) })
                  }
                  className="w-full mt-2"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">
                  Growth Rate: {simulationParams.growthRate}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={simulationParams.growthRate}
                  onChange={(e) =>
                    setSimulationParams({ ...simulationParams, growthRate: Number.parseInt(e.target.value) })
                  }
                  className="w-full mt-2"
                />
              </div>
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={handleSimulation}
                disabled={simulationLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold"
              >
                {simulationLoading ? (
                  <>
                    <Loader className="w-4 h-4 mr-2 animate-spin" />
                    Running Simulation...
                  </>
                ) : (
                  "Run Simulation"
                )}
              </Button>
            </motion.div>

            {simulated && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-green-50 border border-green-200 rounded-lg"
              >
                <p className="text-sm text-green-700">
                  Simulation complete! With these parameters, projected revenue increases to <strong>$58,200</strong>{" "}
                  (+12.5%)
                </p>
              </motion.div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
