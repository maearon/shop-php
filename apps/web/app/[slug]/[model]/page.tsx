// page.tsx
import { notFound } from "next/navigation"
import ProductDetailPageClient from "./ProductDetailPageClient"
import { fakeLastVisitedProducts } from "@/data/fake-last-visited-products"

type Props = {
  params: {
    slug: string
    model: string
  }
}

export default function ProductDetailPage({ params }: Props) {
  const product = fakeLastVisitedProducts.find(
    (item) => item.product.model_number === params.model
  )?.product

  if (!product) return notFound()

  return <ProductDetailPageClient product={product} />
}
