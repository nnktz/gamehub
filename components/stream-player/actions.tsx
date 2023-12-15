'use client'

import { useAuth } from '@clerk/nextjs'
import { toast } from 'sonner'
import { Heart } from 'lucide-react'
import { redirect } from 'next/navigation'
import { useTransition } from 'react'

import { onFollow, onUnfollow } from '@/actions/follow'
import { cn } from '@/lib/utils'

import { Button } from '../ui/button'
import { Skeleton } from '../ui/skeleton'

interface ActionsProps {
  isFollowing: boolean
  isHost: boolean
  hostIdentity: string
}

export const Actions = ({ isFollowing, isHost, hostIdentity }: ActionsProps) => {
  const { userId } = useAuth()
  const [isPending, startTransition] = useTransition()

  const handleFollow = () => {
    startTransition(() => {
      onFollow(hostIdentity)
        .then((data) => toast.success(`You're now following "${data.following.username}")`))
        .catch((error) => toast.error('Something went wrong'))
    })
  }

  const handleUnfollow = () => {
    startTransition(() => {
      onUnfollow(hostIdentity)
        .then((data) => toast.success(`You've unfollowed "${data.following.username}")`))
        .catch((error) => toast.error('Something went wrong'))
    })
  }

  const toggleFollow = () => {
    if (!userId) {
      return redirect('/sign-in')
    }

    if (isHost) {
      return
    }

    if (isFollowing) {
      handleUnfollow()
    } else {
      handleFollow()
    }
  }

  return (
    <Button
      disabled={isPending || isHost}
      onClick={toggleFollow}
      variant={'primary'}
      size={'sm'}
      className="w-full lg:w-auto"
    >
      <Heart className={cn('mr-2 h-4 w-4', isFollowing ? 'fill-white' : 'fill-none')} />
      {isFollowing ? 'Unfollow' : 'Follow'}
    </Button>
  )
}

export const ActionsSkeleton = () => {
  return <Skeleton className="h-10 w-full lg:w-24" />
}
