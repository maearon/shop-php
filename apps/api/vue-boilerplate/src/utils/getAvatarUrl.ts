import md5 from 'blueimp-md5'

export interface UserWithAvatar {
  email?: string
  size?: number
  avatarUrl?: string
}

export function getAvatarUrl(user: UserWithAvatar): string {
  if (user.avatarUrl) return user.avatarUrl

  if (!user.email || !user.size) {
    // fallback avatar image
    return 'https://www.gravatar.com/avatar/?d=mp&s=40'
  }

  const emailHash = md5(user.email.trim().toLowerCase())
  return `https://secure.gravatar.com/avatar/${emailHash}?s=${user.size}`
}
