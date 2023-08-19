import { makeVar } from '@apollo/client'

export const avatarVar = makeVar<string | null>(null)

export const isLoadingAvatarVar = makeVar<boolean>(false)
