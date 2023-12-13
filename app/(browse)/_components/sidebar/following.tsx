'use client'

import { Follow, User } from '@prisma/client'

import { useSidebar } from '@/store/use-sidebar'

import { UserItem, UserItemSkeleton } from './user-item'

export const Following = ({ data }: { data: (Follow & { following: User })[] }) => {
  const { collapsed } = useSidebar()

  if (!data.length) {
    return null
  }

  return (
    <div>
      {!collapsed && (
        <div className="mb-4 pl-6">
          <p className="text-sm text-muted-foreground">Following</p>
        </div>
      )}

      <ul className="space-y-2 px-2">
        {data.map((item) => (
          <UserItem
            key={item.following.id}
            username={item.following.username}
            imageUrl={item.following.imageUrl}
          />
        ))}
      </ul>
    </div>
  )
}

export const FollowingSkeleton = () => {
  return (
    <ul className="px-2 pt-2 lg:pt-0">
      {[...Array(3).map((_, i) => <UserItemSkeleton key={i} />)]}
    </ul>
  )
}
