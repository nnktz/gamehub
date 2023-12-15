'use client'

import { MinusCircle } from 'lucide-react'
import { useTransition } from 'react'
import { toast } from 'sonner'

import { onBlock } from '@/actions/block'
import { cn, stringToColor } from '@/lib/utils'

import { Hint } from '../hint'
import { Button } from '../ui/button'

interface CommunityItemProps {
  viewerName: string
  hostName: string
  participantName?: string
  participantIdentity: string
}

export const CommunityItem = ({
  viewerName,
  hostName,
  participantIdentity,
  participantName,
}: CommunityItemProps) => {
  const [isPending, startTransition] = useTransition()

  const color = stringToColor(participantName || '')
  const isSelf = participantName === viewerName
  const isHost = viewerName === hostName

  const handleBlock = () => {
    if (!participantName || isSelf || !isHost) {
      return
    }

    startTransition(() => {
      onBlock(participantIdentity)
        .then(() => toast.success(`Blocked ${participantName}`))
        .catch(() => toast.error('Something went wrong'))
    })
  }

  return (
    <div
      className={cn(
        'group flex w-full items-center justify-between rounded-md p-2 text-sm hover:bg-white/5',
        isPending && 'pointer-events-none opacity-50',
      )}
    >
      <p style={{ color: color }}>{participantName}</p>
      {isHost && !isSelf && (
        <Hint label="Block">
          <Button
            disabled={isPending}
            onClick={handleBlock}
            variant={'ghost'}
            className="h-auto w-auto p-1 opacity-0 transition group-hover:opacity-100"
          >
            <MinusCircle className="h-4 w-4 text-muted-foreground" />
          </Button>
        </Hint>
      )}
    </div>
  )
}
