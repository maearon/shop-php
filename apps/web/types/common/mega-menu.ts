// types/common/mega-menu.ts
export interface MenuCategory {
  title: string
  titleHref?: string // 👈 thêm dòng này
  items: { name: string; href: string }[]
}