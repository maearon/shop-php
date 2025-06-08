"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from "@/components/Providers"
import { Search, ShoppingBag, User, Menu, X } from "lucide-react"
import { searchProducts } from "@/lib/api"
import type { Product } from "@/lib/api"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const { itemCount } = useCart()
  const router = useRouter()
  const searchRef = useRef<HTMLDivElement>(null)

  // Close search dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false)
        setSearchResults([])
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Search products as user types
  useEffect(() => {
    const searchTimeout = setTimeout(async () => {
      if (searchQuery.trim().length > 1) {
        setIsSearching(true)
        try {
          const results = await searchProducts(searchQuery)
          setSearchResults(results.slice(0, 5)) // Show max 5 results
        } catch (error) {
          console.error("Search error:", error)
          setSearchResults([])
        } finally {
          setIsSearching(false)
        }
      } else {
        setSearchResults([])
      }
    }, 300) // Debounce search

    return () => clearTimeout(searchTimeout)
  }, [searchQuery])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setIsSearchOpen(false)
      setSearchResults([])
    }
  }

  const handleProductClick = (product: Product) => {
    router.push(`/products/${product.slug}`)
    setIsSearchOpen(false)
    setSearchResults([])
    setSearchQuery("")
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="text-2xl font-bold">adidas</div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/products" className="hover:text-gray-600">
              Sản phẩm
            </Link>
            <Link href="/men" className="hover:text-gray-600">
              Nam
            </Link>
            <Link href="/women" className="hover:text-gray-600">
              Nữ
            </Link>
            <Link href="/kids" className="hover:text-gray-600">
              Trẻ em
            </Link>
            <Link href="/sale" className="hover:text-gray-600 text-red-600">
              Sale
            </Link>
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative" ref={searchRef}>
              <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(!isSearchOpen)}>
                <Search className="h-5 w-5" />
              </Button>

              {/* Search Dropdown */}
              {isSearchOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white border rounded-lg shadow-lg z-50">
                  <form onSubmit={handleSearchSubmit} className="p-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        type="text"
                        placeholder="Tìm kiếm sản phẩm..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                        autoFocus
                      />
                    </div>
                  </form>

                  {/* Search Results */}
                  {searchQuery.trim().length > 1 && (
                    <div className="border-t max-h-80 overflow-y-auto">
                      {isSearching ? (
                        <div className="p-4 text-center text-gray-500">Đang tìm kiếm...</div>
                      ) : searchResults.length > 0 ? (
                        <>
                          {searchResults.map((product) => (
                            <button
                              key={product.id}
                              onClick={() => handleProductClick(product)}
                              className="w-full p-3 hover:bg-gray-50 flex items-center space-x-3 text-left"
                            >
                              <img
                                src={product.image || "/placeholder.png"}
                                alt={product.name}
                                className="w-12 h-12 object-cover rounded"
                              />
                              <div className="flex-1">
                                <div className="font-medium text-sm">{product.name}</div>
                                <div className="text-xs text-gray-500">{product.category}</div>
                                <div className="text-sm font-semibold">{formatPrice(product.price)}</div>
                              </div>
                            </button>
                          ))}
                          <div className="border-t p-3">
                            <button
                              onClick={handleSearchSubmit}
                              className="w-full text-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                            >
                              Xem tất cả kết quả cho "{searchQuery}"
                            </button>
                          </div>
                        </>
                      ) : (
                        <div className="p-4 text-center text-gray-500">Không tìm thấy sản phẩm nào</div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            <Link href="/login">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>

            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Mobile menu button */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link href="/products" className="hover:text-gray-600">
                Sản phẩm
              </Link>
              <Link href="/men" className="hover:text-gray-600">
                Nam
              </Link>
              <Link href="/women" className="hover:text-gray-600">
                Nữ
              </Link>
              <Link href="/kids" className="hover:text-gray-600">
                Trẻ em
              </Link>
              <Link href="/sale" className="hover:text-gray-600 text-red-600">
                Sale
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
