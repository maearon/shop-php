"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In a real app, this would call a server action or API endpoint
    // const result = await signIn(email, password)

    // For demo purposes, just simulate a successful login if email contains "adidas"
    if (email.includes("adidas")) {
      window.location.href = "/account"
    } else {
      setError("Email hoặc mật khẩu không đúng")
    }

    setLoading(false)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <Link href="/">
            <Image src="/images/adidas-logo.png" alt="adidas" width={70} height={50} className="h-10 w-auto mx-auto" />
          </Link>
        </div>

        <h1 className="text-2xl font-bold mb-6 text-center">ĐĂNG NHẬP</h1>

        {error && <div className="bg-red-100 text-red-700 p-4 mb-6 rounded">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Mật khẩu
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input id="remember" type="checkbox" className="h-4 w-4 border-gray-300 focus:ring-black" />
              <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                Ghi nhớ đăng nhập
              </label>
            </div>

            <Link href="/account/forgot-password" className="text-sm text-black hover:underline">
              Quên mật khẩu?
            </Link>
          </div>

          <button type="submit" disabled={loading} className="w-full btn-primary">
            {loading ? "Đang xử lý..." : "Đăng nhập"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Chưa có tài khoản?{" "}
            <Link href="/account/register" className="text-black font-medium hover:underline">
              Đăng ký ngay
            </Link>
          </p>
        </div>

        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Hoặc đăng nhập với</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              className="w-full py-3 px-4 border border-gray-300 flex justify-center items-center gap-2 hover:bg-gray-50"
            >
              <Image src="/images/google-icon.png" alt="Google" width={20} height={20} className="h-5 w-5" />
              Google
            </button>
            <button
              type="button"
              className="w-full py-3 px-4 border border-gray-300 flex justify-center items-center gap-2 hover:bg-gray-50"
            >
              <Image src="/images/facebook-icon.png" alt="Facebook" width={20} height={20} className="h-5 w-5" />
              Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
