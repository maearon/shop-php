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
import { useState, useEffect } from "react"
import { LastVisitedProduct } from "@/types/product"

export default function HomePage() {
  const [stillInterestedProducts, setStillInterestedProducts] = useState<any[]>([])

    useEffect(() => {
    const visitedProducts: LastVisitedProduct[] = fakeLastVisitedProducts
    localStorage.setItem("lastVisitedProducts", JSON.stringify(visitedProducts))

    try {
      const lastVisitedProductsStr = localStorage.getItem("lastVisitedProducts") ?? "[]"
      const parsed: LastVisitedProduct[] = JSON.parse(lastVisitedProductsStr)
      const sliced = parsed.slice()

      setStillInterestedProducts(sliced)
    } catch (err) {
      console.error("Failed to parse lastVisitedProducts", err)
    }
  }, [])

  // ✅ Fake slide data
  const fakeLastVisitedProducts = [
    {
      product: {
        id: "1",
        display_name: "Soft Lux Mesh Full-Zip Hoodie",
        name: "Soft Lux Mesh Full-Zip Hoodie",
        price: "$70",
        attribute_list: {
          brand: "Sportswear"
        },
        price_information: [
          {
            value: 70,
            value_no_vat: 70,
            type: "original"
          }
        ],
        pricing_information: { 
          currentPrice: 70, 
          standard_price: 70, 
          standard_price_no_vat: 70, 
        },
        thumbnail: "/images/Soft_Lux_Mesh_Full-Zip_Hoodie_Beige_JV9858_000_plp_model.jpg",
        image_url: "/images/Soft_Lux_Mesh_Full-Zip_Hoodie_Beige_JV9858_000_plp_model.jpg",
        model_number: "KLH81",
        base_model_number: "KLH81",
        product_type: "inline",
      },
      timestamp: Date.now(),
      url: "/us/soft-lux-mesh-full-zip-hoodie/JV9858.html",
    },
    {
      product: {
        id: "2",
        display_name: "adicolor Firebird Oversized Track Pants",
        name: "adicolor Firebird Oversized Track Pants",
        price: "$80",
        attribute_list: {
          brand: "Originals"
        },
        price_information: [
          {
            value: 80,
            value_no_vat: 80,
            type: "original"
          }
        ],
        pricing_information: { 
          currentPrice: 80, 
          standard_price: 80, 
          standard_price_no_vat: 80, 
        },
        thumbnail: "/images/adicolor_Firebird_Oversized_Track_Pants_Blue_JV7492_000_plp_model.jpg",
        image_url: "/images/adicolor_Firebird_Oversized_Track_Pants_Blue_JV7492_000_plp_model.jpg",
        model_number: "DB724",
        base_model_number: "DB724",
        product_type: "inline",
      },
      timestamp: Date.now() - 10000,
      url: "/us/adidas-originals-x-minecraft-jersey-kids/JV7492.html",
    },
    {
      product: {
        id: "3",
        display_name: "Adicolor Firebird Oversized Track Pants",
        name: "Adicolor Firebird Oversized Track Pants",
        price: "$70",
        attribute_list: {
          brand: "Originals"
        },
        price_information: [
          {
            value: 70,
            value_no_vat: 70,
            type: "original"
          }
        ],
        pricing_information: { 
          currentPrice: 70, 
          standard_price: 70, 
          standard_price_no_vat: 70, 
        },
        thumbnail: "/images/Teamgeist_Adicolor_Cropped_Track_Top_Blue_JZ8277_000_plp_model.jpg",
        image_url: "/images/Teamgeist_Adicolor_Cropped_Track_Top_Blue_JZ8277_000_plp_model.jpg",
        model_number: "KSU13",
        base_model_number: "KSU13",
        product_type: "inline",
      },
      timestamp: Date.now() - 20000,
      url: "/us/adicolor-firebird-oversized-track-pants/JZ8277.html",
    },
    {
      product: {
        id: "4",
        display_name: "Adifom Stan Smith Mule Shoes",
        name: "Adifom Stan Smith Mule Shoes",
        price: "$70",
        attribute_list: {
          brand: "Originals"
        },
        price_information: [
          {
            value: 70,
            value_no_vat: 70,
            type: "original"
          }
        ],
        pricing_information: { 
          currentPrice: 70, 
          standard_price: 70, 
          standard_price_no_vat: 70, 
        },
        thumbnail: "/images/Adifom_Stan_Smith_Mule_Shoes_Blue_JR8820_00_plp_standard.jpg",
        image_url: "/images/Adifom_Stan_Smith_Mule_Shoes_Blue_JR8820_00_plp_standard.jpg",
        model_number: "DL921",
        base_model_number: "DL921",
        product_type: "inline",
      },
      timestamp: Date.now() - 30000,
      url: "/us/teamgeist-adicolor-cropped-track-top/JR8820.html",
    },
    {
      product: {
        id: "5",
        display_name: "Soft Lux Mesh Tee",
        name: "Soft Lux Mesh Tee",
        price: "$35",
        price_information: [
          {
            value: 35,
            value_no_vat: 35,
            type: "original"
          }
        ],
        pricing_information: { 
          currentPrice: 35, 
          standard_price: 35, 
          standard_price_no_vat: 35, 
        },
        thumbnail: "/images/Soft_Lux_Mesh_Tee_Beige_JV9873_000_plp_model.jpg",
        image_url: "/images/Soft_Lux_Mesh_Tee_Beige_JV9873_000_plp_model.jpg",
        model_number: "LYT60",
        base_model_number: "LYT60",
        product_type: "inline",
      },
      timestamp: Date.now() - 40000,
      url: "/us/adifom-stan-smith-mule-shoes/JV9873.html",
    },
    {
      product: {
        id: "6",
        display_name: "Superstar 82 Roller Skates",
        name: "Superstar 82 Roller Skates",
        price: "$200",
        price_information: [
          {
            value: 200,
            value_no_vat: 200,
            type: "original"
          }
        ],
        pricing_information: { 
          currentPrice: 200, 
          standard_price: 200, 
          standard_price_no_vat: 200, 
        },
        thumbnail: "/images/Superstar_82_Roller_Skates_Black_JI3535_00_plp_standard.jpg",
        image_url: "/images/Superstar_82_Roller_Skates_Black_JI3535_00_plp_standard.jpg",
        model_number: "LYT60",
        base_model_number: "LYT60",
        product_type: "inline",
      },
      timestamp: Date.now() - 40000,
      url: "/us/adifom-stan-smith-mule-shoes/JI3535.html",
    },
    {
      product: {
        id: "7",
        display_name: "Tiro Cut 3-Stripes Soft Mesh Long Dress",
        name: "Tiro Cut 3-Stripes Soft Mesh Long Dress",
        price: "$60",
        price_information: [
          {
            value: 60,
            value_no_vat: 60,
            type: "original"
          }
        ],
        pricing_information: { 
          currentPrice: 60, 
          standard_price: 60, 
          standard_price_no_vat: 60, 
        },
        thumbnail: "/images/Tiro_Cut_3-Stripes_Soft_Mesh_Long_Dress_Burgundy_JX5160_000_plp_model.jpg",
        image_url: "/images/Tiro_Cut_3-Stripes_Soft_Mesh_Long_Dress_Burgundy_JX5160_000_plp_model.jpg",
        model_number: "LYT60",
        base_model_number: "LYT60",
        product_type: "inline",
      },
      timestamp: Date.now() - 40000,
      url: "/us/adifom-stan-smith-mule-shoes/JX5160.html",
    },
  ];

  const mockSlides: Slide[] = [
    {
      id: 1,
      title: "PAST, PRESENT, FUTURE",
      description: "Explore the Superstar in all its iconic glory, now with more comfort.",
      image: "https://via.placeholder.com/600x400?text=Superstar",
      cta: "SHOP NOW",
      href: "/superstar",
    },
    {
      id: 2,
      title: "DROPSET 3",
      description: "Rooted in Strength.",
      image: "https://via.placeholder.com/600x400?text=Dropset",
      cta: "SHOP NOW",
      href: "/dropset",
    },
    {
      id: 3,
      title: "A TRUE MIAMI ORIGINAL",
      description: "Rep the Magic City during every match in this signature blue jersey.",
      image: "https://via.placeholder.com/600x400?text=Miami",
      cta: "SHOP NOW",
      href: "/miami",
    },
    {
      id: 4,
      title: "SAMBA",
      description: "Always iconic, always in style.",
      image: "https://via.placeholder.com/600x400?text=Samba",
      cta: "SHOP NOW",
      href: "/samba",
    },
  ] 

  const stillInterestedProducts2 = [
    {
      id: 1,
      name: "Own The Run Shorts",
      price: "$18",
      image: "/placeholder.png?height=300&width=250",
    },
    {
      id: 2,
      name: "Adizero Adios 8 Shoes",
      price: "$160",
      image: "/placeholder.png?height=300&width=250",
    },
    {
      id: 3,
      name: "Essentials Fleece Regular Tapered Pants",
      price: "$50",
      image: "/placeholder.png?height=300&width=250",
    },
    {
      id: 4,
      name: "Z.N.E. Premium Full-Zip Hoodie",
      price: "$120",
      image: "/placeholder.png?height=300&width=250",
    },
  ]

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

  const promoTiles = [
    {
      title: "SUPERSTAR",
      subtitle: "PAST, PRESENT, FUTURE",
      description: "Explore the Superstar, now updated for the next generation.",
      image: "/placeholder.png?height=400&width=300",
      cta: "SHOP NOW",
    },
    {
      title: "UNDENIABLE DUO",
      subtitle: "",
      description: "Bring 3-Stripes style that shows your #1 supportive team-mates for seasons to you.",
      image: "/placeholder.png?height=400&width=300",
      cta: "SHOP NOW",
    },
    {
      title: "PLAY YOUR FASTEST",
      subtitle: "",
      description: "Ultraboost 5 tennis shoes. Made for speed.",
      image: "/placeholder.png?height=400&width=300",
      cta: "SHOP NOW",
    },
    {
      title: "DROPSET 3",
      subtitle: "",
      description: "Rooted in Strength.",
      image: "/placeholder.png?height=400&width=300",
      cta: "SHOP NOW",
    },
  ]

  const popularCategories = ["ultraboost", "samba", "campus", "soccer", "gazelle", "spezial"]

  const relatedResources = [
    {
      title: "How To Clean Shoes",
      description: "Get expert shoe-buying advice and learn how to choose your sneakers the right way.",
      image: "/placeholder.png?height=200&width=300",
    },
    {
      title: "The adidas Samba Shoe Guide",
      description: "Discover classic adidas footwear through the fit and feel of the new and old Samba.",
      image: "/placeholder.png?height=200&width=300",
    },
    {
      title: "Are the Looks: How to Style a Tennis Skirt",
      description: "Get inspired by iconic fashion looks to target tennis skirt outfits with adidas.",
      image: "/placeholder.png?height=200&width=300",
    },
    {
      title: "How to Style a Soccer Jersey",
      description: "Get tips on how to style a soccer jersey to create a surprisingly versatile wardrobe staple.",
      image: "/placeholder.png?height=200&width=300",
    },
  ]

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
      {/* Hero Banner */}
      <HeroBanner />

      {/* Still Interested Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold">STILL INTERESTED?</h2>
          {/* <Button variant="link" className="text-sm font-bold">
            VIEW ALL
          </Button> */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stillInterestedProducts.map((product, index) => (
            <ProductCard key={`${product.product.id}-${index}`} product={product} showAddToBag={true} />
          ))}
        </div>
      </section>

      {/* Product Tabs Section */}
      <ProductTabs />

      {/* Promo Carousel */}
      <PromoCarousel slides={mockSlides} />

      {/* New Products Section */}
      <section className="container mx-auto px-4 py-12">
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
          {stillInterestedProducts.map((product, index) => (
            <ProductCard key={`${product.product.id}-${index}`} product={product} />
          ))}
        </div>
      </section>

      {/* Prime Section */}
      <section className="bg-black text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-8">
            <div className="text-6xl font-bold mb-4">prime</div>
            <div className="w-16 h-1 bg-white mx-auto mb-8"></div>
          </div>
          <h2 className="text-3xl font-bold mb-2">FAST, FREE DELIVERY</h2>
          <h3 className="text-3xl font-bold mb-8">WITH PRIME AT ADIDAS</h3>
          <Link href="/prime">
            <Button className="bg-white text-black hover:bg-gray-100 font-bold px-8 py-3 text-lg">SHOP NOW →</Button>
          </Link>
        </div>
      </section>

      {/* Promo Tiles */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {promoTiles.map((title, index) => (
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
                <Button variant="outline" size="sm" className="w-fit bg-white text-black hover:bg-gray-100 font-bold">
                  {title.cta} →
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Popular Categories */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-xl font-bold mb-8">Popular right now</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {popularCategories.map((category, index) => (
            <Button key={`${category}-${index}`} variant="outline" className="h-12 text-lg font-medium hover:bg-gray-50 rounded-none">
              {category}
            </Button>
          ))}
        </div>
      </section>

      {/* Related Resources */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-xl font-bold mb-8">RELATED RESOURCES</h2>
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
      </section>

      {/* Footer Categories */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {Object.entries(footerCategories).map(([category, items], index) => (
              <div key={`${category}-${index}`}>
                <h3 className="font-bold mb-4 text-sm">{category}</h3>
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
        </div>
      </section>

      {/* <Footer /> */}
    </div>
  )
}
