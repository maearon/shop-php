"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Search, ShoppingBag, User, Heart, MenuIcon, LogOut, LogIn, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAppSelector } from "@/store/hooks"
import MegaMenu from "./mega-menu"
import { fetchUser, selectUser } from "@/store/sessionSlice"
import LoginModal from "./login-modal"
import UserAccountSlideout from "./user-account-slideout"
import AdidasLogo from "./adidas-logo"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "@/store/store"
import sessionApi from "./shared/api/sessionApi"
import flashMessage from "./shared/flashMessages"
import TopBarDropdown from "./top-bar-dropdown"
import MobileMenu from "./mobile-menu"
import MobileAppBanner from "./mobile-app-banner"
import MobileSearchOverlay from "./mobile-search-overlay"

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showUserSlideout, setShowUserSlideout] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showTopBarDropdown, setShowTopBarDropdown] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showMobileSearch, setShowMobileSearch] = useState(false)
  const [showAppBanner, setShowAppBanner] = useState(true)
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [loginBadgeAnimate, setLoginBadgeAnimate] = useState(false)
  const userData = useAppSelector(selectUser)

  // Top bar messages
  const topBarMessages = ["FREE STANDARD SHIPPING WITH ADICLUB", "FAST, FREE DELIVERY WITH PRIME"]

  // Auto-rotate messages every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % topBarMessages.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Login badge animation - bounce 3 times every 3 seconds
  useEffect(() => {
    if (!userData.value?.email) {
      const interval = setInterval(() => {
        setLoginBadgeAnimate(true)
        setTimeout(() => setLoginBadgeAnimate(false), 900) // 3 bounces * 300ms each
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [userData.value?.email])

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
      const response = await sessionApi.destroy()
      localStorage.removeItem("token")
      localStorage.removeItem("remember_token")
      localStorage.removeItem("refreshToken")
      localStorage.removeItem("accessToken")
      sessionStorage.removeItem("token")
      sessionStorage.removeItem("remember_token")
      sessionStorage.removeItem("refreshToken")
      sessionStorage.removeItem("accessToken")
      await dispatch(fetchUser())

      if (response.status === 401) {
        flashMessage("error", "Unauthorized")
      }
      router.push("/")
    } catch (error) {
      flashMessage("error", "Logout error: " + error)
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
      await dispatch(fetchUser())
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
      setShowMobileSearch(false)
    }
  }

  const handleSearchClick = () => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}&sitePath=us`)
    }
  }

  const handleMobileSearchClick = () => {
    setShowMobileSearch(true)
  }

  return (
    <>
      {/* Mobile App Banner */}
      <MobileAppBanner isOpen={showAppBanner} onClose={() => setShowAppBanner(false)} />

      <header className="relative border-b border-gray-200">
      {/* Top bar */}
        <div className="bg-black text-white text-xs py-1 text-center">
          <span>
            FREE STANDARD SHIPPING WITH ADICLUB{" "}
            <button 
            className="ml-1 inline-flex items-center"
            onClick={() => setShowTopBarDropdown(!showTopBarDropdown)}
            >
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
          {/* Desktop Layout */}
          <div className="hidden md:flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <AdidasLogo />
            </Link>

            {/* Desktop Navigation */}
            <nav className="flex space-x-8">
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

            {/* Right side icons */}
            <div className="flex items-center space-x-4">
              {/* Desktop Search */}
              <form onSubmit={handleSearchSubmit} className="flex items-center space-x-2">
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
                  <span
                    className={cn(
                      "absolute -top-2 -right-2 bg-yellow-500 text-black text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold transition-transform duration-100",
                      loginBadgeAnimate && "animate-bounce",
                    )}
                  >
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

              {/* Desktop Login/Logout */}
              {loading ? (
                <span>Loading...</span>
              ) : userData.value?.email ? (
                <Link href="#logout" onClick={onClick}>
                  <LogOut className="h-5 w-5 cursor-pointer" />
                </Link>
              ) : (
                <Link href="/account-login">
                  <LogIn className="h-5 w-5 cursor-pointer" />
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden flex items-center justify-between">
            {/* Left side - Hamburger and Wishlist */}
            <div className="flex items-center space-x-4">
              <button onClick={() => setShowMobileMenu(true)}>
                <MenuIcon className="h-6 w-6" />
              </button>

              <Link href="/wishlist" className="relative">
                <Heart className="h-5 w-5 cursor-pointer" />
                {wishlistItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlistItemsCount}
                  </span>
                )}
              </Link>
            </div>

            {/* Center - Logo */}
            <Link href="/" className="flex items-center">
              <AdidasLogo />
            </Link>

            {/* Right side - User, Search, Cart */}
            <div className="flex items-center space-x-4">
              <button
                onClick={handleUserIconClick}
                className="relative"
                title={userData.value?.email ? "Account" : "Login"}
              >
                <User className="h-5 w-5 cursor-pointer" />
                {!userData.value?.email && (
                  <span
                    className={cn(
                      "absolute -top-2 -right-2 bg-yellow-500 text-black text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold transition-transform duration-100",
                      loginBadgeAnimate && "animate-bounce",
                    )}
                  >
                    1
                  </span>
                )}
              </button>

              <button onClick={handleMobileSearchClick}>
                <Search className="h-5 w-5 cursor-pointer" />
              </button>

              <Link href="/cart" className="relative">
                <ShoppingBag className="h-5 w-5 cursor-pointer" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Desktop Mega Menu */}
        <MegaMenu activeMenu={activeMenu} onClose={handleMouseLeave} />
      </header>

      {/* Top Bar Dropdown */}
      <TopBarDropdown isOpen={showTopBarDropdown} onClose={() => setShowTopBarDropdown(false)} />

      {/* Mobile Menu */}
      <MobileMenu isOpen={showMobileMenu} onClose={() => setShowMobileMenu(false)} />

      {/* Mobile Search Overlay */}
      <MobileSearchOverlay
        isOpen={showMobileSearch}
        onClose={() => setShowMobileSearch(false)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={handleSearchSubmit}
      />

      {/* Login Modal */}
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />

      {/* User Account Slideout */}
      <UserAccountSlideout isOpen={showUserSlideout} onClose={() => setShowUserSlideout(false)} />
    </>
  )
}
