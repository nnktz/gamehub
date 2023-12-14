'use client'

import { MessagesSquare, Users } from 'lucide-react'

import { ChatVariant, useChatSidebar } from '@/store/use-chat-sidebar'

import { Hint } from '../hint'
import { Button } from '../ui/button'

export const VariantToggle = () => {
  const { variant, onChangeVariant } = useChatSidebar((state) => state)

  const isChat = variant === ChatVariant.CHAT
  const Icon = isChat ? Users : MessagesSquare
  const label = isChat ? 'Community' : 'Go back to chat'

  const onToggle = () => {
    const newVariant = isChat ? ChatVariant.COMMUNITY : ChatVariant.CHAT
    onChangeVariant(newVariant)
  }

  return (
    <Hint label={label} side="left" asChild>
      <Button
        onClick={onToggle}
        variant={'ghost'}
        className="h-auto bg-transparent p-2 hover:bg-white/10 hover:text-primary"
      >
        <Icon className="h-4 w-4" />
      </Button>
    </Hint>
  )
}
