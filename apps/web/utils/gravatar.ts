import md5 from "md5"

export const getGravatarUrl = (email?: string, fallbackUrl = "/avatar-placeholder.png") => {
  if (!email) return fallbackUrl
  const hash = md5(email.trim().toLowerCase())
  return `https://www.gravatar.com/avatar/${hash}?d=identicon`
}
