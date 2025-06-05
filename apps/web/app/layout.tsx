import type React from "react"
import "./globals.css"
import Header from "@/components/Header"

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
        <Header />
        {children}
      </body>
    </html>
  )
}
