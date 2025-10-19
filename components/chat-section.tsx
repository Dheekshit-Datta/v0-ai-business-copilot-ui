"use client"

import { useState, useEffect } from "react"
import { Send, Loader, Paperclip, Mic, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion } from "framer-motion"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Message {
  id: string
  role: "user" | "ai"
  content: string
  timestamp: Date
}

const quickActions = ["Analyze business metrics", "Predict revenue trends", "Simulate strategy", "Compare performance"]

export default function ChatSection() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const initializeChat = async () => {
      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [{ role: "user", content: "Give a brief greeting as Business Copilot AI assistant" }],
          }),
        })

        if (!response.ok) throw new Error("Failed to initialize chat")
        const data = await response.json()

        setMessages([
          {
            id: "1",
            role: "ai",
            content: data.response || "Hello! I'm Business Copilot, your AI business assistant.",
            timestamp: new Date(),
          },
        ])
      } catch (err) {
        console.error("[v0] Chat init error:", err)
        setError("Failed to initialize chat")
        setMessages([
          {
            id: "1",
            role: "ai",
            content: "Hello! I'm Business Copilot. How can I help you today?",
            timestamp: new Date(),
          },
        ])
      } finally {
        setIsLoading(false)
      }
    }

    initializeChat()
  }, [])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role === "ai" ? "assistant" : "user",
            content: m.content,
          })),
        }),
      })

      if (!response.ok) throw new Error("Failed to get response")
      const data = await response.json()

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: data.response || "I couldn't process that request. Please try again.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
    } catch (err) {
      console.error("[v0] Chat error:", err)
      setError(String(err))
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full p-6 gap-6 max-w-4xl mx-auto w-full">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto space-y-4">
        {messages.map((message, index) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {message.role === "ai" && (
              <Avatar className="w-8 h-8 flex-shrink-0">
                <AvatarFallback className="bg-blue-600 text-white font-bold">BC</AvatarFallback>
              </Avatar>
            )}
            <div
              className={`max-w-md px-4 py-3 rounded-lg ${
                message.role === "user"
                  ? "bg-primary text-primary-foreground rounded-br-none"
                  : "bg-secondary text-foreground rounded-bl-none"
              }`}
            >
              <p className="text-sm leading-relaxed">{message.content}</p>
            </div>
            {message.role === "user" && (
              <Avatar className="w-8 h-8 flex-shrink-0">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            )}
          </motion.div>
        ))}
        {isLoading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
            <Avatar className="w-8 h-8 flex-shrink-0">
              <AvatarFallback className="bg-blue-600 text-white font-bold">BC</AvatarFallback>
            </Avatar>
            <div className="bg-secondary px-4 py-3 rounded-lg rounded-bl-none flex gap-1">
              <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
              <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
            </div>
          </motion.div>
        )}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
          >
            Error: {error}
          </motion.div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-2">
        {quickActions.map((action) => (
          <motion.button
            key={action}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setInput(action)}
            className="px-3 py-1 text-xs bg-blue-50 text-blue-600 rounded-full border border-blue-200 hover:bg-blue-100 transition-colors"
          >
            {action}
          </motion.button>
        ))}
      </div>

      {/* Chat Input Area */}
      <div className="space-y-3 bg-white rounded-xl p-4 shadow-md border border-border">
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground gap-1 h-8 px-2">
                Select Source
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuItem className="cursor-pointer">Business Data</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">Market Research</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">Internal Reports</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex gap-2 items-end">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Ask me anything…"
            className="flex-1 bg-input border-border focus:ring-2 focus:ring-accent"
          />
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground h-10 w-10">
            <Paperclip className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground h-10 w-10">
            <Mic className="w-4 h-4" />
          </Button>
          <Button
            onClick={handleSendMessage}
            disabled={isLoading || !input.trim()}
            className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg h-10 w-10 p-0"
          >
            {isLoading ? <Loader className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </Button>
        </div>
      </div>
    </div>
  )
}
