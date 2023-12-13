'use client'

import { useTransition } from 'react'
import { toast } from 'sonner'

import { onFollow, onUnfollow } from '@/actions/follow'

import { Button } from '@/components/ui/button'

interface ActionsProps {
  userId: string
  isFollowing: boolean
}

export const Actions = ({ userId, isFollowing }: ActionsProps) => {
  const [isPending, startTransition] = useTransition()

  const handleFollow = () => {
    startTransition(() => {
      onFollow(userId)
        .then((data) => toast.success(`You're now following "${data.following.username}")`))
        .catch((error) => toast.error('Something went wrong'))
    })
  }

  const handleUnfollow = () => {
    startTransition(() => {
      onUnfollow(userId)
        .then((data) => toast.success(`You've unfollowed "${data.following.username}")`))
        .catch((error) => toast.error('Something went wrong'))
    })
  }

  const onClick = () => {
    if (isFollowing) {
      handleUnfollow()
    } else {
      handleFollow()
    }
  }

  return (
    <Button disabled={isPending} onClick={onClick} variant={'primary'}>
      {isFollowing ? 'Unfollow' : 'Follow'}
    </Button>
  )
}
