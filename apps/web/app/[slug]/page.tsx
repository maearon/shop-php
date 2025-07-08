import { Suspense } from "react"
import CategoryPageClient from "./CategoryPageClient"
import Loading from "@/components/loading"

interface CategoryPageProps {
  params: {
    slug: string
  }
  searchParams?: {
    page?: string
    sort?: string
    gender?: string
    category?: string
    activity?: string
    product_type?: string
    size?: string
    color?: string
    material?: string
    brand?: string
    model?: string
    collection?: string
    min_price?: string
    max_price?: string
    shipping?: string
  }
}

export default function CategoryPage({ params, searchParams }: CategoryPageProps) {
  return (
    <Suspense fallback={<Loading />}>
      <CategoryPageClient params={params} searchParams={searchParams} />
    </Suspense>
  )
}
