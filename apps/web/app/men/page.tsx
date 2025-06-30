import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ProductCard from "@/components/product-card"
import MenFooter from "@/components/men-footer"

export default function MenPage() {
  const categoryTiles = [
    { title: "SNEAKERS", image: "/placeholder.png?height=200&width=300", href: "/men-shoes" },
    { title: "TOPS", image: "/placeholder.png?height=200&width=300", href: "/men-tops" },
    { title: "HOODIES & SWEATSHIRTS", image: "/placeholder.png?height=200&width=300", href: "/men-hoodies" },
    { title: "PANTS", image: "/placeholder.png?height=200&width=300", href: "/men-pants" },
  ]

  const promoTiles = [
    {
      title: "SAMBA",
      description: "Retro court. Timeless as ever.",
      image: "/placeholder.png?height=300&width=280",
      cta: "SHOP NOW",
    },
    {
      title: "DROPSET 3",
      description: "Rooted in Strength.",
      image: "/placeholder.png?height=300&width=280",
      cta: "SHOP NOW",
    },
    {
      title: "CRAFT LITE SHORTS",
      description: "Engineered to elevate your game.",
      image: "/placeholder.png?height=300&width=280",
      cta: "SHOP NOW",
    },
    {
      title: "UNDENIABLE DUO",
      description: "Bring 3-Stripes style that shows your #1 supportive team-mates for seasons to you.",
      image: "/placeholder.png?height=300&width=280",
      cta: "SHOP NOW",
    },
  ]

  const topPicks = [
    { id: 1, name: "Samba OG Shoes", price: "$100", image: "/placeholder.png?height=300&width=250" },
    { id: 2, name: "Ultraboost 1.0 Shoes", price: "$190", image: "/placeholder.png?height=300&width=250" },
    { id: 3, name: "Ultraboost 22 Shoes", price: "$190", image: "/placeholder.png?height=300&width=250" },
    { id: 4, name: "Gazelle Indoor Shoes", price: "$100", image: "/placeholder.png?height=300&width=250" },
  ]

  const recentlyViewed = [
    {
      id: 1,
      name: "Real Madrid 23/24 Home Authentic Jersey",
      price: "$130",
      image: "/placeholder.png?height=300&width=250",
    },
    { id: 2, name: "Essentials Hoodie", price: "$65", image: "/placeholder.png?height=300&width=250" },
    { id: 3, name: "Adizero EVO SL Shoes", price: "$130", image: "/placeholder.png?height=300&width=250" },
    { id: 4, name: "Adizero F50 FG Shoes", price: "$280", image: "/placeholder.png?height=300&width=250" },
  ]

  const menCategories = {
    "MEN'S CLOTHINGgggg": ["T-shirts", "Hoodies", "Sweatshirts", "Jackets", "Pants & Joggers", "Shorts"],
    "MEN'S SHOES": ["Shoes", "High Top Sneakers", "Low Top Sneakers", "Slip On Sneakers", "All White Sneakers"],
    "MEN'S ACCESSORIES": ["Men's Accessories", "Men's Socks", "Men's Bags", "Men's Hats", "Men's Headphones"],
    "MEN'S COLLECTIONS": [
      "Men's Running",
      "Men's Soccer",
      "Men's Loungewear",
      "Men's Training & Gym",
      "Men's Originals",
    ],
  }

  return (
    <div className="min-h-screen bg-white">
      {/* <Header /> */}

      {/* Hero Section - Three Panel Layout */}
      <section className="relative h-[500px] bg-gray-100 overflow-hidden">
        <div className="grid grid-cols-3 h-full">
          {/* Left panel */}
          <div
            className="relative bg-cover bg-center"
            style={{ backgroundImage: "url('/placeholder.png?height=500&width=400')" }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-10"></div>
            <div className="absolute bottom-8 left-8 text-white">
              <h2 className="text-2xl font-bold mb-2">ADIZERO EVO SL</h2>
              <p className="text-sm mb-4">Fast feels. For the speed of the city.</p>
              <Button variant="outline" className="bg-white text-black hover:bg-gray-100 font-bold">
                SHOP NOW →
              </Button>
            </div>
          </div>

          {/* Center panel */}
          <div
            className="relative bg-cover bg-center"
            style={{ backgroundImage: "url('/placeholder.png?height=500&width=400')" }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-10"></div>
          </div>

          {/* Right panel */}
          <div
            className="relative bg-cover bg-center"
            style={{ backgroundImage: "url('/placeholder.png?height=500&width=400')" }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-10"></div>
          </div>
        </div>
      </section>

      {/* Category Tiles */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-4 gap-4">
          {categoryTiles.map((category, index) => (
            <Card
              key={index}
              className="relative overflow-hidden h-32 cursor-pointer hover:shadow-lg transition-shadow border-0 rounded-none"
            >
              <a href={category.href}>
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${category.image}')` }}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                </div>
                <CardContent className="relative h-full flex items-end p-4">
                  <h3 className="text-white font-bold text-sm">{category.title}</h3>
                </CardContent>
              </a>
            </Card>
          ))}
        </div>
      </section>

      {/* Promo Tiles */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-4 gap-4">
          {promoTiles.map((tile, index) => (
            <Card key={index} className="relative overflow-hidden h-80 border-0 rounded-none">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${tile.image}')` }}>
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
              </div>
              <CardContent className="relative h-full flex flex-col justify-end p-6 text-white">
                <h3 className="font-bold text-lg mb-2">{tile.title}</h3>
                <p className="text-sm mb-4 leading-tight">{tile.description}</p>
                <Button variant="outline" size="sm" className="w-fit bg-white text-black hover:bg-gray-100 font-bold">
                  {tile.cta} →
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Top Picks */}
      <section className="container mx-auto px-2 py-12">
        <h2 className="text-xl font-bold mb-8">TOP PICKS FOR YOU</h2>
        <div className="grid grid-cols-4 gap-6">
          {topPicks.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Men's Description */}
      <section className="container mx-auto px-2 py-12 text-center">
        <h2 className="text-2xl font-bold mb-6">MEN'S SNEAKERS AND WORKOUT CLOTHES</h2>
        <div className="max-w-4xl mx-auto text-gray-700 text-sm leading-relaxed space-y-4">
          <p>
            Ambitious, effortless and creative. Casual fits, street-proud and perform your best in men's shoes and
            apparel that support your passion and define your style. Whether you're training for a marathon, playing
            pickup basketball or just hanging out with friends, adidas men's clothing and shoes are designed to keep you
            comfortable, so you feel confident and ready to take on whatever comes your way.
          </p>
          <p>
            adidas is here, whether you need team, with men's workout clothes and sneakers that are built to last and
            designed to perform. From our adidas Boost technology that returns energy with every step, to our activewear
            that fits and feels as great as it looks. Experience the adidas difference.
          </p>
        </div>
      </section>

      {/* Recently Viewed */}
      {/* <section className="container mx-auto px-2 py-12">
        <h2 className="text-xl font-bold mb-8">RECENTLY VIEWED ITEMS</h2>
        <div className="grid grid-cols-4 gap-6">
          {recentlyViewed.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section> */}

      {/* Men's Categories Footer */}
      {/* <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-4 gap-8">
            {Object.entries(menCategories).map(([category, items]) => (
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
      </section> */}

      {/* <Footer /> */}
      <MenFooter />
    </div>
  )
}
