import Image from 'next/image'

import { UserAvatar } from './user-avatar'
import { Skeleton } from './ui/skeleton'
import { LiveBadge } from './live-badge'

interface ThumbnailProps {
  src: string | null
  fallback: string
  username: string
  isLive: boolean
}

export const Thumbnail = ({ fallback, src, username, isLive }: ThumbnailProps) => {
  let content

  if (!src) {
    content = (
      <div className="flex h-full w-full flex-col items-center justify-center gap-y-4 rounded-md bg-background transition-transform group-hover:-translate-y-2 group-hover:translate-x-2">
        <UserAvatar size={'lg'} showBadge username={username} imageUrl={fallback} isLive={isLive} />
      </div>
    )
  } else {
    content = (
      <Image
        src={src}
        alt={`thumbnail - ${username}`}
        fill
        className="rounded-md object-cover transition-transform group-hover:-translate-y-2 group-hover:translate-x-2"
      />
    )
  }

  return (
    <div className="group relative aspect-video cursor-pointer rounded-md">
      <div className="absolute inset-0 flex items-center justify-center rounded-md bg-blue-600 opacity-0 group-hover:opacity-100" />
      {content}

      {isLive && src && (
        <div className="absolute left-2 top-2 transition-transform group-hover:-translate-y-2 group-hover:translate-x-2">
          <LiveBadge />
        </div>
      )}
    </div>
  )
}

export const ThumbnailSkeleton = () => {
  return (
    <div className="group relative aspect-video cursor-pointer rounded-xl">
      <Skeleton className="h-full w-full" />
    </div>
  )
}
