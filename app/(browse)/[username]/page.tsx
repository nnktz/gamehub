import { notFound } from 'next/navigation'

import { isFollowingUser } from '@/lib/follow-service'
import { getUserByUsername } from '@/lib/user-service'

import { Actions } from './_components/actions'
import { isBlockedByUser } from '@/lib/block-service'

const UserPage = async ({ params }: { params: { username: string } }) => {
  const user = await getUserByUsername(params.username)

  if (!user) {
    return notFound()
  }

  const isFollowing = await isFollowingUser(user.id)
  const isBlocked = await isBlockedByUser(user.id)

  return (
    <div className="flex flex-col gap-y-4">
      <p>{user.username}</p>
      <p>{`Following: ${isFollowing}`}</p>
      <p>{`Blocked: ${isBlocked}`}</p>
      <Actions userId={user.id} isFollowing={isFollowing} isBlocked={isBlocked} />
    </div>
  )
}

export default UserPage
