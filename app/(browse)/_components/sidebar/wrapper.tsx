'use client'

import { useIsClient } from 'usehooks-ts'

import { cn } from '@/lib/utils'
import { useSidebar } from '@/store/use-sidebar'

import { ToggleSkeleton } from './toggle'
import { RecommendedSkeleton } from './recommended'
import { FollowingSkeleton } from './following'

export const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const isClient = useIsClient()

  const { collapsed } = useSidebar((state) => state)

  if (!isClient) {
    return (
      <aside
        className={cn(
          'fixed left-0 z-50 flex h-full w-[70px] flex-col border-r border-[#2d2e35] bg-background lg:w-60',
          collapsed && 'w-[70px]',
        )}
      >
        <ToggleSkeleton />
        <FollowingSkeleton />
        <RecommendedSkeleton />
      </aside>
    )
  }

  return (
    <aside
      className={cn(
        'fixed left-0 z-50 flex h-full w-60 flex-col border-r border-[#2d2e35] bg-background',
        collapsed && 'w-[70px]',
      )}
    >
      {children}
    </aside>
  )
}
