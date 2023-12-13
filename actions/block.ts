'use server'

import { revalidatePath } from 'next/cache'

import { blockUser, unblockUser } from '@/lib/block-service'

export const onBlock = async (id: string) => {
  try {
    // TODO: Adapt to disconnect form livestream
    // TODO: Allow ability to kick the guest
    const blockedUser = await blockUser(id)

    if (blockedUser) {
      revalidatePath(`/${blockedUser.blocked.username}`)
    }

    return blockedUser
  } catch (error) {
    throw new Error('Internal Error')
  }
}

export const onUnblock = async (id: string) => {
  try {
    const unblockedUser = await unblockUser(id)

    if (unblockedUser) {
      revalidatePath(`/${unblockedUser.blocked.username}`)
    }

    return unblockedUser
  } catch (error) {
    throw new Error('Internal Error')
  }
}
