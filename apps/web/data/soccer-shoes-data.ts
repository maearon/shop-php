export interface SoccerShoe {
  id: number
  name: string
  price: number
  originalPrice?: number
  collection: string
  badge?: string
  modelNumber: string
  images: string[]
  variants: {
    id: number
    colorName: string
    image: string
    thumbnail: string
  }[]
  sizes: string[]
  reviews: {
    rating: number
    count: number
  }
  description: string
  details: {
    surface: string
    level: string
    fit: string
    material: string
  }
}

export const soccerShoesData: SoccerShoe[] = [
  {
    id: 1,
    name: "F50 Messi Elite Firm Ground Cleats",
    price: 270,
    collection: "Soccer",
    badge: "Best seller",
    modelNumber: "JP5593",
    images: [
      "/images/JP5593/F50_Messi_Elite_Firm_Ground_Cleats_White_JP5593_HM1.jpg?height=600&width=600",
      "/images/JP5593/F50_Messi_Elite_Firm_Ground_Cleats_White_JP5593_HM3_hover.jpg?height=600&width=600",
      "/images/JP5593/F50_Messi_Elite_Firm_Ground_Cleats_White_JP5593_HM4.jpg?height=600&width=600",
      "/images/JP5593/F50_Messi_Elite_Firm_Ground_Cleats_White_JP5593_HM5.jpg?height=600&width=600",
      "/images/JP5593/F50_Messi_Elite_Firm_Ground_Cleats_White_JP5593_HM6.jpg?height=600&width=600",
      "/images/JP5593/F50_Messi_Elite_Firm_Ground_Cleats_White_JP5593_HM7.jpg?height=600&width=600",
      "/images/JP5593/F50_Messi_Elite_Firm_Ground_Cleats_White_JP5593_HM8.jpg?height=600&width=600",
      "/images/JP5593/F50_Messi_Elite_Firm_Ground_Cleats_White_JP5593_HM9.jpg?height=600&width=600",
      "/images/JP5593/F50_Messi_Elite_Firm_Ground_Cleats_White_JP5593_HM10.jpg?height=600&width=600",
      "/images/JP5593/F50_Messi_Elite_Firm_Ground_Cleats_White_JP5593_HM11.jpg?height=600&width=600",
    ],
    variants: [
      {
        id: 1,
        colorName: "Cloud White / Core Black / Lucid Lemon",
        image: "/placeholder.png?height=400&width=400",
        thumbnail: "/placeholder.png?height=60&width=60",
      },
      {
        id: 2,
        colorName: "Core Black / Cloud White / Solar Red",
        image: "/placeholder.png?height=400&width=400",
        thumbnail: "/placeholder.png?height=60&width=60",
      },
      {
        id: 3,
        colorName: "Core Black / Cloud White / Solar Red",
        image: "/placeholder.png?height=400&width=400",
        thumbnail: "/placeholder.png?height=60&width=60",
      },
      {
        id: 4,
        colorName: "Core Black / Cloud White / Solar Red",
        image: "/placeholder.png?height=400&width=400",
        thumbnail: "/placeholder.png?height=60&width=60",
      },
      {
        id: 5,
        colorName: "Core Black / Cloud White / Solar Red",
        image: "/placeholder.png?height=400&width=400",
        thumbnail: "/placeholder.png?height=60&width=60",
      },
      {
        id: 6,
        colorName: "Core Black / Cloud White / Solar Red",
        image: "/placeholder.png?height=400&width=400",
        thumbnail: "/placeholder.png?height=60&width=60",
      },
      {
        id: 7,
        colorName: "Core Black / Cloud White / Solar Red",
        image: "/placeholder.png?height=400&width=400",
        thumbnail: "/placeholder.png?height=60&width=60",
      },
      {
        id: 8,
        colorName: "Core Black / Cloud White / Solar Red",
        image: "/placeholder.png?height=400&width=400",
        thumbnail: "/placeholder.png?height=60&width=60",
      },
      {
        id: 9,
        colorName: "Core Black / Cloud White / Solar Red",
        image: "/placeholder.png?height=400&width=400",
        thumbnail: "/placeholder.png?height=60&width=60",
      },
      {
        id: 10,
        colorName: "Core Black / Cloud White / Solar Red",
        image: "/placeholder.png?height=400&width=400",
        thumbnail: "/placeholder.png?height=60&width=60",
      },
    ],
    sizes: ["6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"],
    reviews: {
      rating: 4.5,
      count: 127,
    },
    description:
      "Engineered for speed, these F50 Laceless Boots feature a lightweight Fiberskin upper and Sprintframe outsole for explosive acceleration. The laceless construction provides a clean ball contact surface, while Messi signature details celebrate the GOAT.",
    details: {
      surface: "Firm Ground",
      level: "Elite",
      fit: "Regular",
      material: "Synthetic",
    },
  },
  {
    id: 2,
    name: "F50 Messi Pro Firm Ground Cleats",
    price: 160,
    collection: "Soccer",
    badge: "New",
    modelNumber: "JP5594",
    images: [
      "/placeholder.png?height=600&width=600",
      "/placeholder.png?height=600&width=600",
      "/placeholder.png?height=600&width=600",
      "/placeholder.png?height=600&width=600",
    ],
    variants: [
      {
        id: 1,
        colorName: "Cloud White / Core Black / Lucid Lemon",
        image: "/placeholder.png?height=400&width=400",
        thumbnail: "/placeholder.png?height=60&width=60",
      },
    ],
    sizes: ["6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"],
    reviews: {
      rating: 4.3,
      count: 89,
    },
    description: "Pro-level F50 cleats with Messi signature details for firm ground surfaces.",
    details: {
      surface: "Firm Ground",
      level: "Pro",
      fit: "Regular",
      material: "Synthetic",
    },
  },
  {
    id: 3,
    name: "F50 Messi League Firm/Multi-Ground Cleats",
    price: 95,
    collection: "Soccer",
    badge: "New",
    modelNumber: "JP5595",
    images: [
      "/placeholder.png?height=600&width=600",
      "/placeholder.png?height=600&width=600",
      "/placeholder.png?height=600&width=600",
      "/placeholder.png?height=600&width=600",
    ],
    variants: [
      {
        id: 1,
        colorName: "Cloud White / Core Black / Lucid Lemon",
        image: "/placeholder.png?height=400&width=400",
        thumbnail: "/placeholder.png?height=60&width=60",
      },
    ],
    sizes: ["6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"],
    reviews: {
      rating: 4.1,
      count: 156,
    },
    description: "League-level F50 cleats suitable for firm and multi-ground surfaces.",
    details: {
      surface: "Firm/Multi-Ground",
      level: "League",
      fit: "Regular",
      material: "Synthetic",
    },
  },
  {
    id: 4,
    name: "Superstar Messi Shoes",
    price: 110,
    collection: "Originals",
    badge: "New",
    modelNumber: "JP5596",
    images: [
      "/placeholder.png?height=600&width=600",
      "/placeholder.png?height=600&width=600",
      "/placeholder.png?height=600&width=600",
      "/placeholder.png?height=600&width=600",
    ],
    variants: [
      {
        id: 1,
        colorName: "Wonder Clay / Core Black / Cloud White",
        image: "/placeholder.png?height=400&width=400",
        thumbnail: "/placeholder.png?height=60&width=60",
      },
      {
        id: 2,
        colorName: "Cloud White / Core Black / Gold Metallic",
        image: "/placeholder.png?height=400&width=400",
        thumbnail: "/placeholder.png?height=60&width=60",
      },
    ],
    sizes: ["6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"],
    reviews: {
      rating: 4.4,
      count: 203,
    },
    description: "Classic Superstar shoes with Messi-inspired design elements.",
    details: {
      surface: "Street",
      level: "Lifestyle",
      fit: "Regular",
      material: "Leather",
    },
  },
  {
    id: 5,
    name: "Copa Mundial Firm Ground Cleats",
    price: 180,
    collection: "Men's Soccer",
    modelNumber: "JP5597",
    images: [
      "/placeholder.png?height=600&width=600",
      "/placeholder.png?height=600&width=600",
      "/placeholder.png?height=600&width=600",
      "/placeholder.png?height=600&width=600",
    ],
    variants: [
      {
        id: 1,
        colorName: "Core Black / Cloud White",
        image: "/placeholder.png?height=400&width=400",
        thumbnail: "/placeholder.png?height=60&width=60",
      },
      {
        id: 2,
        colorName: "Cloud White / Core Black",
        image: "/placeholder.png?height=400&width=400",
        thumbnail: "/placeholder.png?height=60&width=60",
      },
      {
        id: 3,
        colorName: "Core Black / Gold Metallic",
        image: "/placeholder.png?height=400&width=400",
        thumbnail: "/placeholder.png?height=60&width=60",
      },
    ],
    sizes: ["6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"],
    reviews: {
      rating: 4.6,
      count: 342,
    },
    description: "Legendary Copa Mundial cleats with premium kangaroo leather upper.",
    details: {
      surface: "Firm Ground",
      level: "Professional",
      fit: "Regular",
      material: "Kangaroo Leather",
    },
  },
  {
    id: 6,
    name: "Predator Sala Shoes",
    price: 130,
    collection: "Originals",
    badge: "New",
    modelNumber: "JP5598",
    images: [
      "/placeholder.png?height=600&width=600",
      "/placeholder.png?height=600&width=600",
      "/placeholder.png?height=600&width=600",
      "/placeholder.png?height=600&width=600",
    ],
    variants: [
      {
        id: 1,
        colorName: "Core Black / Cloud White / Solar Red",
        image: "/placeholder.png?height=400&width=400",
        thumbnail: "/placeholder.png?height=60&width=60",
      },
      {
        id: 2,
        colorName: "Cloud White / Core Black / Solar Red",
        image: "/placeholder.png?height=400&width=400",
        thumbnail: "/placeholder.png?height=60&width=60",
      },
    ],
    sizes: ["6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"],
    reviews: {
      rating: 4.2,
      count: 98,
    },
    description: "Indoor soccer shoes with Predator technology for enhanced ball control.",
    details: {
      surface: "Indoor",
      level: "Performance",
      fit: "Regular",
      material: "Synthetic",
    },
  },
]

export const filterCategories = [
  { id: "soccer-shoes", name: "Soccer Shoes", active: true },
  { id: "soccer-cleats", name: "Soccer Cleats", active: false },
  { id: "f50", name: "F50", active: false },
  { id: "predator", name: "Predator", active: false },
  { id: "copa", name: "Copa", active: false },
  { id: "advanced-level", name: "Advanced Level", active: false },
  { id: "intermediate-level", name: "Intermediate Level", active: false },
  { id: "beginner-level", name: "Beginner Level", active: false },
]
