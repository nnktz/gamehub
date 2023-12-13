'use client'

import { useTransition } from 'react'
import { toast } from 'sonner'

import { onFollow, onUnfollow } from '@/actions/follow'

import { Button } from '@/components/ui/button'
import { onBlock, onUnblock } from '@/actions/block'

interface ActionsProps {
  userId: string
  isFollowing: boolean
  isBlocked: boolean
}

export const Actions = ({ userId, isFollowing, isBlocked }: ActionsProps) => {
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

  const handleBlock = () => {
    startTransition(() => {
      onBlock(userId)
        .then((data) => toast.success(`Blocked the user "${data.blocked.username}")`))
        .catch((error) => toast.error('Something went wrong'))
    })
  }

  const handleUnblock = () => {
    startTransition(() => {
      onUnblock(userId)
        .then((data) => toast.success(`Unblocked the user "${data.blocked.username}")`))
        .catch((error) => toast.error('Something went wrong'))
    })
  }

  const handleClick = () => {
    if (isBlocked) {
      handleUnblock()
    } else {
      handleBlock()
    }
  }

  return (
    <>
      <Button disabled={isPending} onClick={onClick} variant={'primary'}>
        {isFollowing ? 'Unfollow' : 'Follow'}
      </Button>

      <Button disabled={isPending} onClick={handleClick}>
        {isBlocked ? 'Unblock' : 'Block'}
      </Button>
    </>
  )
}
