'use client'

import { Stream, User } from '@prisma/client'
import { LiveKitRoom } from '@livekit/components-react'

import { useViewerToken } from '@/hooks/use-viewer-token'
import { useChatSidebar } from '@/store/use-chat-sidebar'
import { cn } from '@/lib/utils'

import { Video } from './video'
import { Chat } from './chat'
import { ChatToggle } from './chat-toggle'

interface StreamPlayerProps {
  user: User & { stream: Stream | null }
  stream: Stream
  isFollowing: boolean
}

export const StreamPlayer = ({ user, stream, isFollowing }: StreamPlayerProps) => {
  const { token, identity, name } = useViewerToken(user.id)
  const { collapsed } = useChatSidebar((state) => state)

  if (!token || !identity || !name) {
    return <div>hi</div>
  }

  return (
    <>
      {collapsed && (
        <div className="fixed right-2 top-[100px] z-50 hidden lg:block">
          <ChatToggle />
        </div>
      )}

      <LiveKitRoom
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
        className={cn(
          'grid h-full grid-cols-1 lg:grid-cols-3 lg:gap-y-0 xl:grid-cols-3 2xl:grid-cols-6',
          collapsed && 'lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2',
        )}
      >
        <div className="hidden-scrollbar col-span-1 space-y-4 pb-10 lg:col-span-2 lg:overflow-y-auto xl:col-span-2 2xl:col-span-5">
          <Video hostName={user.username} hostIdentity={user.id} />
        </div>

        <div className={cn('col-span-1', collapsed && 'hidden')}>
          <Chat
            viewerName={name}
            hostName={user.username}
            hostIdentity={user.id}
            isFollowing={isFollowing}
            isChatEnable={stream.isChatEnabled}
            isChatDelay={stream.isChatDelayed}
            isChatFollowersOnly={stream.isChatFollowersOnly}
          />
        </div>
      </LiveKitRoom>
    </>
  )
}
