import { Product } from "@/types/product";
import { getCategoryConfig, categoryConfigs } from "@/utils/category-config.auto"
import { slugify } from "@/utils/slugtify";

export function formatSlugTitle(slug: string): string {
  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

export function getBreadcrumbTrail(slug: string): { label: string; href: string }[] {
  const trail: { label: string; href: string }[] = []
  let currentSlug = slug
  let depth = 0

  while (currentSlug && depth < 4) {
    const config = getCategoryConfig(currentSlug)

    trail.unshift({
      // Luôn dùng formatSlugTitle để đẹp
      label: formatSlugTitle(currentSlug),
      href: config.href || `/${currentSlug}`,
    })

    const parent = Object.entries(categoryConfigs).find(([_, c]) =>
      c.tabs.some((tab) => tab.slug === currentSlug)
    )
    currentSlug = parent?.[0] || ""
    depth++
  }

  return [{ label: "Home", href: "/" }, ...trail]
}

export function buildBreadcrumbFromProductItem(product: Product) {
  return [
    { label: "Home", href: "/" },
    { label: product.gender, href: `/category/${slugify(product.gender)}` },
    { label: product.sport, href: `/category/${slugify(product.gender)}/${slugify(product.sport)}` },
    { label: product.category, href: `/category/${slugify(product.gender)}/${slugify(product.sport)}/${slugify(product.category)}` },
  ];
}

export function buildBreadcrumbFromProductDetail(product: Product) {
  return [
    { label: "Home", href: "/" },
    { label: product.gender, href: `/category/${slugify(product.gender)}` },
    // { label: product.sport, href: `/category/${slugify(product.gender)}/${slugify(product.sport)}` },
    { label: product.category, href: `/category/${slugify(product.gender)}/${slugify(product.sport)}/${slugify(product.category)}` },
    // { label: product.name, href: `/product/${product.slug || product.id}` },
  ];
}
