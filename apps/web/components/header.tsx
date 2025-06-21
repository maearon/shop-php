"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Search, ShoppingBag, User, Heart, MenuIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAppSelector } from "@/store/hooks"
import MegaMenu from "./mega-menu"
import { selectUser } from "@/store/sessionSlice"
import LoginModal from "./login-modal"
import UserAccountSlideout from "./user-account-slideout"
import AdidasLogo from "./adidas-logo"

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showUserSlideout, setShowUserSlideout] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const userData = useAppSelector(selectUser)

  // Get cart and wishlist counts from Redux
  const cartItemsCount = useAppSelector((state) => state.cart.items.reduce((total, item) => total + item.quantity, 0))
  const wishlistItemsCount = useAppSelector((state) => state.wishlist.items.length)

  const navItems = [
    { name: "MEN", href: "/men" },
    { name: "WOMEN", href: "/women" },
    { name: "KIDS", href: "/kids" },
    { name: "SALE", href: "/sale" },
    { name: "NEW & TRENDING", href: "/trending" },
  ]

  const handleMouseEnter = (menuName: string) => {
    setActiveMenu(menuName)
  }

  const handleMouseLeave = () => {
    setActiveMenu(null)
  }

  const handleUserIconClick = () => {
    if (userData.value.email) {
      setShowUserSlideout(true)
    } else {
      setShowLoginModal(true)
    }
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}&sitePath=us`)
    }
  }

  const handleSearchClick = () => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}&sitePath=us`)
    }
  }

  return (
    <>
      <header className="relative border-b border-gray-200">
        {/* Top bar */}
        <div className="bg-black text-white text-xs py-1 text-center">
          FREE STANDARD SHIPPING WITH ADICLUB{" "}
          <button className="ml-1 inline-flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-3 h-3"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
        </div>

        {/* Main header */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              {/* <div className="text-2xl font-bold">adidas</div> */}
              <AdidasLogo />
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <div key={item.name} className="relative" onMouseEnter={() => handleMouseEnter(item.name)}>
                  <Link
                    href={item.href}
                    className={cn(
                      "text-sm font-medium hover:underline py-2",
                      pathname === item.href && "border-b-2 border-black",
                      activeMenu === item.name && "border-b-2 border-black",
                    )}
                  >
                    {item.name}
                  </Link>
                </div>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center space-x-2">
                <Input
                  placeholder="Search"
                  className="w-48"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="button" onClick={handleSearchClick}>
                  <Search className="h-5 w-5 cursor-pointer" />
                </button>
              </form>

              {/* User Icon */}
              <button
                onClick={handleUserIconClick}
                className="relative"
                title={userData.value.email ? "Account" : "Login"}
              >
                <User className="h-5 w-5 cursor-pointer" />
                {!userData.value.email && (
                  <span className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    1
                  </span>
                )}
              </button>

              {/* Wishlist with count */}
              <Link href="/wishlist" className="relative">
                <Heart className="h-5 w-5 cursor-pointer" />
                {wishlistItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlistItemsCount}
                  </span>
                )}
              </Link>

              {/* Cart with count */}
              <Link href="/cart" className="relative group">
                <ShoppingBag className="h-5 w-5 cursor-pointer" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
                {/* Cart Empty Tooltip */}
                {cartItemsCount === 0 && (
                  <div className="absolute top-8 right-0 bg-white border shadow-lg p-4 rounded hidden group-hover:block z-10 whitespace-nowrap">
                    <p className="font-bold">YOUR CART IS EMPTY</p>
                  </div>
                )}
              </Link>

              <MenuIcon className="h-5 w-5 cursor-pointer md:hidden" />
            </div>
          </div>
        </div>

        {/* Mega Menu */}
        <MegaMenu activeMenu={activeMenu} onClose={handleMouseLeave} />
      </header>

      {/* Login Modal */}
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />

      {/* User Account Slideout */}
      <UserAccountSlideout isOpen={showUserSlideout} onClose={() => setShowUserSlideout(false)} />
    </>
  )
}
