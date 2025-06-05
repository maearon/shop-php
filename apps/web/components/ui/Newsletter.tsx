"use client"

import type React from "react"

import { useState } from "react"

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Normally would submit to an API
    setSubscribed(true)
  }

  return (
    <div className="my-16 py-12 px-4 bg-gray-100">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">ĐĂNG KÝ NHẬN TIN</h2>
        <p className="mb-6">Đăng ký để nhận thông tin về sản phẩm mới, khuyến mãi đặc biệt và các sự kiện độc quyền.</p>

        {subscribed ? (
          <div className="bg-green-100 text-green-800 p-4 rounded">
            Cảm ơn bạn đã đăng ký! Bạn sẽ sớm nhận được email từ chúng tôi.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Địa chỉ email của bạn"
              required
              className="flex-grow px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button type="submit" className="btn-primary whitespace-nowrap">
              Đăng ký
            </button>
          </form>
        )}

        <p className="text-sm text-gray-500 mt-4">
          Bằng cách đăng ký, bạn đồng ý với Chính sách bảo mật của chúng tôi.
        </p>
      </div>
    </div>
  )
}
