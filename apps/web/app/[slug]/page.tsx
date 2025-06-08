import { categoryConfig } from "@/utils/category-config"
import CategoryPageClient from "./CategoryPageClient"

type CategoryPageProps = {
  params: {
    slug: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  return <CategoryPageClient params={params} />
}

// Generate static params cho các trang có sẵn
export function generateStaticParams() {
  return Object.keys(categoryConfig).map((slug) => ({
    slug: slug,
  }))
}
