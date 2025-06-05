import Link from "next/link"
import Image from "next/image"

export default function CategoryGrid() {
  const categories = [
    {
      name: "Nam",
      image: "/images/categories/men.jpg",
      href: "/men",
    },
    {
      name: "Nữ",
      image: "/images/categories/women.jpg",
      href: "/women",
    },
    {
      name: "Trẻ em",
      image: "/images/categories/kids.jpg",
      href: "/kids",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {categories.map((category) => (
        <Link key={category.name} href={category.href} className="relative group overflow-hidden">
          <div className="aspect-[4/5] relative">
            <Image
              src={category.image || "/placeholder.svg"}
              alt={category.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-2xl font-bold text-white">{category.name}</h3>
              <p className="text-white mt-2 flex items-center">
                Mua ngay
                <span className="ml-2 group-hover:ml-3 transition-all duration-300">→</span>
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
