import { notFound } from "next/navigation"
import ProductGallery from "@/components/product/ProductGallery"
import ProductInfo from "@/components/product/ProductInfo"
import ProductTabs from "@/components/product/ProductTabs"
import RelatedProducts from "@/components/product/RelatedProducts"
import Breadcrumbs from "@/components/ui/Breadcrumbs"
import { getProduct } from "@/lib/api"

interface ProductPageProps {
  params: { slug: string }
}

export default async function ProductPage({ params }: ProductPageProps) {
  // In a real app, this would fetch from an API
  const product = await getProduct(params.slug)

  if (!product) {
    notFound()
  }

  const breadcrumbs = [
    { label: "Trang chủ", href: "/" },
    { label: product.category, href: `/categories/${product.categorySlug}` },
    { label: product.name, href: `/products/${product.slug}` },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={breadcrumbs} />

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <ProductGallery images={product.images} />
        <ProductInfo product={product} />
      </div>

      <div className="mt-16">
        <ProductTabs
          description={product.description}
          specifications={product.specifications}
          reviews={product.reviews}
        />
      </div>

      <div className="mt-16">
        <h2 className="mb-8 text-2xl font-bold">SẢN PHẨM LIÊN QUAN</h2>
        <RelatedProducts categorySlug={product.categorySlug} currentProductId={product.id} />
      </div>
    </div>
  )
}
