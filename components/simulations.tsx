"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Simulations() {
  const [simulationParams, setSimulationParams] = useState({
    adSpend: 50,
    pricing: 50,
    growthRate: 50,
  })
  const [simulated, setSimulated] = useState(false)
  const [simulationResult, setSimulationResult] = useState<string | null>(null)

  const handleSimulation = () => {
    setSimulated(true)
    setSimulationResult(
      `With Ad Spend: ${simulationParams.adSpend}%, Pricing: ${simulationParams.pricing}%, Growth Rate: ${simulationParams.growthRate}%, projected revenue increases to $58,200 (+12.5%)`,
    )
    setTimeout(() => setSimulated(false), 2000)
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Simulations</h2>
        <p className="text-sm text-slate-600">Run different scenarios to see how changes impact your business</p>
      </div>

      <div className="max-w-2xl">
        <Card className="p-6 bg-gradient-to-br from-white to-slate-50 border-slate-200 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">Ad Spend: {simulationParams.adSpend}%</label>
              <input
                type="range"
                min="0"
                max="100"
                value={simulationParams.adSpend}
                onChange={(e) => setSimulationParams({ ...simulationParams, adSpend: Number.parseInt(e.target.value) })}
                className="w-full mt-2 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Pricing: {simulationParams.pricing}%</label>
              <input
                type="range"
                min="0"
                max="100"
                value={simulationParams.pricing}
                onChange={(e) => setSimulationParams({ ...simulationParams, pricing: Number.parseInt(e.target.value) })}
                className="w-full mt-2 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Growth Rate: {simulationParams.growthRate}%</label>
              <input
                type="range"
                min="0"
                max="100"
                value={simulationParams.growthRate}
                onChange={(e) =>
                  setSimulationParams({ ...simulationParams, growthRate: Number.parseInt(e.target.value) })
                }
                className="w-full mt-2 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>
          </div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={handleSimulation}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold"
            >
              Run Simulation
            </Button>
          </motion.div>

          {simulated && simulationResult && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-green-50 border border-green-200 rounded-lg"
            >
              <p className="text-sm text-green-700">Simulation complete! {simulationResult}</p>
            </motion.div>
          )}
        </Card>
      </div>
    </div>
  )
}
