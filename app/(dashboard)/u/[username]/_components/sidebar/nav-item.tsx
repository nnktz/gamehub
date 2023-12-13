'use client'

import Link from 'next/link'
import { LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { useCreatorSidebar } from '@/store/use-creator-sidebar'

import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'

interface NavItem {
  label: string
  href: string
  icon: LucideIcon
  isActive: boolean
}

export const NavItem = ({ label, href, icon: Icon, isActive }: NavItem) => {
  const { collapsed } = useCreatorSidebar((state) => state)

  return (
    <Button
      className={cn(
        'h-12 w-full',
        collapsed ? 'justify-center' : 'justify-start',
        isActive && 'bg-accent',
      )}
      variant={'ghost'}
      asChild
    >
      <Link href={href}>
        <div className="flex items-center gap-x-4">
          <Icon className={cn('h-4 w-4', collapsed ? 'mr-0' : 'mr-2')} />

          {!collapsed && <span>{label}</span>}
        </div>
      </Link>
    </Button>
  )
}

export const NavItemSkeleton = () => {
  return (
    <li className="flex items-center gap-x-4 px-3 py-2">
      <Skeleton className="min-h-[48px] min-w-[48px] rounded-md" />
      <div className="hidden flex-1 lg:block">
        <Skeleton className="h-6" />
      </div>
    </li>
  )
}
