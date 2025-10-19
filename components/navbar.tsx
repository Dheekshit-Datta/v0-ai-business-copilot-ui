"use client"

import { useState } from "react"
import { Menu, Settings, Share2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import ApiKeyModal from "./api-key-modal"

interface NavbarProps {
  onMenuClick: () => void
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const [apiKeyModalOpen, setApiKeyModalOpen] = useState(false)

  return (
    <>
      <nav className="h-16 border-b border-border bg-white sticky top-0 z-40 flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onMenuClick} className="hover:bg-secondary">
            <Menu className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold text-foreground">Business Copilot</h1>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="hover:bg-secondary" onClick={() => setApiKeyModalOpen(true)}>
            <Settings className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-secondary">
            <Share2 className="w-5 h-5" />
          </Button>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 rounded-lg">
            <Plus className="w-4 h-4" />
            New Chat
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="rounded-full p-0 w-10 h-10 hover:bg-secondary">
                <Avatar className="w-10 h-10">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setApiKeyModalOpen(true)}
              >
                <Settings className="w-4 h-4" />
                <span>API Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-red-600">
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>

      <ApiKeyModal open={apiKeyModalOpen} onOpenChange={setApiKeyModalOpen} />
    </>
  )
}
