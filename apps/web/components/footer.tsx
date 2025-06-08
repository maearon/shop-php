import { Facebook, Instagram, Twitter, Youtube, Music, MapPin } from "lucide-react"

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
    SPORTS: [
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
    COLLECTIONS: [
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

  const socialIcons = [
    { name: "Facebook", icon: Facebook, href: "https://facebook.com/adidas" },
    { name: "Instagram", icon: Instagram, href: "https://instagram.com/adidas" },
    { name: "Twitter", icon: Twitter, href: "https://twitter.com/adidas" },
    { name: "Pinterest", icon: MapPin, href: "https://pinterest.com/adidas" },
    { name: "TikTok", icon: Music, href: "https://tiktok.com/@adidas" },
    { name: "YouTube", icon: Youtube, href: "https://youtube.com/adidas" },
  ]

  return (
    <>
      {/* Black section with white text */}
      <section className="bg-black text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-8">SNEAKERS, ACTIVEWEAR AND SPORTING GOODS</h2>
          <div className="max-w-6xl mx-auto text-sm leading-relaxed space-y-4">
            <p>
              Calling all athletes, based on your favorite sport with adidas sneakers and activewear for men and women.
              From running to soccer, and the gym to the street, performance workout clothes and shoes from our sporting
              goods selection will have you covered. Grab the latest in athletic fashion with new arrivals added daily.
            </p>
            <p>
              Whether you're training for a marathon, playing pickup basketball or just hanging out with friends, adidas
              men's clothing and shoes are designed to keep you comfortable, so you feel confident and ready to take on
              whatever comes your way. adidas is here, whether you need team, with men's workout clothes and sneakers
              that are built to last and designed to perform.
            </p>
            <p>
              From our adidas Boost technology that returns energy with every step, to our activewear that fits and
              feels as great as it looks. Experience the adidas difference. Browse our full collection of adidas shoes,
              clothing and accessories online, and find your perfect fit today. With free shipping and returns, shopping
              for your favorite adidas gear has never been easier.
            </p>
          </div>
          <div className="mt-12">
            <div className="text-2xl font-bold">adidas</div>
          </div>
        </div>
      </section>

      {/* Main Footer */}
      <footer className="bg-white py-12 border-t">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-6 gap-8">
            {Object.entries(footerSections).map(([section, items]) => (
              <div key={section}>
                <h3 className="font-bold mb-4 text-sm">{section}</h3>
                <ul className="space-y-2">
                  {items.map((item, index) => (
                    <li key={index}>
                      {item ? (
                        <a href="#" className="text-sm text-gray-600 hover:underline">
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
                      className="flex items-center justify-center w-8 h-8 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
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
        </div>
      </footer>

      {/* Bottom Footer */}
      <div className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <span>Your Privacy Choices</span>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-4 bg-blue-600 rounded"></div>
                <span>✗</span>
              </div>
              <span>|</span>
              <a href="#" className="hover:underline">
                Privacy Policy
              </a>
              <span>|</span>
              <a href="#" className="hover:underline">
                Terms and Conditions
              </a>
            </div>
            <div className="text-gray-400">© 2025 adidas America, Inc.</div>
          </div>
        </div>
      </div>
    </>
  )
}
