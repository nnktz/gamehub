'use client'

import { useTransition } from 'react'
import { toast } from 'sonner'

import { onUnblock } from '@/actions/block'

import { Button } from '@/components/ui/button'

export const UnblockButton = ({ userId }: { userId: string }) => {
  const [isPending, startTransition] = useTransition()

  const onClick = () => {
    startTransition(() => {
      onUnblock(userId)
        .then((res) => toast.success(`User ${res.blocked.username} unblocked`))
        .catch(() => toast.error('Something went wrong'))
    })
  }

  return (
    <Button
      onClick={onClick}
      disabled={isPending}
      variant={'link'}
      size={'sm'}
      className="w-full text-blue-500"
    >
      Unblock
    </Button>
  )
}
