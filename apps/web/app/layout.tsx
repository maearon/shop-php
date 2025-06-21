import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "@/components/providers"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ChatWidget from "@/components/chat-widget"
import { FeedbackModalProvider, LocationModalProvider } from "@/components/modal-providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Adidas - Impossible is Nothing",
  description: "Shop the latest adidas shoes, clothing and accessories",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
          <ChatWidget />
          {/* Location Modal */}
          <LocationModalProvider />

          {/* Chat Widget for logged users */}
          <ChatWidget />

          {/* Feedback Modal for non-logged users */}
          <FeedbackModalProvider />
        </Providers> 
      </body>
    </html>
  )
}
