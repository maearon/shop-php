// app/[slug]/[model]/page.tsx

import { notFound } from "next/navigation";
import ProductDetailPageClient from "./ProductDetailPageClient";
import { Suspense } from "react";
import FullScreenLoader from "@/components/ui/FullScreenLoader";

interface PageProps {
  params: {
    slug: string;
    model: string;
  };
}

export default function ProductDetailPage({ params }: PageProps) {
  return (
    <Suspense fallback={<FullScreenLoader />}>
      <ProductDetailPageClient params={params} />
    </Suspense>
  );
}
