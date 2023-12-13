import { notFound } from 'next/navigation'

import { getSelf } from '@/lib/auth-service'
import { getStreamByUserId } from '@/lib/stream-service'

import { ToggleCard } from './_components/toggle-card'

const ChatPage = async () => {
  const self = await getSelf()
  const stream = await getStreamByUserId(self.id)

  if (!stream) {
    return notFound()
  }

  return (
    <div className="p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Chat settings</h1>
      </div>

      <div className="space-y-4">
        <ToggleCard field="isChatEnabled" label="Enable chat" value={stream.isChatEnabled} />
        <ToggleCard
          field="isChatFollowersOnly"
          label="Must be following to chat"
          value={stream.isChatFollowersOnly}
        />
        <ToggleCard field="isChatDelayed" label="Delay chat" value={stream.isChatDelayed} />
      </div>
    </div>
  )
}

export default ChatPage
