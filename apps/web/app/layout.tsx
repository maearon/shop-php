import type React from "react"
import { UserProvider } from "@auth0/nextjs-auth0/client"
import "./globals.css"

export const metadata = {
  title: "Adidas Vietnam - Official Store",
  description: "Discover the latest adidas collection. Shoes, clothing & accessories for men, women and kids.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  )
}
