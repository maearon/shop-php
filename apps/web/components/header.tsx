"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Search, ShoppingBag, User, Heart, MenuIcon, LogOut, LogIn } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAppSelector } from "@/store/hooks"
import MegaMenu from "./mega-menu"
import { fetchUser, selectUser } from "@/store/sessionSlice"
import LoginModal from "./login-modal"
import UserAccountSlideout from "./user-account-slideout"
import AdidasLogo from "./adidas-logo"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/store/store"
import sessionApi from "./shared/api/sessionApi"
import flashMessage from "./shared/flashMessages"

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

  const [loading, setLoading] = useState(true)

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        await dispatch(fetchUser())
      } catch (error) {
        console.error("Failed to fetch user:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [dispatch])

  const handleMouseEnter = (menuName: string) => {
    setActiveMenu(menuName)
  }

  const handleMouseLeave = () => {
    setActiveMenu(null)
  }

  const onClick = async (e: any) => {
    e.preventDefault()

    try {
      // Call the API to destroy the session
      const response = await sessionApi.destroy()

      // Always clear local and session storage
      localStorage.removeItem("token")
      localStorage.removeItem("remember_token")
      localStorage.removeItem("refreshToken")
      localStorage.removeItem("accessToken")
      sessionStorage.removeItem("token")
      sessionStorage.removeItem("remember_token")
      sessionStorage.removeItem("refreshToken")
      sessionStorage.removeItem("accessToken")
      await dispatch(fetchUser()) // Fetch user data if needed

      // Check the response status
      if (response.status === 401) {
        flashMessage("error", "Unauthorized")
      }

      // Redirect to home page
      router.push("/")
    } catch (error) {
      // Handle error and show flash message
      flashMessage("error", "Logout error: " + error)
      // Always clear local and session storage
      localStorage.removeItem("token")
      localStorage.removeItem("refresh_token")
      localStorage.removeItem("refreshToken")
      localStorage.removeItem("accessToken")
      localStorage.removeItem("guest_cart_id")
      localStorage.removeItem("guest_wish_id")
      sessionStorage.removeItem("token")
      sessionStorage.removeItem("refresh_token")
      sessionStorage.removeItem("refreshToken")
      sessionStorage.removeItem("accessToken")
      sessionStorage.removeItem("guest_cart_id")
      sessionStorage.removeItem("guest_wish_id")
      await dispatch(fetchUser()) // Fetch user data if needed

      // Check the response status
      flashMessage("error", "Unauthorized")
    }
  }

  const handleUserIconClick = () => {
    if (userData.value?.email) {
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
          <span>
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
          </span>
          {/* Country selector */}
          {/* <div className="hidden md:flex items-center space-x-2 text-xs">
            <span>🇺🇸</span>
            <select className="bg-transparent border-none text-xs">
              <option value="US">United States</option>
              <option value="VN">Viet Nam</option>
            </select>
          </div> */}
        </div>

        <div className="bg-black text-white text-xs py-1 text-center flex justify-between items-center">
          <span>
          </span>
          {/* Country selector */}
          <div className="hidden md:flex items-center space-x-2 text-xs">
            <span></span>
            <select className="bg-transparent border-none text-xs">
              <option value="US">🇺🇸 United States</option>
              <option value="VN">🇻🇳 Viet Nam</option>
            </select>
          </div>
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
                title={userData.value?.email ? "Account" : "Login"}
              >
                <User className="h-5 w-5 cursor-pointer" />
                {!userData.value?.email && (
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

              {loading ? (
                <li>Loading...</li>
              ) : userData.value?.email ? (
                <Link href="#logout" onClick={onClick}>
                  <LogOut className="h-5 w-5 cursor-pointer" />
                </Link>
              ) : (
                <Link href="/account-login">
                  <LogIn className="h-5 w-5 cursor-pointer" />
                </Link>
              )}

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
