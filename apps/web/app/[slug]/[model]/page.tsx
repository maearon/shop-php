// app/[slug]/[model]/page.tsx

import { notFound } from "next/navigation";
import ProductDetailPageClient from "./ProductDetailPageClient";
import { Suspense } from "react";
import Loading from "@/components/loading";

interface PageProps {
  params: {
    slug: string;
    variant_code: string;
  };
}

export default function ProductDetailPage({ params }: PageProps) {
  const { slug, variant_code } = params;

  // Optional: fetch product data and return notFound() if invalid
  // const product = await fetchProduct(slug, variant_code);
  // if (!product) notFound();

  return (
    <Suspense fallback={<Loading />}>
      <ProductDetailPageClient params={params} />
    </Suspense>
  );
}
