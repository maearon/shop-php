import ProductTabs from "@/components/product-tabs"
import PromoCarousel from "@/components/promo-carousel"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ProductCard from "@/components/product-card"

export default function HomePage() {
  const stillInterestedProducts = [
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
      {/* <Header /> */}

      {/* Hero Section */}
      <section className="relative h-[500px] bg-gray-100 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/placeholder.png?height=500&width=1200')",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-end pb-12">
          <div className="text-white">
            <h1 className="text-4xl font-bold mb-2">ADIZERO EVO SL</h1>
            <p className="text-lg mb-4">Fast feels. For the speed of the city.</p>
            <div className="flex space-x-4">
              <Link href="/men">
                <Button className="bg-white text-black hover:bg-gray-100 font-bold px-6 py-3">SHOP MEN</Button>
              </Link>
              <Link href="/women">
                <Button className="bg-white text-black hover:bg-gray-100 font-bold px-6 py-3">SHOP WOMEN</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Product Tabs Section */}
      <ProductTabs />

      {/* Promo Carousel */}
      <PromoCarousel />

      {/* Still Interested Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold">STILL INTERESTED?</h2>
          <Button variant="link" className="text-sm font-bold">
            VIEW ALL
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stillInterestedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

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
          {newProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
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
          {promoTiles.map((tile, index) => (
            <Card key={index} className="relative overflow-hidden h-80 border-0 rounded-none">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url('${tile.image}')`,
                }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
              </div>
              <CardContent className="relative h-full flex flex-col justify-end p-6 text-white">
                <h3 className="font-bold text-lg mb-1">{tile.title}</h3>
                {tile.subtitle && <p className="text-sm mb-2">{tile.subtitle}</p>}
                <p className="text-sm mb-4">{tile.description}</p>
                <Button variant="outline" size="sm" className="w-fit bg-white text-black hover:bg-gray-100 font-bold">
                  {tile.cta} →
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
            <Button key={index} variant="outline" className="h-12 text-lg font-medium hover:bg-gray-50 rounded-none">
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
            <Card key={index} className="border-none shadow-none">
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
            {Object.entries(footerCategories).map(([category, items]) => (
              <div key={category}>
                <h3 className="font-bold mb-4 text-sm">{category}</h3>
                <ul className="space-y-2">
                  {items.map((item, index) => (
                    <li key={index}>
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
