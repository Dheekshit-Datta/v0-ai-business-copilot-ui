"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { apiKeyStorage } from "@/lib/api-key-storage"
import { AlertCircle, Eye, EyeOff } from "lucide-react"

interface ApiKeyModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave?: () => void
}

export default function ApiKeyModal({ open, onOpenChange, onSave }: ApiKeyModalProps) {
  const [apiKey, setApiKey] = useState("")
  const [showKey, setShowKey] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState("")

  const handleSave = async () => {
    if (!apiKey.trim()) {
      setError("API key cannot be empty")
      return
    }

    if (!apiKey.startsWith("sk-")) {
      setError("Invalid OpenAI API key format (should start with 'sk-')")
      return
    }

    setIsSaving(true)
    setError("")

    try {
      // Verify the API key by making a test call
      const response = await fetch("https://api.openai.com/v1/models", {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      })

      if (!response.ok) {
        throw new Error("Invalid API key")
      }

      // Save the API key
      apiKeyStorage.setOpenAIKey(apiKey)
      setApiKey("")
      onOpenChange(false)
      onSave?.()
    } catch (err) {
      setError("Failed to verify API key. Please check and try again.")
      console.error("[v0] API key verification error:", err)
    } finally {
      setIsSaving(false)
    }
  }

  const handleRemove = () => {
    apiKeyStorage.removeOpenAIKey()
    setApiKey("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>OpenAI API Configuration</DialogTitle>
          <DialogDescription>Add your OpenAI API key to enable AI features.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium">OpenAI API Key Required</p>
              <p className="text-xs mt-1">
                Add your OpenAI API key to unlock AI-powered business analysis, predictions, and insights.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="api-key">OpenAI API Key</Label>
            <div className="relative">
              <Input
                id="api-key"
                type={showKey ? "text" : "password"}
                placeholder="sk-..."
                value={apiKey}
                onChange={(e) => {
                  setApiKey(e.target.value)
                  setError("")
                }}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-xs text-gray-500">
              Get your API key from{" "}
              <a
                href="https://platform.openai.com/api-keys"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                OpenAI Platform
              </a>
            </p>
          </div>

          {error && <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{error}</div>}

          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            {apiKeyStorage.hasOpenAIKey() && (
              <Button variant="destructive" onClick={handleRemove}>
                Remove Key
              </Button>
            )}
            <Button onClick={handleSave} disabled={isSaving || !apiKey.trim()}>
              {isSaving ? "Verifying..." : "Save & Verify"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
