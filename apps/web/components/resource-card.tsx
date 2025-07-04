"use client"

interface Resource {
  title: string,
  subtitle?: string,
  description?: string,
  image?: string,
  href?: string,
  cta?: string,
}
interface ResourceCardProps {
  resource: Resource, 
  index: number
}

export default function ResourceCard({ 
  resource = {
    title: "",
    subtitle: "",
    description: "",
    image: "/placeholder.png?height=200&width=300",
    href: "#",
    cta: "SHOP NOW",
  },
  index = 1
}: ResourceCardProps) {
  return (
    <a
      key={`${resource.title}-${index}`}
      href={resource.href}
      className="group border border-transparent hover:border-black transition duration-300"
    >
      <div
        // ref={(el) => (imageRefs.current[i] = el)}
        className="shrink-0 lazy-bg bg-gray-100 relative overflow-hidden"
        data-bg={resource.image}
        style={{
          // width: `${100 / slides.length}%`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundImage: "none",
          height: "24rem",
        }}
      >
      <div className="absolute inset-0 bg-black bg-opacity-30" />
        <div className="relative h-full flex flex-col justify-end p-6 text-white">
          <h3 className="font-bold text-lg mb-2">{resource.title}</h3>
          <p className="text-sm mb-4 leading-relaxed">{resource.description}</p>
        </div>
      </div>
    </a>
  )
}