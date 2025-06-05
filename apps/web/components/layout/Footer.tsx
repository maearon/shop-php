import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"

export default function Footer() {
  const footerLinks = [
    {
      title: "Sản phẩm",
      links: [
        { name: "Giày", href: "/products/shoes" },
        { name: "Quần áo", href: "/products/clothing" },
        { name: "Phụ kiện", href: "/products/accessories" },
        { name: "Hàng mới về", href: "/products/new-arrivals" },
        { name: "Best Sellers", href: "/products/best-sellers" },
      ],
    },
    {
      title: "Thể thao",
      links: [
        { name: "Chạy bộ", href: "/sports/running" },
        { name: "Bóng đá", href: "/sports/football" },
        { name: "Tập luyện", href: "/sports/training" },
        { name: "Bóng rổ", href: "/sports/basketball" },
        { name: "Tennis", href: "/sports/tennis" },
      ],
    },
    {
      title: "Bộ sưu tập",
      links: [
        { name: "Originals", href: "/collections/originals" },
        { name: "Ultraboost", href: "/collections/ultraboost" },
        { name: "Superstar", href: "/collections/superstar" },
        { name: "Stan Smith", href: "/collections/stan-smith" },
        { name: "NMD", href: "/collections/nmd" },
      ],
    },
    {
      title: "Hỗ trợ",
      links: [
        { name: "Trợ giúp", href: "/help" },
        { name: "Đổi trả", href: "/returns" },
        { name: "Thanh toán", href: "/payment" },
        { name: "Vận chuyển", href: "/shipping" },
        { name: "Liên hệ", href: "/contact" },
      ],
    },
    {
      title: "Về adidas",
      links: [
        { name: "Giới thiệu", href: "/about" },
        { name: "Tin tức", href: "/news" },
        { name: "Tuyển dụng", href: "/careers" },
        { name: "Nhà đầu tư", href: "/investors" },
        { name: "Bền vững", href: "/sustainability" },
      ],
    },
  ]

  return (
    <footer className="bg-black text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        {/* Footer links */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="font-bold text-lg mb-4 uppercase">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-gray-300 hover:text-white text-sm">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social and newsletter */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-t border-gray-800 pt-8 pb-4">
          <div className="flex gap-4 mb-4 md:mb-0">
            <a
              href="https://facebook.com/adidasVN"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300"
            >
              <Facebook size={24} />
            </a>
            <a
              href="https://instagram.com/adidasVN"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300"
            >
              <Instagram size={24} />
            </a>
            <a
              href="https://twitter.com/adidasVN"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300"
            >
              <Twitter size={24} />
            </a>
            <a
              href="https://youtube.com/adidasVN"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300"
            >
              <Youtube size={24} />
            </a>
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <Image
              src="/images/payment-methods.png"
              alt="Payment methods"
              width={200}
              height={30}
              className="h-6 w-auto"
            />
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-400 text-xs mt-8">
          <p>© {new Date().getFullYear()} adidas Vietnam. Tất cả các quyền được bảo lưu.</p>
          <div className="flex justify-center gap-4 mt-2">
            <Link href="/privacy" className="hover:text-white">
              Chính sách bảo mật
            </Link>
            <Link href="/terms" className="hover:text-white">
              Điều khoản sử dụng
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
