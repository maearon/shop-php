"use client"

import Link from "next/link"
import { useState } from "react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-black text-white text-xs py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex gap-4">
            <Link href="/stores" className="hover:underline">
              Tìm cửa hàng
            </Link>
            <Link href="/help" className="hover:underline">
              Trợ giúp
            </Link>
          </div>
          <div className="flex gap-4">
            <Link href="/auth/signin" className="hover:underline">
              Đăng nhập
            </Link>
            <Link href="/auth/signup" className="hover:underline">
              Đăng ký
            </Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="text-2xl font-bold">adidas</div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/men" className="hover:underline font-medium">
              Nam
            </Link>
            <Link href="/women" className="hover:underline font-medium">
              Nữ
            </Link>
            <Link href="/kids" className="hover:underline font-medium">
              Trẻ em
            </Link>
            <Link href="/sports" className="hover:underline font-medium">
              Thể thao
            </Link>
            <Link href="/outlet" className="hover:underline font-medium">
              Outlet
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="p-2" aria-label="Search">
              🔍
            </button>
            <Link href="/cart" className="p-2 relative">
              🛒
              <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                0
              </span>
            </Link>

            {/* Mobile menu button */}
            <button
              className="p-2 md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <Link href="/men" className="hover:underline font-medium">
                Nam
              </Link>
              <Link href="/women" className="hover:underline font-medium">
                Nữ
              </Link>
              <Link href="/kids" className="hover:underline font-medium">
                Trẻ em
              </Link>
              <Link href="/sports" className="hover:underline font-medium">
                Thể thao
              </Link>
              <Link href="/outlet" className="hover:underline font-medium">
                Outlet
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
