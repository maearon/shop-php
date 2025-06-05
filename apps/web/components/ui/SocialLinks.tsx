export default function SocialLinks() {
  const socialLinks = [
    { name: "Facebook", url: "https://facebook.com/adidasVN" },
    { name: "Instagram", url: "https://instagram.com/adidasVN" },
    { name: "Twitter", url: "https://twitter.com/adidasVN" },
    { name: "YouTube", url: "https://youtube.com/adidasVN" },
  ]

  return (
    <div className="flex justify-center gap-8">
      {socialLinks.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-gray-300 transition-colors text-lg font-medium"
        >
          {link.name}
        </a>
      ))}
    </div>
  )
}
