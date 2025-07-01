"use client"

import { useState } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

interface MenuLevel {
  title: string
  items: MenuItem[]
}

interface MenuItem {
  name: string
  href?: string
  hasSubmenu?: boolean
  icon?: string
  submenu?: MenuLevel
}

const colorItems = [
  { name: "Black", color: "bg-black" },
  { name: "Grey", color: "bg-gray-500" },
  { name: "White", color: "bg-white border border-gray-300" },
  { name: "Brown", color: "bg-amber-800" },
  { name: "Red", color: "bg-red-500" },
  { name: "Pink", color: "bg-pink-300" },
  { name: "Orange", color: "bg-orange-500" },
  { name: "Yellow", color: "bg-yellow-400" },
  { name: "Green", color: "bg-green-500" },
  { name: "Blue", color: "bg-blue-500" },
  { name: "Purple", color: "bg-purple-500" },
]

// Menu structure matching desktop mega menu
const menuStructure: Record<string, MenuLevel> = {
  MEN: {
    title: "MEN",
    items: [
      {
        name: "Shoes",
        hasSubmenu: true,
        submenu: {
          title: "SHOES",
          items: [
            { name: "Lifestyle", href: "/men-lifestyle" },
            { name: "Running", href: "/men-running" },
            { name: "Football", href: "/men-football" },
            { name: "Basketball", href: "/men-basketball" },
            { name: "Tennis", href: "/men-tennis" },
            { name: "Golf", href: "/men-golf" },
            { name: "Slides & Sandals", href: "/men-slides" },
          ],
        },
      },
      {
        name: "Clothing",
        hasSubmenu: true,
        submenu: {
          title: "CLOTHING",
          items: [
            { name: "Tops & T-Shirts", href: "/men-tops" },
            { name: "Hoodies & Sweatshirts", href: "/men-hoodies_sweatshirts" },
            { name: "Jackets & Coats", href: "/men-jackets" },
            { name: "Pants & Tights", href: "/men-pants" },
            { name: "Shorts", href: "/men-shorts" },
            { name: "Tracksuits", href: "/men-tracksuits" },
            { name: "Swimwear", href: "/men-swimwear" },
          ],
        },
      },
      {
        name: "Accessories",
        hasSubmenu: true,
        submenu: {
          title: "ACCESSORIES",
          items: [
            { name: "Bags & Backpacks", href: "/men-bags" },
            { name: "Caps & Hats", href: "/men-caps" },
            { name: "Socks", href: "/men-socks" },
            { name: "Gloves", href: "/men-gloves" },
            { name: "Belts", href: "/men-belts" },
            { name: "Watches", href: "/men-watches" },
          ],
        },
      },
      { name: "New & Trending", href: "/men/new-trending" },
      {
        name: "Shop by Sport",
        hasSubmenu: true,
        submenu: {
          title: "SHOP BY SPORT",
          items: [
            { name: "Running", href: "/men-running" },
            { name: "Football", href: "/men-football" },
            { name: "Basketball", href: "/men-basketball" },
            { name: "Tennis", href: "/men-tennis" },
            { name: "Golf", href: "/men-golf" },
            { name: "Training", href: "/men-training" },
            { name: "Outdoor", href: "/men-outdoor" },
          ],
        },
      },
      {
        name: "Shop by Collection",
        hasSubmenu: true,
        submenu: {
          title: "SHOP BY COLLECTION",
          items: [
            { name: "Originals", href: "/men-originals" },
            { name: "Sportswear", href: "/men-sportswear" },
            { name: "Performance", href: "/men-performance" },
            { name: "Y-3", href: "/men-y3" },
            { name: "Stella McCartney", href: "/men-stella" },
          ],
        },
      },
      {
        name: "Shop by Color",
        icon: "🌸",
        hasSubmenu: true,
        submenu: {
          title: "SHOP BY COLOR 🌸",
          items: [
            ...colorItems.map((color) => ({ name: color.name, href: `/men/color/${color.name.toLowerCase()}` })),
            { name: "All Men's", href: "/men" },
          ],
        },
      },
      { name: "Sale", href: "/men/sale" },
    ],
  },
  WOMEN: {
    title: "WOMEN",
    items: [
      {
        name: "Shoes",
        hasSubmenu: true,
        submenu: {
          title: "SHOES",
          items: [
            { name: "Lifestyle", href: "/women-lifestyle" },
            { name: "Running", href: "/women-running" },
            { name: "Training", href: "/women-training" },
            { name: "Tennis", href: "/women-tennis" },
            { name: "Slides & Sandals", href: "/women-slides" },
          ],
        },
      },
      {
        name: "Clothing",
        hasSubmenu: true,
        submenu: {
          title: "CLOTHING",
          items: [
            { name: "Tops & T-Shirts", href: "/women-tops" },
            { name: "Sports Bras", href: "/women-sports-bras" },
            { name: "Hoodies & Sweatshirts", href: "/women-hoodies" },
            { name: "Jackets & Coats", href: "/women-jackets" },
            { name: "Pants & Tights", href: "/women-pants" },
            { name: "Shorts", href: "/women-shorts" },
            { name: "Dresses & Skirts", href: "/women-dresses" },
          ],
        },
      },
      { name: "Accessories", href: "/women-accessories" },
      { name: "New & Trending", href: "/women-new-trending" },
      { name: "Shop by Sport", href: "/women-sport" },
      { name: "Sale", href: "/women-sale" },
    ],
  },
  KIDS: {
    title: "KIDS",
    items: [
      { name: "Boys", href: "/kids-boys" },
      { name: "Girls", href: "/kids-girls" },
      { name: "Infants & Toddlers", href: "/kids-infants" },
      { name: "Shoes", href: "/kids-shoes" },
      { name: "Clothing", href: "/kids-clothing" },
      { name: "Accessories", href: "/kids-accessories" },
      { name: "Sale", href: "/kids-sale" },
    ],
  },
  SALE: {
    title: "SALE",
    items: [
      { name: "Men's Sale", href: "/sale-men" },
      { name: "Women's Sale", href: "/sale-women" },
      { name: "Kids' Sale", href: "/sale-kids" },
      { name: "Shoes Sale", href: "/sale-shoes" },
      { name: "Clothing Sale", href: "/sale-clothing" },
      { name: "Accessories Sale", href: "/sale-accessories" },
    ],
  },
  "NEW & TRENDING": {
    title: "NEW & TRENDING",
    items: [
      { name: "New Arrivals", href: "/trending/new-arrivals" },
      { name: "Best Sellers", href: "/trending/best-sellers" },
      { name: "Trending Now", href: "/trending/trending" },
      { name: "Limited Edition", href: "/trending/limited" },
      { name: "Collaborations", href: "/trending/collaborations" },
    ],
  },
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [currentLevel, setCurrentLevel] = useState<MenuLevel>(menuStructure.MEN)
  const [menuHistory, setMenuHistory] = useState<MenuLevel[]>([])

  const handleSubmenuClick = (item: MenuItem) => {
    if (item.submenu) {
      setMenuHistory([...menuHistory, currentLevel])
      setCurrentLevel(item.submenu)
    }
  }

  const handleBackClick = () => {
    if (menuHistory.length > 0) {
      const previousLevel = menuHistory[menuHistory.length - 1]
      setCurrentLevel(previousLevel)
      setMenuHistory(menuHistory.slice(0, -1))
    }
  }

  const handleClose = () => {
    setCurrentLevel(menuStructure.MEN)
    setMenuHistory([])
    onClose()
  }

  const handleMainCategoryClick = (categoryName: string) => {
    const category = menuStructure[categoryName]
    if (category) {
      setCurrentLevel(category)
      setMenuHistory([])
    }
  }

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={handleClose} />

      {/* Menu Panel - Full Width */}
      <div
        className={`
        fixed top-0 left-0 h-full w-full bg-white z-50 
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          {menuHistory.length > 0 && (
            <button onClick={handleBackClick} className="p-2 hover:bg-gray-100 rounded">
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          <h2 className="text-lg font-bold flex-1 text-center">{currentLevel.title}</h2>

          <button onClick={handleClose} className="p-2 hover:bg-gray-100 rounded">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Main Categories (if at root level) */}
        {menuHistory.length === 0 && currentLevel.title === "MEN" && (
          <div className="border-b">
            <div className="flex overflow-x-auto p-4 space-x-4">
              {Object.keys(menuStructure).map((category) => (
                <button
                  key={category}
                  onClick={() => handleMainCategoryClick(category)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium ${
                    currentLevel.title === category ? "bg-black text-white" : "bg-gray-100 text-black hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto">
          {currentLevel.items.map((item, index) => (
            <div key={index}>
              {item.hasSubmenu ? (
                <button
                  onClick={() => handleSubmenuClick(item)}
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50 border-b text-left"
                >
                  <div className="flex items-center space-x-3">
                    {item.icon && <span className="text-lg">{item.icon}</span>}
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              ) : (
                <Link
                  href={item.href || "#"}
                  onClick={handleClose}
                  className="flex items-center justify-between p-4 hover:bg-gray-50 border-b"
                >
                  <div className="flex items-center space-x-3">
                    {/* Color swatch for color items */}
                    {currentLevel.title.includes("COLOR") && (
                      <div
                        className={`w-4 h-4 rounded-full ${
                          colorItems.find((c) => c.name === item.name)?.color || "bg-gray-300"
                        }`}
                      />
                    )}
                    <span className="font-medium">{item.name}</span>
                  </div>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
