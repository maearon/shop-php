// app/[slug]/[model]/page.tsx

import { notFound } from "next/navigation";
import ProductDetailPageClient from "./ProductDetailPageClient";

interface PageProps {
  params: {
    slug: string;
    model: string;
  };
}

export default function ProductDetailPage({ params }: PageProps) {
  if (!params?.model) notFound();
  return <ProductDetailPageClient params={params} />
}
