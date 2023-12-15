import { notFound } from 'next/navigation'

import { isFollowingUser } from '@/lib/follow-service'
import { getUserByUsername } from '@/lib/user-service'

import { isBlockedByUser } from '@/lib/block-service'
import { StreamPlayer } from '@/components/stream-player'

const UserPage = async ({ params }: { params: { username: string } }) => {
  const user = await getUserByUsername(params.username)

  if (!user || !user.stream) {
    notFound()
  }

  const isFollowing = await isFollowingUser(user.id)
  const isBlocked = await isBlockedByUser(user.id)

  if (isBlocked) {
    notFound()
  }

  return (
    <>
      <p>{`${isBlocked}`}</p>
      <StreamPlayer user={user} stream={user.stream} isFollowing={isFollowing} />
    </>
  )
}

export default UserPage
