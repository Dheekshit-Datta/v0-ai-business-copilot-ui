"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

interface Integration {
  id: string
  name: string
  logo: string
  connected: boolean
}

const integrations: Integration[] = [
  { id: "slack", name: "Slack", logo: "💬", connected: true },
  { id: "notion", name: "Notion", logo: "📝", connected: false },
  { id: "sheets", name: "Google Sheets", logo: "📊", connected: true },
  { id: "hubspot", name: "HubSpot", logo: "🎯", connected: false },
]

export default function IntegrationsSection() {
  const [integrationStates, setIntegrationStates] = useState<Record<string, boolean>>(
    integrations.reduce((acc, int) => ({ ...acc, [int.id]: int.connected }), {}),
  )
  const [toastMessage, setToastMessage] = useState("")

  const handleToggle = (id: string) => {
    setIntegrationStates((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
    const integration = integrations.find((i) => i.id === id)
    setToastMessage(`${integration?.name} ${!integrationStates[id] ? "connected" : "disconnected"}`)
    setTimeout(() => setToastMessage(""), 3000)
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Integrations</h2>
        <p className="text-sm text-slate-600">Connect your favorite tools to enhance your workflow</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {integrations.map((integration, index) => (
          <motion.div
            key={integration.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -4 }}
          >
            <Card className="p-6 bg-gradient-to-br from-white to-slate-50 border-slate-200 flex flex-col items-center text-center space-y-4 hover:shadow-lg transition-shadow">
              <div className="text-4xl">{integration.logo}</div>
              <h3 className="font-semibold text-foreground">{integration.name}</h3>
              <Button
                onClick={() => handleToggle(integration.id)}
                variant={integrationStates[integration.id] ? "default" : "outline"}
                className={integrationStates[integration.id] ? "bg-green-600 hover:bg-green-700 text-white" : ""}
              >
                {integrationStates[integration.id] ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Connected
                  </>
                ) : (
                  "Connect"
                )}
              </Button>
            </Card>
          </motion.div>
        ))}
      </div>

      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 right-6 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg"
        >
          {toastMessage}
        </motion.div>
      )}
    </div>
  )
}
