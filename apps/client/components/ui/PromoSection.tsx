import Link from "next/link"
import Image from "next/image"

export default function PromoSection() {
  return (
    <div className="my-16">
      <div className="relative h-[50vh] w-full">
        <Image src="/images/promo-banner.jpg" alt="adidas promo" fill className="object-cover" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8 bg-black/30">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">GIẢM GIÁ ĐẾN 50%</h2>
          <p className="text-xl text-white mb-8 max-w-xl">Khám phá bộ sưu tập giảm giá đặc biệt. Số lượng có hạn.</p>
          <Link href="/outlet" className="btn-primary">
            Mua ngay
          </Link>
        </div>
      </div>
    </div>
  )
}
