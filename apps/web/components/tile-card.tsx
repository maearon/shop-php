"use client"

interface Tile {
  title: string,
  subtitle?: string,
  description?: string,
  image?: string,
  href?: string,
  cta?: string,
}
interface TileCardProps {
  tile: Tile, 
  index: number
}

export default function TileCard({ 
  tile = {
    title: "",
    subtitle: "",
    description: "",
    image: "/placeholder.png?height=200&width=300",
    href: "#",
    cta: "SHOP NOW",
  },
  index = 1
}: TileCardProps) {
  return (
    <a
      key={`${tile.title}-${index}`}
      href={tile.href}
      className="group border border-transparent hover:border-black transition duration-300"
    >
      {/* Image section */}
      <div className="aspect-[3/4] w-full overflow-hidden">
        <img
          src={tile.image}
          alt={tile.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Text section */}
      <div className="p-4">
        <h3 className="font-bold text-sm md:text-base uppercase mb-1">{tile.title}</h3>
        <p className="text-sm text-gray-700 mb-3">{tile.description}</p>
        <span className="text-sm font-bold underline">SHOP NOW</span>
      </div>
    </a>
  )
}