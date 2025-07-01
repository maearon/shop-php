"use client"
import { Nullable } from "@/types/common"
import Link from "next/link"

type MenuCategory = {
  title: string
  items: { name: string; href: string }[]
}

type MegaMenuProps = {
  activeMenu: Nullable<string>
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
        { name: "New Arrivals", href: "/men-new-arrivals" },
        { name: "Best Sellers", href: "/men-best-sellers" },
        { name: "Trending Now", href: "/men-trending-now" },
        { name: "Release Dates", href: "/men-release-dates" },
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
        { name: "Baseball", href: "/men-baseball" },
        { name: "Basketball", href: "/men-basketball" },
        { name: "Cricket", href: "/men-cricket" },
        { name: "Football", href: "/men-football" },
        { name: "Golf", href: "/men-golf" },
        { name: "Motorsport", href: "/men-motorsport" },
        { name: "Outdoor", href: "/men-outdoor" },
        { name: "Rugby", href: "/men-rugby" },
        { name: "Running", href: "/men-running" },
        { name: "Soccer", href: "/men-soccer-shoes" },
        { name: "T-Shirts & Tops", href: "/men-tops" },
        { name: "Skateboarding", href: "/men-skateboarding" },
        { name: "Tennis", href: "/men-tennis" },
        { name: "Workout", href: "/men-workout" },
        { name: "Volleyball", href: "/men-volleyball" },
        { name: "Weightlifting", href: "/men-weightlifting" },
        { name: "Yoga", href: "/men-yoga" },
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
        { name: "New Arrivals", href: "/women-new_arrivals" },
        { name: "Best Sellers", href: "/women-best_sellers" },
        { name: "Graphic Tees", href: "/women-graphic_tees" },
        { name: "The New Superstar", href: "/women-superstar" },
        { name: "Taekwondo & Tokyo", href: "/women-taekwondo_tokyo" },
        { name: "Liberty London Florals", href: "/women-liberty_london" },
      ],
    },
    {
      title: "SHOES",
      items: [
        { name: "Running", href: "/women-running" },
        { name: "Soccer", href: "/women-soccer" },
        { name: "Sneakers", href: "/women-sneakers" },
        { name: "Golf", href: "/women-golf" },
        { name: "Slides & Sandals", href: "/women-slides-sandals" },
        { name: "Platform Shoes", href: "/women-platform" },
        { name: "Workout & Gym", href: "/women-workout" },
        { name: "Shoes $100 & Under", href: "/women-under-100" },
        { name: "Basketball", href: "/women-basketball" },
      ],
    },
    {
      title: "CLOTHING",
      items: [
        { name: "Pants", href: "/women-pants" },
        { name: "Dresses & Skirts", href: "/women-dresses-skirts" },
        { name: "Tights & Leggings", href: "/women-tights-leggings" },
        { name: "Plus Size", href: "/women-plus-size" },
        { name: "Tracksuits", href: "/women-tracksuits" },
        { name: "T-Shirts & Tops", href: "/women-t-shirts-tops" },
        { name: "Sports Bras", href: "/women-sports-bras" },
        { name: "Shorts", href: "/women-shorts" },
        { name: "Hoodies & Sweatshirts", href: "/women-hoodies-sweatshirts" },
        { name: "Jackets & Coats", href: "/women-jackets-coats" },
      ],
    },
    {
      title: "ACCESSORIES",
      items: [
        { name: "Bags & Backpacks", href: "/women-bags-backpacks" },
        { name: "Balls", href: "/women-balls" },
        { name: "Gloves", href: "/women-gloves" },
        { name: "Hats", href: "/women-hats" },
        { name: "Socks", href: "/women-socks" },
        { name: "Water Bottles", href: "/women-water-bottles" },
      ],
    },
    {
      title: "SHOP BY SPORT",
      items: [
        { name: "Basketball", href: "/women-basketball" },
        { name: "Cycling", href: "/women-cycling" },
        { name: "Golf", href: "/women-golf" },
        { name: "Hiking", href: "/women-hiking" },
        { name: "Motorsport", href: "/women-motorsport" },
        { name: "Outdoor", href: "/women-outdoor" },
        { name: "Running", href: "/women-running" },
        { name: "Soccer", href: "/women-soccer" },
        { name: "Softball", href: "/women-softball" },
        { name: "Swim", href: "/women-swim" },
        { name: "Tennis", href: "/women-tennis" },
        { name: "Volleyball", href: "/women-volleyball" },
        { name: "Workout & Gym", href: "/women-workout" },
        { name: "Yoga", href: "/women-yoga" },
      ],
    },
    {
      title: "SHOP BY COLLECTION",
      items: [
        { name: "adicolor", href: "/women-adicolor" },
        { name: "Premium Collaborations", href: "/women-premium-collaborations" },
        { name: "adidas by Stella McCartney", href: "/women-stella-mccartney" },
        { name: "Gazelle", href: "/women-gazelle" },
        { name: "Originals", href: "/women-originals" },
        { name: "Samba", href: "/women-samba" },
        { name: "Superstar", href: "/women-superstar" },
        { name: "Sportswear", href: "/women-sportswear" },
        { name: "Supernova", href: "/women-supernova" },
        { name: "TERREX", href: "/women-terrex" },
        { name: "Ultraboost", href: "/women-ultraboost" },
        { name: "Y-3", href: "/women-y-3" },
        { name: "ZNE", href: "/women-zne" },
      ],
    },
  ]

  // Dữ liệu cho menu KIDS
  const kidsMenuData: MenuCategory[] = [
    {
      title: "NEW & TRENDING",
      items: [
        { name: "New Arrivals", href: "/kids-new_arrivals" },
        { name: "Best Sellers", href: "/kids-best_sellers" },
        { name: "Disney Collection", href: "/kids-disney" },
        { name: "Shoes Under $80", href: "/kids-shoes_under_80" },
        { name: "Graphic Tees", href: "/kids-graphic_tees" },
        { name: "The New Superstar", href: "/kids-superstar" },
        { name: "Liberty London Florals", href: "/kids-liberty_london" },
      ],
    },
    {
      title: "BOYS SHOES",
      items: [
        { name: "Soccer", href: "/boys-soccer-shoes" },
        { name: "Slip-On & Straps", href: "/boys-hook_loop%7Cslip_on-shoes" },
        { name: "Sneakers", href: "/boys-athletic_sneakers" },
        { name: "Basketball", href: "/boys-basketball-shoess" },
        { name: "Slides & Sandals", href: "/boys-slides" },
      ],
    },
    {
      title: "GIRLS SHOES",
      items: [
        { name: "Soccer", href: "/girls-soccer-shoes" },
        { name: "Slip-On & Straps", href: "/girls-hook_loop%7Cslip_on-shoes" },
        { name: "Sneakers", href: "/girls-athletic_sneakers" },
        { name: "Slides & Sandals", href: "/girls-slides" },
      ],
    },
    {
      title: "BABIES & TODDLERS",
      items: [
        { name: "Baby Girl", href: "/girls-infant_toddler" },
        { name: "Baby Boy", href: "/boys-infant_toddler" },
        { name: "All Shoes (1K - 10K)", href: "/kids-infant_toddler-shoes" },
        { name: "All Clothing (0-3T)", href: "/kids-infant_toddler-clothing" },
      ],
    },
    {
      title: "SHOP BY AGE",
      items: [
        { name: "Youth & Teens (8-16 years)", href: "/youth" },
        { name: "Children (4-8 years)", href: "/children" },
        { name: "Babies & Toddlers (0-4 years)", href: "/infant_toddler" },
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
                  <img src="/assets/nav/originals_fw25_superstar_topnav_launch_d_331db9ccb5.jpg?height=100&width=150" alt="Sale promotion" className="w-full h-auto" />
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
