"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface Product {
  id: string
  name: string
  price: number
  image_url: string
  category: string
  brand: string
}

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data for now - in production this would fetch from API
    const mockProducts: Product[] = [
      {
        id: "1",
        name: "Ultraboost 22",
        price: 4200000,
        image_url: "/placeholder.svg?height=300&width=300",
        category: "Running",
        brand: "adidas",
      },
      {
        id: "2",
        name: "Stan Smith",
        price: 2500000,
        image_url: "/placeholder.svg?height=300&width=300",
        category: "Originals",
        brand: "adidas",
      },
      {
        id: "3",
        name: "Superstar",
        price: 2800000,
        image_url: "/placeholder.svg?height=300&width=300",
        category: "Originals",
        brand: "adidas",
      },
      {
        id: "4",
        name: "NMD R1",
        price: 3200000,
        image_url: "/placeholder.svg?height=300&width=300",
        category: "Originals",
        brand: "adidas",
      },
    ]

    setTimeout(() => {
      setProducts(mockProducts)
      setLoading(false)
    }, 1000)
  }, [])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(price)
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-300 aspect-square rounded-lg mb-4"></div>
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div key={product.id} className="group cursor-pointer">
          <div className="aspect-square relative overflow-hidden rounded-lg mb-4">
            <Image
              src={product.image_url || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">{product.category}</p>
            <h3 className="font-medium text-lg mb-2">{product.name}</h3>
            <p className="font-bold text-xl">{formatPrice(product.price)}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
