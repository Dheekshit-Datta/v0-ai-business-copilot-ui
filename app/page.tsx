"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Sidebar from "@/components/sidebar"
import Dashboard from "@/components/dashboard"
import ChatSection from "@/components/chat-section"
import InsightsDashboard from "@/components/insights-dashboard"
import PredictionsPanel from "@/components/predictions-panel"
import Simulations from "@/components/simulations"
import IntegrationsSection from "@/components/integrations-section"

type TabType = "dashboard" | "chat" | "insights" | "predictions" | "simulations" | "integrations"

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState<TabType>("dashboard")

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div
        className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-20"}`}
      >
        <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 overflow-auto bg-background">
          {activeTab === "dashboard" && <Dashboard />}
          {activeTab === "chat" && <ChatSection />}
          {activeTab === "insights" && <InsightsDashboard />}
          {activeTab === "predictions" && <PredictionsPanel />}
          {activeTab === "simulations" && <Simulations />}
          {activeTab === "integrations" && <IntegrationsSection />}
        </main>
      </div>
    </div>
  )
}
