import { currentUser } from '@clerk/nextjs'
import { notFound } from 'next/navigation'

import { getUserByUsername } from '@/lib/user-service'

import { StreamPlayer } from '@/components/stream-player'

const CreatorPage = async ({ params }: { params: { username: string } }) => {
  const externalUser = await currentUser()
  const user = await getUserByUsername(params.username)

  if (!user || user.externalUserId !== externalUser?.id || !user.stream) {
    return notFound()
  }

  return (
    <div className="h-full">
      <StreamPlayer user={user} stream={user.stream} isFollowing />
    </div>
  )
}

export default CreatorPage
