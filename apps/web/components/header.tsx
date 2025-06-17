"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Search, ShoppingBag, User, Heart, MenuIcon, LogOut, LogIn } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAppSelector } from "@/store/hooks"
import MegaMenu from "./mega-menu"
import sessionApi from "./shared/api/sessionApi"
import { fetchUser, selectUser } from "@/store/sessionSlice"
import flashMessage from "./shared/flashMessages"
import router from "next/router"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/store/store"

export default function Header() {
  const pathname = usePathname()
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const dispatch = useDispatch<AppDispatch>()
  const userData = useAppSelector(selectUser)

  // Get cart and wishlist counts from Redux
  const cartItemsCount = useAppSelector((state) => state.cart.items.reduce((total, item) => total + item.quantity, 0))
  const wishlistItemsCount = useAppSelector((state) => state.wishlist.items.length)

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        await dispatch(fetchUser());
      } catch (error) {
        console.error('Failed to fetch user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [dispatch]);

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

  const onClick = async (e: any) => {
    e.preventDefault();
    
    try {
      // Call the API to destroy the session
      const response = await sessionApi.destroy();
      
      // Always clear local and session storage
      localStorage.removeItem("token");
      localStorage.removeItem("remember_token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessToken");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("remember_token");
      sessionStorage.removeItem("refreshToken");
      sessionStorage.removeItem("accessToken");
      await dispatch(fetchUser()); // Fetch user data if needed
  
      // Check the response status
      if (response.status === 401) {
        flashMessage("error", "Unauthorized")
      }
      
      // Redirect to home page
      router.push("/");
    } catch (error) {
      // Handle error and show flash message
      flashMessage("error", "Logout error: " + error);
      // Always clear local and session storage
      localStorage.removeItem("token");
      localStorage.removeItem("remember_token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessToken");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("remember_token");
      sessionStorage.removeItem("refreshToken");
      sessionStorage.removeItem("accessToken");
      await dispatch(fetchUser()); // Fetch user data if needed
  
      // Check the response status
      flashMessage("error", "Unauthorized")
    }
  };

  return (
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
            <div className="text-2xl font-bold">adidas</div>
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
            <div className="hidden md:flex items-center space-x-2">
              <Input placeholder="Search" className="w-48" />
              <Search className="h-5 w-5" />
            </div>
            <Link href="/login" className="relative" title="Login">
              <User className="h-5 w-5 cursor-pointer" />
            </Link>

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
            <Link href="/cart" className="relative">
              <ShoppingBag className="h-5 w-5 cursor-pointer" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            {loading ? (
              <li>Loading...</li>
            ) : userData.value.email ? (
              <Link href="#logout" onClick={onClick}>
                <LogOut className="h-5 w-5 cursor-pointer" />
              </Link>
            ) : (
              <Link href="/login">
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
  )
}
