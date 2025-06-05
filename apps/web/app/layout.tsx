import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "adidas Vietnam - Trang chủ chính thức",
  description: "Khám phá bộ sưu tập adidas chính hãng. Giày dép, quần áo & phụ kiện thể thao cho nam, nữ và trẻ em.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
