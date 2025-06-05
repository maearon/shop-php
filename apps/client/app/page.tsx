import HeroBanner from "@/components/ui/HeroBanner"
import FeaturedProducts from "@/components/product/FeaturedProducts"
import CategoryGrid from "@/components/ui/CategoryGrid"
import PromoSection from "@/components/ui/PromoSection"
import Newsletter from "@/components/ui/Newsletter"

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <HeroBanner />
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">SẢN PHẨM NỔI BẬT</h2>
        <FeaturedProducts />

        <h2 className="text-2xl font-bold my-6">DANH MỤC</h2>
        <CategoryGrid />

        <PromoSection />

        <Newsletter />
      </div>
    </div>
  )
}
