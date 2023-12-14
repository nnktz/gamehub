'use client'

import { cn } from '@/lib/utils'

import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useState } from 'react'
import { Skeleton } from '../ui/skeleton'
import { ChatInfo } from './chat-info'

interface ChatFormProps {
  onSubmit: () => void
  value: string
  onChange: (value: string) => void
  isHidden: boolean
  isChatFollowersOnly: boolean
  isChatDelay: boolean
  isFollowing: boolean
}

export const ChatForm = ({
  onChange,
  onSubmit,
  isChatDelay,
  isChatFollowersOnly,
  isFollowing,
  isHidden,
  value,
}: ChatFormProps) => {
  const [isDelayBlocked, setIsDelayBlocked] = useState(false)

  const isFollowersOnlyAndNotFollowing = isChatFollowersOnly && !isFollowing

  const isDisabled = isHidden || isDelayBlocked || isFollowersOnlyAndNotFollowing

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()

    if (!value || isDisabled) {
      return
    }

    if (isChatDelay && !isDelayBlocked) {
      setIsDelayBlocked(true)
      setTimeout(() => {
        setIsDelayBlocked(false)
      }, 3000)
    } else {
      onSubmit()
    }
  }

  if (isHidden) {
    return null
  }

  return (
    <form action="" onSubmit={handleSubmit} className="flex flex-col items-center gap-y-4 p-3">
      <div className="w-full">
        <ChatInfo isDelayed={isChatDelay} isFollowersOnly={isChatFollowersOnly} />

        <Input
          onChange={(e) => onChange(e.target.value)}
          value={value}
          disabled={isDisabled}
          placeholder="Send a message"
          className={cn('border-white/10', isChatFollowersOnly && 'rounded-t-none border-t-0')}
        />
      </div>

      <div className="ml-auto">
        <Button type="submit" variant={'primary'} size={'sm'} disabled={isDisabled}>
          Chat
        </Button>
      </div>
    </form>
  )
}

export const ChatFormSkeleton = () => {
  return (
    <div className="flex flex-col items-center gap-y-4 p-3">
      <Skeleton className="h-10 w-full" />
      <div className="ml-auto flex items-center gap-x-2">
        <Skeleton className="h-7 w-7" />
        <Skeleton className="h-12 w-7" />
      </div>
    </div>
  )
}
