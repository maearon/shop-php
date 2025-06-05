"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, ShoppingBag, User, Menu, X } from "lucide-react"
import Navigation from "./Navigation"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-black text-white text-xs py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex gap-4">
            <Link href="/store-finder" className="hover:underline">
              Tìm cửa hàng
            </Link>
            <Link href="/help" className="hover:underline">
              Trợ giúp
            </Link>
          </div>
          <div className="flex gap-4">
            <Link href="/account/login" className="hover:underline">
              Đăng nhập
            </Link>
            <Link href="/account/register" className="hover:underline">
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
            <Image src="/images/adidas-logo.png" alt="adidas" width={70} height={50} className="h-8 w-auto" />
          </Link>

          {/* Desktop Navigation - hidden on mobile */}
          <div className="hidden md:block">
            <Navigation />
          </div>

          {/* Search and Cart */}
          <div className="flex items-center gap-4">
            <button className="p-2" aria-label="Search">
              <Search size={20} />
            </button>
            <Link href="/account" className="p-2">
              <User size={20} />
            </Link>
            <Link href="/cart" className="p-2 relative">
              <ShoppingBag size={20} />
              <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                0
              </span>
            </Link>

            {/* Mobile menu button */}
            <button
              className="p-2 md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white absolute w-full left-0 shadow-lg z-50">
          <div className="container mx-auto px-4 py-4">
            <Navigation mobile={true} />
          </div>
        </div>
      )}
    </header>
  )
}
