import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Provider } from "react-redux"
import { store } from "@/redux/store"
import { Providers } from "@/components/Providers"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Adidas Admin Dashboard",
  description: "Manage your Adidas store",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Provider store={store}>
      <html lang="vi">
        <body className={inter.className}>
          <Providers>
            <div className="flex min-h-screen bg-gray-50 flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <Toaster />
          </Providers>
        </body>
      </html>
    </Provider>
  );
}
