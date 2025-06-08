"use client";
import type React from "react"
// import "../styles/globals.css"
import Head from 'next/head'
// import Header from './layouts/header'
// import Footer from './layouts/footer'
import { Provider } from 'react-redux'
import { store } from '../redux/store'
import { fetchUser } from '../redux/session/sessionSlice'
import { ToastContainer, toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'
import localFont from "next/font/local";
import Script from "next/script";
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { Providers } from "@/components/Providers"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

// export const metadata: Metadata = {
//   title: "Adidas Vietnam | Trang chủ chính thức",
//   description: "Khám phá bộ sưu tập adidas chính hãng. Giày dép, quần áo & phụ kiện thể thao cho nam, nữ và trẻ em.",
// }
// export const metadata: Metadata = {
//   title: {
//     template: "%s | bugbook",
//     default: "bugbook",
//   },
//   description: "The social media app for powernerds",
// };

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

store.dispatch(fetchUser())

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <html lang="vi">
        <body className={inter.className}>
          <Providers>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <Toaster />
          </Providers>
        </body>
      </html>
    </Provider>
  )
}
