"use client"

import { LayoutDashboard, MessageSquare, BarChart3, TrendingUp, Zap, Plug, Settings, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
  activeTab: string
  onTabChange: (tab: string) => void
}

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "chat", label: "Chat", icon: MessageSquare },
  { id: "insights", label: "Insights", icon: BarChart3 },
  { id: "predictions", label: "Predictions", icon: TrendingUp },
  { id: "simulations", label: "Simulations", icon: Zap },
  { id: "integrations", label: "Integrations", icon: Plug },
]

export default function Sidebar({ isOpen, activeTab, onTabChange }: SidebarProps) {
  return (
    <aside
      className={cn(
        "bg-white border-r border-border transition-all duration-300 flex flex-col h-screen fixed left-0 top-0 z-50",
        isOpen ? "w-64" : "w-20",
      )}
    >
      {/* Header with Avatar and Logo */}
      <div className="p-4 border-b border-border space-y-4">
        <div className="flex items-center justify-center">
          <Avatar className="w-10 h-10">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=copilot" />
            <AvatarFallback className="bg-blue-600 text-white font-bold">BC</AvatarFallback>
          </Avatar>
        </div>
        {isOpen && (
          <div className="text-center">
            <h2 className="text-sm font-bold text-foreground">Business Copilot</h2>
          </div>
        )}
      </div>

      {/* Navigation Items */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                activeTab === item.id
                  ? "bg-primary text-primary-foreground font-medium"
                  : "text-foreground hover:bg-secondary",
              )}
              title={item.label}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {isOpen && <span>{item.label}</span>}
            </button>
          )
        })}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border space-y-2">
        <Button variant="ghost" className="w-full justify-start gap-3 text-foreground hover:bg-secondary text-sm h-9">
          <Settings className="w-4 h-4 flex-shrink-0" />
          {isOpen && <span>Settings</span>}
        </Button>
        {isOpen && (
          <Button
            variant="outline"
            className="w-full justify-start gap-2 border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 text-sm h-9"
          >
            <Crown className="w-4 h-4" />
            <span className="font-semibold">Upgrade to Pro</span>
          </Button>
        )}
      </div>
    </aside>
  )
}
