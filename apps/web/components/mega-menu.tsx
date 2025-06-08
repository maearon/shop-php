"use client"
import Link from "next/link"

type MenuCategory = {
  title: string
  items: { name: string; href: string }[]
}

type MegaMenuProps = {
  activeMenu: string | null
  onClose: () => void
}

export default function MegaMenu({ activeMenu, onClose }: MegaMenuProps) {
  // Nếu không có menu nào được active, không hiển thị gì cả
  if (!activeMenu) return null

  // Dữ liệu cho menu MEN
  const menMenuData: MenuCategory[] = [
    {
      title: "WHAT'S NEW?",
      items: [
        { name: "New Arrivals", href: "/men/new-arrivals" },
        { name: "Best Sellers", href: "/men/best-sellers" },
        { name: "Trending Now", href: "/men/trending-now" },
        { name: "Release Dates", href: "/men/release-dates" },
        { name: "Blog", href: "/blog" },
      ],
    },
    {
      title: "COLLABORATIONS",
      items: [
        { name: "adidas by Stella McCartney", href: "/collaborations/stella-mccartney" },
        { name: "Bad Bunny", href: "/collaborations/bad-bunny" },
        { name: "Bape", href: "/collaborations/bape" },
        { name: "Disney", href: "/collaborations/disney" },
        { name: "Edison Chen", href: "/collaborations/edison-chen" },
        { name: "Fear of God Athletics", href: "/collaborations/fear-of-god" },
        { name: "Pharrell", href: "/collaborations/pharrell" },
        { name: "Prada", href: "/collaborations/prada" },
        { name: "Sporty & Rich", href: "/collaborations/sporty-rich" },
        { name: "Wales Bonner", href: "/collaborations/wales-bonner" },
        { name: "Y-3", href: "/collaborations/y-3" },
      ],
    },
    {
      title: "OUR WORLD",
      items: [
        { name: "Impact", href: "/our-world/impact" },
        { name: "People", href: "/our-world/people" },
        { name: "Planet", href: "/our-world/planet" },
        { name: "Community", href: "/our-world/community" },
        { name: "adiClub", href: "/adiclub" },
      ],
    },
    {
      title: "SPORTS",
      items: [
        { name: "Baseball", href: "/men/sports/baseball" },
        { name: "Basketball", href: "/men/sports/basketball" },
        { name: "Cricket", href: "/men/sports/cricket" },
        { name: "Football", href: "/men/sports/football" },
        { name: "Golf", href: "/men/sports/golf" },
        { name: "Motorsport", href: "/men/sports/motorsport" },
        { name: "Outdoor", href: "/men/sports/outdoor" },
        { name: "Rugby", href: "/men/sports/rugby" },
        { name: "Running", href: "/men/sports/running" },
        { name: "Soccer", href: "/men-soccer-shoes" },
        { name: "T-Shirts & Tops", href: "/men-tops" },
        { name: "Skateboarding", href: "/men/sports/skateboarding" },
        { name: "Tennis", href: "/men/sports/tennis" },
        { name: "Workout", href: "/men/sports/workout" },
        { name: "Volleyball", href: "/men/sports/volleyball" },
        { name: "Weightlifting", href: "/men/sports/weightlifting" },
        { name: "Yoga", href: "/men/sports/yoga" },
      ],
    },
    {
      title: "ORIGINALS",
      items: [
        { name: "Forum", href: "/originals/forum" },
        { name: "Gazelle", href: "/originals/gazelle" },
        { name: "adicolor", href: "/originals/adicolor" },
        { name: "Originals Clothing", href: "/originals/clothing" },
        { name: "Samba", href: "/originals/samba" },
        { name: "Stan Smith", href: "/originals/stan-smith" },
        { name: "Superstar", href: "/originals/superstar" },
      ],
    },
    {
      title: "COLLECTIONS",
      items: [
        { name: "4D", href: "/collections/4d" },
        { name: "adizero", href: "/collections/adizero" },
        { name: "Copa", href: "/collections/copa" },
        { name: "F50", href: "/collections/f50" },
        { name: "Five Ten", href: "/collections/five-ten" },
        { name: "Supernova", href: "/collections/supernova" },
        { name: "Terrex", href: "/collections/terrex" },
        { name: "Tiro", href: "/collections/tiro" },
        { name: "Ultraboost", href: "/collections/ultraboost" },
      ],
    },
  ]

  // Dữ liệu cho menu WOMEN
  const womenMenuData: MenuCategory[] = [
    {
      title: "NEW & TRENDING",
      items: [
        { name: "New Arrivals", href: "/women/new-arrivals" },
        { name: "Best Sellers", href: "/women/best-sellers" },
        { name: "Graphic Tees", href: "/women/graphic-tees" },
        { name: "The New Superstar", href: "/women/superstar" },
        { name: "Taekwondo & Tokyo", href: "/women/taekwondo-tokyo" },
        { name: "Liberty London Florals", href: "/women/liberty-london" },
      ],
    },
    {
      title: "SHOES",
      items: [
        { name: "Running", href: "/women/shoes/running" },
        { name: "Soccer", href: "/women/shoes/soccer" },
        { name: "Sneakers", href: "/women/shoes/sneakers" },
        { name: "Golf", href: "/women/shoes/golf" },
        { name: "Slides & Sandals", href: "/women/shoes/slides-sandals" },
        { name: "Platform Shoes", href: "/women/shoes/platform" },
        { name: "Workout & Gym", href: "/women/shoes/workout" },
        { name: "Shoes $100 & Under", href: "/women/shoes/under-100" },
        { name: "Basketball", href: "/women/shoes/basketball" },
      ],
    },
    {
      title: "CLOTHING",
      items: [
        { name: "Pants", href: "/women/clothing/pants" },
        { name: "Dresses & Skirts", href: "/women/clothing/dresses-skirts" },
        { name: "Tights & Leggings", href: "/women/clothing/tights-leggings" },
        { name: "Plus Size", href: "/women/clothing/plus-size" },
        { name: "Tracksuits", href: "/women/clothing/tracksuits" },
        { name: "T-Shirts & Tops", href: "/women/clothing/t-shirts-tops" },
        { name: "Sports Bras", href: "/women/clothing/sports-bras" },
        { name: "Shorts", href: "/women/clothing/shorts" },
        { name: "Hoodies & Sweatshirts", href: "/women/clothing/hoodies-sweatshirts" },
        { name: "Jackets & Coats", href: "/women/clothing/jackets-coats" },
      ],
    },
    {
      title: "ACCESSORIES",
      items: [
        { name: "Bags & Backpacks", href: "/women/accessories/bags-backpacks" },
        { name: "Balls", href: "/women/accessories/balls" },
        { name: "Gloves", href: "/women/accessories/gloves" },
        { name: "Hats", href: "/women/accessories/hats" },
        { name: "Socks", href: "/women/accessories/socks" },
        { name: "Water Bottles", href: "/women/accessories/water-bottles" },
      ],
    },
    {
      title: "SHOP BY SPORT",
      items: [
        { name: "Basketball", href: "/women/sport/basketball" },
        { name: "Cycling", href: "/women/sport/cycling" },
        { name: "Golf", href: "/women/sport/golf" },
        { name: "Hiking", href: "/women/sport/hiking" },
        { name: "Motorsport", href: "/women/sport/motorsport" },
        { name: "Outdoor", href: "/women/sport/outdoor" },
        { name: "Running", href: "/women/sport/running" },
        { name: "Soccer", href: "/women/sport/soccer" },
        { name: "Softball", href: "/women/sport/softball" },
        { name: "Swim", href: "/women/sport/swim" },
        { name: "Tennis", href: "/women/sport/tennis" },
        { name: "Volleyball", href: "/women/sport/volleyball" },
        { name: "Workout & Gym", href: "/women/sport/workout" },
        { name: "Yoga", href: "/women/sport/yoga" },
      ],
    },
    {
      title: "SHOP BY COLLECTION",
      items: [
        { name: "adicolor", href: "/women/collection/adicolor" },
        { name: "Premium Collaborations", href: "/women/collection/premium-collaborations" },
        { name: "adidas by Stella McCartney", href: "/women/collection/stella-mccartney" },
        { name: "Gazelle", href: "/women/collection/gazelle" },
        { name: "Originals", href: "/women/collection/originals" },
        { name: "Samba", href: "/women/collection/samba" },
        { name: "Superstar", href: "/women/collection/superstar" },
        { name: "Sportswear", href: "/women/collection/sportswear" },
        { name: "Supernova", href: "/women/collection/supernova" },
        { name: "TERREX", href: "/women/collection/terrex" },
        { name: "Ultraboost", href: "/women/collection/ultraboost" },
        { name: "Y-3", href: "/women/collection/y-3" },
        { name: "ZNE", href: "/women/collection/zne" },
      ],
    },
  ]

  // Dữ liệu cho menu KIDS
  const kidsMenuData: MenuCategory[] = [
    {
      title: "NEW & TRENDING",
      items: [
        { name: "New Arrivals", href: "/kids/new-arrivals" },
        { name: "Best Sellers", href: "/kids/best-sellers" },
        { name: "Disney Collection", href: "/kids/disney" },
        { name: "Shoes Under $80", href: "/kids/shoes-under-80" },
        { name: "Graphic Tees", href: "/kids/graphic-tees" },
        { name: "The New Superstar", href: "/kids/superstar" },
        { name: "Liberty London Florals", href: "/kids/liberty-london" },
      ],
    },
    {
      title: "BOYS SHOES",
      items: [
        { name: "Soccer", href: "/kids/boys/shoes/soccer" },
        { name: "Slip-On & Straps", href: "/kids/boys/shoes/slip-on" },
        { name: "Sneakers", href: "/kids/boys/shoes/sneakers" },
        { name: "Basketball", href: "/kids/boys/shoes/basketball" },
        { name: "Slides & Sandals", href: "/kids/boys/shoes/slides-sandals" },
      ],
    },
    {
      title: "GIRLS SHOES",
      items: [
        { name: "Soccer", href: "/kids/girls/shoes/soccer" },
        { name: "Slip-On & Straps", href: "/kids/girls/shoes/slip-on" },
        { name: "Sneakers", href: "/kids/girls/shoes/sneakers" },
        { name: "Slides & Sandals", href: "/kids/girls/shoes/slides-sandals" },
      ],
    },
    {
      title: "BABIES & TODDLERS",
      items: [
        { name: "Baby Girl", href: "/kids/baby/girl" },
        { name: "Baby Boy", href: "/kids/baby/boy" },
        { name: "All Shoes (1K - 10K)", href: "/kids/baby/shoes" },
        { name: "All Clothing (0-3T)", href: "/kids/baby/clothing" },
      ],
    },
    {
      title: "SHOP BY AGE",
      items: [
        { name: "Youth & Teens (8-16 years)", href: "/kids/youth-teens" },
        { name: "Children (4-8 years)", href: "/kids/children" },
        { name: "Babies & Toddlers (0-4 years)", href: "/kids/babies-toddlers" },
      ],
    },
    {
      title: "BOYS CLOTHING",
      items: [
        { name: "Pants", href: "/kids/boys/clothing/pants" },
        { name: "Shorts", href: "/kids/boys/clothing/shorts" },
        { name: "Tracksuits", href: "/kids/boys/clothing/tracksuits" },
        { name: "T-Shirts & Tops", href: "/kids/boys/clothing/t-shirts-tops" },
        { name: "Jerseys", href: "/kids/boys/clothing/jerseys" },
        { name: "Hoodies & Sweatshirts", href: "/kids/boys/clothing/hoodies-sweatshirts" },
        { name: "Matching Sets", href: "/kids/boys/clothing/matching-sets" },
        { name: "Jackets & Coats", href: "/kids/boys/clothing/jackets-coats" },
      ],
    },
    {
      title: "GIRLS CLOTHING",
      items: [
        { name: "Tracksuits", href: "/kids/girls/clothing/tracksuits" },
        { name: "Pants", href: "/kids/girls/clothing/pants" },
        { name: "Hoodies & Sweatshirts", href: "/kids/girls/clothing/hoodies-sweatshirts" },
        { name: "T-Shirts & Tops", href: "/kids/girls/clothing/t-shirts-tops" },
        { name: "Shorts", href: "/kids/girls/clothing/shorts" },
        { name: "Tights & Leggings", href: "/kids/girls/clothing/tights-leggings" },
        { name: "Jackets & Coats", href: "/kids/girls/clothing/jackets-coats" },
        { name: "Matching Sets", href: "/kids/girls/clothing/matching-sets" },
      ],
    },
    {
      title: "ACCESSORIES",
      items: [
        { name: "Backpacks & Bags", href: "/kids/accessories/backpacks-bags" },
        { name: "Hats", href: "/kids/accessories/hats" },
        { name: "Socks", href: "/kids/accessories/socks" },
      ],
    },
    {
      title: "SHOP BY SPORT",
      items: [
        { name: "Baseball", href: "/kids/sport/baseball" },
        { name: "Basketball", href: "/kids/sport/basketball" },
        { name: "Football", href: "/kids/sport/football" },
        { name: "Golf", href: "/kids/sport/golf" },
        { name: "Motorsport", href: "/kids/sport/motorsport" },
        { name: "Outdoor", href: "/kids/sport/outdoor" },
        { name: "Running", href: "/kids/sport/running" },
        { name: "Soccer", href: "/kids/sport/soccer" },
        { name: "Volleyball", href: "/kids/sport/volleyball" },
      ],
    },
  ]

  // Dữ liệu cho menu SALE
  const saleMenuData: MenuCategory[] = [
    {
      title: "FEATURED SALE",
      items: [{ name: "Final Sale", href: "/sale/final-sale" }],
    },
    {
      title: "MEN",
      items: [
        { name: "Shoes", href: "/sale/men/shoes" },
        { name: "Clothing", href: "/sale/men/clothing" },
        { name: "Accessories", href: "/sale/men/accessories" },
      ],
    },
    {
      title: "WOMEN",
      items: [
        { name: "Shoes", href: "/sale/women/shoes" },
        { name: "Clothing", href: "/sale/women/clothing" },
        { name: "Accessories", href: "/sale/women/accessories" },
      ],
    },
    {
      title: "KIDS",
      items: [
        { name: "Boys Sale", href: "/sale/kids/boys" },
        { name: "Girls Sale", href: "/sale/kids/girls" },
      ],
    },
  ]

  // Dữ liệu cho menu NEW & TRENDING
  const trendingMenuData: MenuCategory[] = [
    {
      title: "NEW & TRENDING",
      items: [
        { name: "New Arrivals", href: "/new-trending/new-arrivals" },
        { name: "Best Sellers", href: "/new-trending/best-sellers" },
        { name: "Trending Now", href: "/new-trending/trending-now" },
        { name: "Release Dates", href: "/new-trending/release-dates" },
      ],
    },
    {
      title: "COLLECTIONS",
      items: [
        { name: "Samba", href: "/collections/samba" },
        { name: "Gazelle", href: "/collections/gazelle" },
        { name: "Ultraboost", href: "/collections/ultraboost" },
        { name: "Superstar", href: "/collections/superstar" },
        { name: "Stan Smith", href: "/collections/stan-smith" },
      ],
    },
  ]

  // Chọn dữ liệu menu dựa trên activeMenu
  let menuData: MenuCategory[] = []
  let footerLinks: { name: string; href: string }[] = []

  switch (activeMenu) {
    case "MEN":
      menuData = menMenuData
      footerLinks = [
        { name: "Sale", href: "/sale/men" },
        { name: "All Men's Shoes", href: "/men/shoes" },
        { name: "All Men's Clothing", href: "/men/clothing" },
        { name: "All Men's Accessories", href: "/men/accessories" },
        { name: "All Men's Sport", href: "/men/sport" },
        { name: "All Men's", href: "/men" },
      ]
      break
    case "WOMEN":
      menuData = womenMenuData
      footerLinks = [
        { name: "Sale", href: "/sale/women" },
        { name: "All Women's Shoes", href: "/women/shoes" },
        { name: "All Women's Clothing", href: "/women/clothing" },
        { name: "All Women's Accessories", href: "/women/accessories" },
        { name: "All Women's Sport", href: "/women/sport" },
        { name: "All Women's", href: "/women" },
      ]
      break
    case "KIDS":
      menuData = kidsMenuData
      footerLinks = [
        { name: "Sale", href: "/sale/kids" },
        { name: "All Kids Shoes", href: "/kids/shoes" },
        { name: "All Kids Clothing", href: "/kids/clothing" },
        { name: "All Kids Accessories", href: "/kids/accessories" },
        { name: "All Kids Sports", href: "/kids/sports" },
        { name: "All Kids", href: "/kids" },
      ]
      break
    case "SALE":
      menuData = saleMenuData
      footerLinks = [
        { name: "Sale", href: "/sale" },
        { name: "All Men's Sale", href: "/sale/men" },
        { name: "All Women's Sale", href: "/sale/women" },
        { name: "All Kids Sale", href: "/sale/kids" },
      ]
      break
    case "NEW & TRENDING":
      menuData = trendingMenuData
      footerLinks = [{ name: "All New & Trending", href: "/new-trending" }]
      break
    default:
      return null
  }

  // Hiển thị menu dựa trên dữ liệu đã chọn
  return (
    <div className="absolute left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50" onMouseLeave={onClose}>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-6 gap-8">
          {menuData.map((category, index) => (
            <div key={index} className="space-y-4">
              <h3 className="font-bold text-sm">{category.title}</h3>
              <ul className="space-y-2">
                {category.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <Link href={item.href} className="text-sm hover:underline">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
              {activeMenu === "SALE" && category.title === "FEATURED SALE" && (
                <div className="mt-4">
                  <img src="/placeholder.svg?height=100&width=150" alt="Sale promotion" className="w-full h-auto" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer links */}
        <div className="flex justify-start space-x-8 mt-12 border-t pt-4">
          {footerLinks.map((link, index) => (
            <Link key={index} href={link.href} className="text-sm font-medium hover:underline">
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
