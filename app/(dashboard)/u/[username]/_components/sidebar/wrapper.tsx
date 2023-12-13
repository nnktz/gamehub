'use client'

import { cn } from '@/lib/utils'
import { useCreatorSidebar } from '@/store/use-creator-sidebar'

export const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const { collapsed } = useCreatorSidebar((state) => state)

  return (
    <aside
      className={cn(
        'fixed left-0 z-50 flex h-full w-[70px] flex-col border-r border-[#2d2e35] bg-background lg:w-60',
        collapsed && 'lg:w-[70px]',
      )}
    >
      {children}
    </aside>
  )
}
