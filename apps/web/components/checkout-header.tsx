import Link from "next/link"
import { ShoppingBag } from "lucide-react"

export default function CheckoutHeader() {
  return (
    <header className="border-b border-gray-200 py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Left side - Logo and greeting */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-2xl font-bold">
              adidas
            </Link>
            <span className="text-sm font-medium">HI, MANH!</span>
          </div>

          {/* Right side - Cart and adiClub */}
          <div className="flex items-center space-x-6">
            <Link href="/cart" className="relative">
              <ShoppingBag className="h-6 w-6" />
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </Link>
            <span className="text-sm font-medium">adiClub</span>
          </div>
        </div>
      </div>
    </header>
  )
}
