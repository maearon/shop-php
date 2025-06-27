"use client"

import { Facebook, Instagram, Twitter, Youtube, Music, MapPin, ChevronUp } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import CcpaIcon from "@/assets/icons/ccpa-privacy-options.svg";

export default function Footer() {
  const footerSections = {
    PRODUCTS: [
      "Shoes",
      "Clothing",
      "Accessories",
      "Gift Cards",
      "",
      "New Arrivals",
      "Best Sellers",
      "Release Dates",
      "Sale",
    ],
    Sports: [
      "Soccer",
      "Running",
      "Basketball",
      "Football",
      "Outdoor",
      "Golf",
      "Baseball",
      "Tennis",
      "Skateboarding",
      "Training",
    ],
    Collections: [
      "adicolor",
      "Ultraboost",
      "Forum",
      "Superstar",
      "Running Shoes",
      "adilette",
      "Stan Smith",
      "adizero",
      "Tiro",
      "Cloudfoam Pure",
    ],
    SUPPORT: [
      "Help",
      "Returns & Exchanges",
      "Shipping",
      "Order Tracker",
      "Store Locator",
      "Size Charts",
      "Gift Card Balance",
      "How to Clean Shoes",
      "Bra Fit Guide",
      "Breathing for Running",
      "Promotions",
      "Sitemap",
    ],
    "COMPANY INFO": [
      "About Us",
      "Student Discount",
      "Military & Healthcare Discount",
      "adidas Stories",
      "adidas Apps",
      "Impact",
      "People",
      "Planet",
      "adiClub",
      "Affiliates",
      "Press",
      "Careers",
      "California Transparency in Supply Chains Act",
      "Responsible Disclosure",
      "Transparency in Coverage",
    ],
  }

  const mobileFooterSections = {
    "My account": ["Help", "Returns & Exchanges", "Order Tracker", "Shipping", "Promotions", "Sitemap"],
    "Your bag (2)": ["adiClub", "Store Finder", "Gift Cards", "adidas Apps", "Size Charts"],
  }

  const socialIcons = [
    { name: "Facebook", icon: Facebook, href: "https://facebook.com/adidas" },
    { name: "Instagram", icon: Instagram, href: "https://instagram.com/adidas" },
    { name: "Twitter", icon: Twitter, href: "https://twitter.com/adidas" },
    { name: "Pinterest", icon: MapPin, href: "https://pinterest.com/adidas" },
    { name: "TikTok", icon: Music, href: "https://tiktok.com/@adidas" },
    { name: "YouTube", icon: Youtube, href: "https://youtube.com/adidas" },
  ]

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <>
      {/* Mobile Opinion Section */}
      {/* <section className="sm:hidden bg-white py-8 border-t">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-lg font-bold mb-2">YOUR OPINION COUNTS</h2>
          <p className="text-sm text-gray-600 mb-6">We strive to serve you better and appreciate your feedback</p>
        </div>
      </section> */}

      {/* Desktop Black section with white text */}
      <section className="bg-black text-white py-16">
        <div className="container mx-auto px-8 text-center">
          <h2 className="text-2xl font-bold mb-8">SNEAKERS, ACTIVEWEAR AND SPORTING GOODS</h2>
          <div className="max-w-6xl mx-auto text-sm leading-relaxed space-y-4">
            <p>
              Calling all athletes. Gear up for your favorite sport with adidas sneakers and activewear for men and women. From running to soccer and the gym to the trail, performance workout clothes and shoes keep you feeling your best. Find sport-specific sneakers to support your passion, and shop versatile activewear and accessories that support everyday comfort. adidas has you covered with world-class performance, quality and unmatched comfort to fit your style. Explore the full range of adidas gear today.
              <br /><br />
              Founded on performance, adidas sporting goods equipment supports athletes at all levels. Men, women and kids will find their best form in sneakers and activewear made to perform under pressure. adidas sportswear breathes, manages sweat and helps support working muscles. Explore sport-specific clothes and gear for basketball, soccer, or the yoga studio. Runners will find a range of sneakers for training, racing and trail runs. Gym users will find tops, tees and tanks that support focused efforts with adidas CLIMACOOL to feel cool and dry. Explore warm-ups featuring four-way stretch to support mobility. Find a new outdoor jacket that helps protect against wind and rain. Lace up new athletic shoes that energize every step with adidas Boost cushioning. With sizes and styles for all ages, we have sporting goods for the whole family. Dedicated training demands dedicated workout clothes. Experience the latest performance fabrics and sneaker technologies to get the most out of your next training session.
            </p>
          </div>

          <div className="mt-12">
            <Image
              src="/logo-white.png"
              alt="Logo"
              width={100}
              height={40}
              className="mx-auto"
              priority
            />
          </div>
        </div>
      </section>

      {/* Opinion Section with Back to Top */}
      <section className="sm:hidden bg-gray-100 py-4">
        <div className="container mx-auto px-4">
          <h3 className="text-base font-bold mb-1">YOUR OPINION COUNTS</h3>
          <p className="text-sm text-gray-600">We strive to serve you better and appreciate your feedback</p>
        </div>
      </section>

      {/* Back to Top button (mobile) */}
      <section className="sm:hidden bg-white border-t py-4">
        <div className="px-4 flex justify-center">
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 text-xs font-medium text-black"
          >
            <ChevronUp className="h-4 w-4" />
            Back to top
          </button>
        </div>
      </section>

      {/* Bottom CTA */}
      <div className="hidden sm:block bg-blue-600 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-2">JOIN OUR ADICLUB & GET 15% OFF</h3>
          <Link
            href="/signup"
            className="bg-white text-blue-600 px-6 py-2 rounded font-semibold hover:bg-gray-100 transition-colors"
          >
            SIGN UP FOR FREE →
          </Link>
        </div>
      </div>

      {/* Main Footer */}
      <footer className="bg-black text-white py-8 md:py-12">
        <div className="container mx-auto">
          
          {/* Desktop Footer */}
          <div className="hidden md:grid grid-cols-6 gap-8 pl-14 sm:pl-14 md:pl-14 lg:pl-14 xl:pl-20 2xl:pl-20 2xl:px-20">
            {Object.entries(footerSections).map(([section, items]) => (
              <div key={section}>
                <h3 className="font-bold mb-4 text-sm">{section}</h3>
                <ul className="space-y-2">
                  {items.map((item, index) => (
                    <li key={index}>
                      {item ? (
                        <a href="#" className="text-sm text-gray-300 hover:text-white hover:underline">
                          {item}
                        </a>
                      ) : (
                        <div className="h-2"></div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Follow Us Column */}
            <div>
              <h3 className="font-bold mb-4 text-sm">FOLLOW US</h3>
              <div className="space-y-3">
                {socialIcons.map((social, index) => {
                  const IconComponent = social.icon
                  return (
                    <a
                      key={index}
                      href={social.href}
                      className="flex items-center justify-center w-8 h-8 bg-white text-black rounded-full hover:bg-gray-200 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <IconComponent size={16} />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Mobile Footer */}
          <div className="sm:hidden py-6 space-y-6">

            {/* Hàng 1: 2 tiêu đề có padding ngang */}
            <div className="grid grid-cols-2 gap-4 pl-14 sm:pl-14 md:pl-14 lg:pl-14 xl:pl-20 2xl:pl-20 2xl:px-20">
              <h3 className="font-bold text-sm">My account</h3>
              <h3 className="font-bold text-sm">Your bag (2)</h3>
            </div>

            {/* Hàng 2: CTA không có padding ngang */}
            <div className="bg-blue-600 text-white py-5 text-center">
              <h3 className="text-base font-bold mb-2">JOIN OUR ADICLUB & GET 15% OFF</h3>
              <Link
                href="/signup"
                className="bg-white text-blue-600 px-4 py-1.5 rounded font-semibold text-sm hover:bg-gray-100 transition-colors inline-block"
              >
                SIGN UP FOR FREE →
              </Link>
            </div>

            {/* Hàng 3: 2 cột nội dung có padding ngang */}
            <div className="grid grid-cols-2 gap-4 pl-14 sm:pl-14 md:pl-14 lg:pl-14 xl:pl-20 2xl:pl-20 2xl:px-20">
              <ul className="space-y-2">
                {mobileFooterSections["My account"].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="text-sm text-gray-300 hover:text-white">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
              <ul className="space-y-2">
                {mobileFooterSections["Your bag (2)"].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="text-sm text-gray-300 hover:text-white">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </footer>

      {/* Bottom Footer */}
      <div className="bg-black text-white py-6 border-t border-gray-700">
        <div className="container mx-auto pl-14 sm:pl-14 md:pl-14 lg:pl-14 xl:pl-20 2xl:pl-20 2xl:px-20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-sm">
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <div className="flex items-center gap-2">
                <span>Your Privacy Choices</span>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-5">
                    <CcpaIcon className="w-full h-full" />
                  </div>
                </div>
              </div>
              <span className="hidden md:inline text-gray-400">|</span>
              <a href="#" className="hover:underline text-gray-300">
                Privacy Policy
              </a>
              <span className="hidden md:inline text-gray-400">|</span>
              <a href="#" className="hover:underline text-gray-300">
                Terms and Conditions
              </a>
            </div>

            {/* Country Selector */}
            <div className="flex items-center gap-2 text-sm">
              <Image
                src="/flag/us.svg"
                alt="US Flag"
                width={20}
                height={14}
                className="inline-block"
              />
              <span>United States</span>
            </div>
          </div>

          <div className="mt-4 text-center md:text-left">
            <div className="text-gray-400 text-sm">© 2025 adidas America, Inc.</div>
          </div>
        </div>
      </div>
    </>
  )
}
