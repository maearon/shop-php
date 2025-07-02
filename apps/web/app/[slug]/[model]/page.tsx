import { notFound } from "next/navigation"
import { soccerShoesData } from "@/data/soccer-shoes-data"
import ProductDetailPageClient from "./ProductDetailPageClient"
// import { fakeLastVisitedProducts } from "@/data/fake-last-visited-products"

interface PageProps {
  params: {
    slug: string;
    model: string;
  };
}

export default function ProductDetailPage({ params }: PageProps) {
  const { slug, model } = params;

  // Find product by model number
  const product = soccerShoesData.find((p) => p.jan_code === params.model)
  // const product = fakeLastVisitedProducts.find(
  //   (item) => item.product.model_number === params.model
  // )?.product

  if (!product) {
    notFound()
  }

  return <ProductDetailPageClient product={product} />
}
