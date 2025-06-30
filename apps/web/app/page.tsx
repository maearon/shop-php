"use client"

import ProductTabs from "@/components/product-tabs"
import PromoCarousel, { Slide } from "@/components/promo-carousel"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ProductCard from "@/components/product-card"
import HeroBanner from "@/components/home/HeroBanner"
import HeroBannerSecond from "@/components/home/HeroBannerSecond"
import { useState, useEffect } from "react"


import ProductCarousel from "@/components/product-carousel"
import PromoBanner from "@/components/home/PromoBanner"
import { ChevronDown, ChevronUp } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

import { LastVisitedProduct, Product } from "@/types/product"
import { fakeLastVisitedProducts } from "@/data/fake-last-visited-products"
import { newArrivalProducts } from "@/data/fake-new-arrival-products"
import { mockSlides } from "@/data/mock-slides-data"
import { relatedResources } from "@/data/related-resources-data"

export default function HomePage() {
  const router = useRouter()
  const [stillInterestedProducts, setStillInterestedProducts] = useState<any[]>([])
  const [newArrivalProductsTab, setNewArrivalProductsTab] = useState<Product[]>([])
  const [openCategory, setOpenCategory] = useState<string | null>(null)

  const toggleCategory = (category: string) => {
    setOpenCategory(openCategory === category ? null : category)
  }

  useEffect(() => {
    const visitedProducts: LastVisitedProduct[] = fakeLastVisitedProducts;
    localStorage.setItem("lastVisitedProducts", JSON.stringify(visitedProducts))
    try {
      const lastVisitedProductsStr = localStorage.getItem("lastVisitedProducts") ?? "[]"
      const parsed: LastVisitedProduct[] = JSON.parse(lastVisitedProductsStr)
      const sliced = parsed.slice().reverse()

      setStillInterestedProducts(sliced)
      setNewArrivalProductsTab(newArrivalProducts)
    } catch (err) {
      console.error("Failed to parse lastVisitedProducts", err)
    }
  }, [])

  // const mockSlides: Slide[] = [
  //   {
  //     id: 1,
  //     title: "PAST, PRESENT, FUTURE",
  //     description: "Explore the Superstar in all its iconic glory, now with more comfort.",
  //     image: "https://via.placeholder.com/600x400?text=Superstar",
  //     cta: "SHOP NOW",
  //     href: "/superstar",
  //   },
  //   {
  //     id: 2,
  //     title: "DROPSET 3",
  //     description: "Rooted in Strength.",
  //     image: "https://via.placeholder.com/600x400?text=Dropset",
  //     cta: "SHOP NOW",
  //     href: "/dropset",
  //   },
  //   {
  //     id: 3,
  //     title: "A TRUE MIAMI ORIGINAL",
  //     description: "Rep the Magic City during every match in this signature blue jersey.",
  //     image: "https://via.placeholder.com/600x400?text=Miami",
  //     cta: "SHOP NOW",
  //     href: "/miami",
  //   },
  //   {
  //     id: 4,
  //     title: "SAMBA",
  //     description: "Always iconic, always in style.",
  //     image: "https://via.placeholder.com/600x400?text=Samba",
  //     cta: "SHOP NOW",
  //     href: "/samba",
  //   },
  // ]

  const newProducts = [
    {
      id: 5,
      name: "Real Madrid 24/25 Home Authentic Jersey",
      price: "$130",
      image: "/placeholder.png?height=300&width=250",
    },
    {
      id: 6,
      name: "Real Madrid 24/25 Home Jersey",
      price: "$90",
      image: "/placeholder.png?height=300&width=250",
    },
    {
      id: 7,
      name: "Samba OG Shoes",
      price: "$100",
      image: "/placeholder.png?height=300&width=250",
    },
    {
      id: 8,
      name: "Gazelle Shoes",
      price: "$100",
      image: "/placeholder.png?height=300&width=250",
    },
  ]

  const popularCategories = ["ultraboost", "samba", "campus", "soccer", "gazelle", "spezial"]
  const footerCategories = {
    "SUMMER FAVORITES": ["Summer Shoes", "Tees", "Tank Tops", "Shorts", "Swimwear", "Outdoor Gear & Accessories"],
    "SUMMER SPORT FITS": [
      "Men's Summer Outfits",
      "Men's Tank Tops",
      "Men's Shorts",
      "Women's Summer Outfits",
      "Women's Shorts & Skirts",
      "Women's Tank Tops",
    ],
    "OUR FAVORITE ACCESSORIES": ["Hats", "Bags", "Socks", "Sunglasses", "Water Bottles", "Gift Cards"],
    "SCHOOL UNIFORMS": [
      "Uniform Shoes",
      "Uniform Polos",
      "Uniform Pants",
      "Uniform Shorts",
      "Uniform Accessories",
      "School Backpacks",
    ],
  }

  return (
    <div className="min-h-screen bg-white">
      <PromoBanner />
      <HeroBanner />
      <HeroBannerSecond />
      
      {/* History Products Section */}
      <section className="container mx-auto px-4 py-0 mb-10">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl xl:text-3xl font-extrabold tracking-tight leading-tight break-words">
            STILL <br className="xl:hidden" /> INTERESTED?
          </h2>
          {/* <Button variant="link" className="text-sm font-bold">
            VIEW ALL
          </Button> */}
        </div>

        <ProductCarousel products={stillInterestedProducts.map((p) => p.product)} showIndicators={false} />
      </section>

      {/* Product Tabs Section */}
      <ProductTabs initialProductsByTab={{
        "new-arrivals": newArrivalProductsTab,
        "best-sellers": newArrivalProductsTab,
        "new-to-sale": newArrivalProductsTab,
      }} />

      {/* New Products Section */}
      {/* <section className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <Badge className="bg-black text-white">New Arrivals</Badge>
            <span className="text-sm text-gray-600">Best Sellers</span>
          </div>
          <Button variant="link" className="text-sm font-bold">
            VIEW ALL
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivalProductsTab.map((product, index) => (
            <ProductCard
              key={`${product.id}-${index}`}
              product={{
                ...product,
                price: product.price ?? "N/A",
                image: product.image ?? "/placeholder.png",
              }}
            />
          ))}
        </div>
      </section> */}

      {/* Promo Tiles */}
      {/* <section className="container mx-auto px-1 sm:px-2 md:px-3 lg:px-10 xl:px-20 2xl:px-20 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockSlides.map((title, index) => (
            <Card key={`${title}-${index}`} className="relative overflow-hidden h-80 border-0 rounded-none">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url('${title.image}')`,
                }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
              </div>
              <CardContent className="relative h-full flex flex-col justify-end p-6 text-white">
                <h3 className="font-bold text-lg mb-1">{title.title}</h3>
                {title.subtitle && <p className="text-sm mb-2">{title.subtitle}</p>}
                <p className="text-sm mb-4">{title.description}</p>
                <Button variant="outline" size="sm" className="border border-black text-black font-bold px-2 py-1 text-[11px] sm:text-xs rounded-none hover:bg-gray-100 transition w-fit">
                  {title.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section> */}
      <PromoCarousel slides={mockSlides}/>

      {/* Prime Section */}
      <section className="bg-black text-white py-20 sm:py-18 md:py-0 lg:py-8 xl:py-8 2xl:py-10 mb-0">
        <div className="container mx-auto px-4 flex flex-col items-center text-center gap-0">
          <Image
            src="/assets/resource/Prime_logo_d_c8da1e6868.png"
            alt="Prime Logo"
            width={160}
            height={60}
            className="w-32 sm:w-32 md:w-32 h-auto pb-6"
          />

          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-wide">
            Fast, Free Delivery
          </h2>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-wide pb-6">
            with Prime at adidas
          </h3>
          <Button href="/prime" loading={false} shadow>SHOP NOW</Button>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="container mx-auto px-4 py-0 mb-10">
        <h2 className="text-[32px] font-bold mb-4">Popular right now</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-6">
          {popularCategories.slice(0, 6).map((category, index) => (
            <Button
              key={`${category}-${index}`}
              variant="ghost"
              className="w-full justify-start text-left text-[44px] font-extrabold pb-10
                border-0 border-b border-black
                hover:shadow-[inset_0_-5px_0_0_black]
                hover:bg-transparent focus:bg-transparent active:bg-transparent
                rounded-none shadow-none transition-all duration-200"
              showArrow={false}
            >
              {category}
            </Button>
          ))}
        </div>
      </section>


      {/* Related Resources */}
      {/* <section className="container mx-auto px-1 sm:px-2 md:px-3 lg:px-10 xl:px-20 2xl:px-20 py-0 mb-10">
        <h4 className="text-[24px] font-bold mb-2">RELATED RESOURCES</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedResources.map((resource, index) => (
            <Card key={`${resource}-${index}`} className="border-none shadow-none">
              <CardContent className="p-0">
                <img
                  src={resource.image || "/placeholder.png"}
                  alt={resource.title}
                  className="w-full h-48 object-cover mb-4"
                />
                <h3 className="font-bold mb-2 text-sm">{resource.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{resource.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section> */}

      {/* Related Resources Carousel */}
      <PromoCarousel slides={relatedResources}/>

      {/* Footer Categories */}
      <section className="bg-white container mx-auto px-4 py-12">
        {/* Mobile - Accordion */}
        <div className="block sm:hidden divide-y divide-gray-200">
          {Object.entries(footerCategories).map(([category, items]) => (
            <div key={category}>
              <button
                onClick={() => toggleCategory(category)}
                className="w-full flex justify-between items-center py-4 font-bold text-md"
              >
                {category}
                {openCategory === category ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              <ul className={`pl-4 pb-4 space-y-2 ${openCategory === category ? "block" : "hidden"}`}>
                {items.map((item, index) => (
                  <li key={`${item}-${index}`}>
                    <a href="#" className="text-sm text-gray-600 hover:underline">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Desktop - Grid */}
        <div className="hidden sm:grid grid-cols-2 md:grid-cols-4 gap-8">
          {Object.entries(footerCategories).map(([category, items]) => (
            <div key={category}>
              <h4 className="font-bold mb-4 text-md">{category}</h4>
              <ul className="space-y-2">
                {items.map((item, index) => (
                  <li key={`${item}-${index}`}>
                    <a href="#" className="text-sm text-gray-600 hover:underline">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
