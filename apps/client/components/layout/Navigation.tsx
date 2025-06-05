import Link from "next/link"

interface NavigationProps {
  mobile?: boolean
}

export default function Navigation({ mobile = false }: NavigationProps) {
  const navItems = [
    { name: "Nam", href: "/men" },
    { name: "Nữ", href: "/women" },
    { name: "Trẻ em", href: "/kids" },
    { name: "Thể thao", href: "/sports" },
    { name: "Brands", href: "/brands" },
    { name: "Outlet", href: "/outlet" },
  ]

  return (
    <nav>
      <ul className={`flex ${mobile ? "flex-col gap-4" : "gap-6"}`}>
        {navItems.map((item) => (
          <li key={item.name}>
            <Link href={item.href} className={`nav-link ${mobile ? "text-base block py-2" : ""}`}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
