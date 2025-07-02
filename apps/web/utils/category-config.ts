interface CategoryTab {
  name: string
  slug: string
}

interface CategoryConfig {
  title: string
  description: string
  breadcrumb: string
  tabs: CategoryTab[]
}

const categoryConfigs: Record<string, CategoryConfig> = {
  "men-soccer-shoes": {
    title: "Men's Soccer Shoes",
    description:
      "Find your perfect pair of men's soccer cleats and shoes. From firm ground to artificial turf, we have the right footwear for every playing surface.",
    breadcrumb: "Soccer Shoes",
    tabs: [
      { name: "All Soccer Shoes", slug: "men-soccer-shoes" },
      { name: "F50", slug: "men-soccer-shoes-f50" },
      { name: "Predator", slug: "men-soccer-shoes-predator" },
      { name: "Copa", slug: "men-soccer-shoes-copa" },
      { name: "X", slug: "men-soccer-shoes-x" },
    ],
  },
  "men-soccer-shoes-f50": {
    title: "Men's F50 Soccer Shoes",
    description:
      "Experience ultimate speed with F50 soccer cleats. Lightweight design and superior traction for explosive acceleration on the pitch.",
    breadcrumb: "F50 Soccer Shoes",
    tabs: [
      { name: "All Soccer Shoes", slug: "men-soccer-shoes" },
      { name: "F50", slug: "men-soccer-shoes-f50" },
      { name: "Predator", slug: "men-soccer-shoes-predator" },
      { name: "Copa", slug: "men-soccer-shoes-copa" },
      { name: "X", slug: "men-soccer-shoes-x" },
    ],
  },
  "men-soccer-shoes-predator": {
    title: "Men's Predator Soccer Shoes",
    description:
      "Dominate the game with Predator soccer cleats. Enhanced ball control and precision for the ultimate playing experience.",
    breadcrumb: "Predator Soccer Shoes",
    tabs: [
      { name: "All Soccer Shoes", slug: "men-soccer-shoes" },
      { name: "F50", slug: "men-soccer-shoes-f50" },
      { name: "Predator", slug: "men-soccer-shoes-predator" },
      { name: "Copa", slug: "men-soccer-shoes-copa" },
      { name: "X", slug: "men-soccer-shoes-x" },
    ],
  },
  "men-soccer-shoes-copa": {
    title: "Men's Copa Soccer Shoes",
    description:
      "Classic comfort meets modern performance with Copa soccer cleats. Premium leather construction for exceptional touch and feel.",
    breadcrumb: "Copa Soccer Shoes",
    tabs: [
      { name: "All Soccer Shoes", slug: "men-soccer-shoes" },
      { name: "F50", slug: "men-soccer-shoes-f50" },
      { name: "Predator", slug: "men-soccer-shoes-predator" },
      { name: "Copa", slug: "men-soccer-shoes-copa" },
      { name: "X", slug: "men-soccer-shoes-x" },
    ],
  },
  "men-soccer-shoes-x": {
    title: "Men's X Soccer Shoes",
    description:
      "Unleash your creativity with X soccer cleats. Designed for agility and quick movements to outplay your opponents.",
    breadcrumb: "X Soccer Shoes",
    tabs: [
      { name: "All Soccer Shoes", slug: "men-soccer-shoes" },
      { name: "F50", slug: "men-soccer-shoes-f50" },
      { name: "Predator", slug: "men-soccer-shoes-predator" },
      { name: "Copa", slug: "men-soccer-shoes-copa" },
      { name: "X", slug: "men-soccer-shoes-x" },
    ],
  },
  men: {
    title: "Men's",
    description:
      "Discover the latest men's athletic wear, shoes, and accessories. From running to training, find gear that matches your active lifestyle.",
    breadcrumb: "Men",
    tabs: [
      { name: "All", slug: "men" },
      { name: "Shoes", slug: "men-shoes" },
      { name: "Clothing", slug: "men-clothing" },
      { name: "Accessories", slug: "men-accessories" },
    ],
  },
  women: {
    title: "Women's",
    description:
      "Shop the latest women's athletic wear, shoes, and accessories. Performance meets style in every piece.",
    breadcrumb: "Women",
    tabs: [
      { name: "All", slug: "women" },
      { name: "Shoes", slug: "women-shoes" },
      { name: "Clothing", slug: "women-clothing" },
      { name: "Accessories", slug: "women-accessories" },
    ],
  },
}

export function getCategoryConfig(slug: string): CategoryConfig {
  return (
    categoryConfigs[slug] || {
      title: "Products",
      description: "Discover our latest collection of athletic wear and accessories.",
      breadcrumb: "Products",
      tabs: [{ name: "All", slug }],
    }
  )
}
