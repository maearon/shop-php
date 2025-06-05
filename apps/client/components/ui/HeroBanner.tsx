import Link from "next/link"
import Image from "next/image"

export default function HeroBanner() {
  return (
    <div className="relative h-[70vh] w-full">
      <Image src="/images/hero-banner.jpg" alt="adidas hero banner" fill priority className="object-cover" />
      <div className="absolute inset-0 flex flex-col justify-center items-start p-8 md:p-16 bg-gradient-to-r from-black/40 to-transparent">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">IMPOSSIBLE IS NOTHING</h1>
        <p className="text-xl text-white mb-8 max-w-md">
          Khám phá bộ sưu tập mới nhất từ adidas. Thiết kế đột phá, công nghệ tiên tiến.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/men" className="btn-primary">
            Nam
          </Link>
          <Link href="/women" className="btn-primary">
            Nữ
          </Link>
          <Link href="/kids" className="btn-primary">
            Trẻ em
          </Link>
        </div>
      </div>
    </div>
  )
}
