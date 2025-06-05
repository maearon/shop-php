import { UserProvider } from "@auth0/nextjs-auth0/client"
import HeroBanner from "@/components/ui/HeroBanner"
import ProductGrid from "@/components/product/ProductGrid"
import SocialLinks from "@/components/ui/SocialLinks"

export default function Home() {
  return (
    <UserProvider>
      <main className="min-h-screen">
        <HeroBanner />

        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">SẢN PHẨM NỔI BẬT</h2>
            <ProductGrid />
          </div>
        </section>

        <section className="py-16 bg-black text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">THEO DÕI CHÚNG TÔI</h2>
            <SocialLinks />
          </div>
        </section>
      </main>
    </UserProvider>
  )
}
