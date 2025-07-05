import md5 from "md5"

export const getGravatarUrl = (
  email?: string, 
  fallbackUrl = "/avatar-placeholder.png", 
  fallbackEmail = "default@example.com"
) => {
  if (!email) return fallbackUrl
  const finalEmail = email?.trim().toLowerCase() || fallbackEmail
  const hash = md5(finalEmail.trim().toLowerCase())
  return `https://www.gravatar.com/avatar/${hash}?d=identicon`
}
