'use client'

import { User } from '@prisma/client'

import { useSidebar } from '@/store/use-sidebar'

import { UserItem, UserItemSkeleton } from './user-item'
import { Skeleton } from '@/components/ui/skeleton'

export const Recommended = ({ data }: { data: User[] }) => {
  const { collapsed } = useSidebar((state) => state)

  const showLabel = !collapsed && data.length > 0

  return (
    <div>
      {showLabel && (
        <div className="mb-4 pl-6">
          <p className="text-sm text-muted-foreground">Recommend</p>
        </div>
      )}

      <ul className="space-y-2 px-2">
        {data.map((user) => (
          <UserItem
            key={user.id}
            username={user.username}
            imageUrl={user.imageUrl}
            isLive={false}
          />
        ))}
      </ul>
    </div>
  )
}

export const RecommendedSkeleton = () => {
  return (
    <ul className="px-2">
      {[...Array(3)].map((_, i) => (
        <UserItemSkeleton key={i} />
      ))}
    </ul>
  )
}