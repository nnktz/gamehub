import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { User } from '@prisma/client'

import { Thumbnail, ThumbnailSkeleton } from '@/components/thumbnail'
import { Skeleton } from '@/components/ui/skeleton'
import { VerifiedMark } from '@/components/verified-mark'

export const ResultCard = ({
  data,
}: {
  data: {
    id: string
    name: string
    thumbnailUrl: string | null
    isLive: boolean
    updatedAt: Date
    user: User
  }
}) => {
  return (
    <Link href={`/${data.user.username}`}>
      <div className="flex w-full gap-x-4">
        <div className="relative h-[9rem] w-[16rem]">
          <Thumbnail
            src={data.thumbnailUrl}
            fallback={data.user.imageUrl}
            isLive={data.isLive}
            username={data.user.username}
          />
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-x-2">
            <p className="cursor-pointer text-lg font-bold hover:text-blue-500">
              {data.user.username}
            </p>
            <VerifiedMark />
          </div>

          <p className="text-sm text-muted-foreground">{data.name}</p>
          <p className="text-sm text-muted-foreground">
            {formatDistanceToNow(new Date(data.updatedAt), { addSuffix: true })}
          </p>
        </div>
      </div>
    </Link>
  )
}

export const ResultCardSkeleton = () => {
  return (
    <div className="flex w-full gap-x-4">
      <div className="relative h-[9rem] w-[16rem]">
        <ThumbnailSkeleton />
      </div>

      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-3 w-12" />
      </div>
    </div>
  )
}
