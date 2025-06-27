"use client"

import { ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"

export default function MenFooter() {
  const [expandedSections, setExpandedSections] = useState<string[]>([])

  const footerSections = {
    "Men's Clothing": ["T-shirts", "Hoodies", "Jackets", "Shorts", "Pants & Joggers"],
    "Men's Shoes": ["Shoes", "High Top Sneakers", "Classic Sneakers", "Slip On Sneakers", "All White Sneakers"],
    "Men's Accessories": ["Men's Accessories", "Men's Duffle Bags", "Men's Socks", "Men's Hats", "Men's Headphones"],
    "MEN'S COLLECTIONS": [
      "Men's Running",
      "Men's Soccer",
      "Men's Loungewear",
      "Men's Training & Gym",
      "Men's Originals",
    ],
  }

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]
    )
  }

  const sectionEntries = Object.entries(footerSections)
  const rows = [
    [sectionEntries[0], sectionEntries[1]], // Clothing - Shoes
    [sectionEntries[2], sectionEntries[3]], // Accessories - Collections
  ]

  return (
    <>
      {/* Desktop layout (4 columns) */}
      <section className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-8 px-4 py-8 bg-white">
        {sectionEntries.map(([section, items]) => (
          <div key={section}>
            <h3 className="font-bold mb-2">{section}</h3>
            <ul className="space-y-2">
              {items.map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-sm text-gray-600 hover:text-black transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Mobile layout with synced 2-column rows */}
      <section className="sm:hidden bg-white px-4 py-8 space-y-6">
        {rows.map((pair, rowIndex) => (
          <div key={rowIndex} className="flex gap-4">
            {pair.map(([section, items]) => (
              <div key={section} className="w-1/2 flex flex-col border-b border-gray-200">
                <button
                  onClick={() => toggleSection(section)}
                  className={`w-full flex items-center justify-between px-2 py-3 text-left ${
                    expandedSections.includes(section) ? "bg-gray-100" : ""
                  }`}
                >
                  <span className="font-semibold text-sm">{section}</span>
                  {expandedSections.includes(section) ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    expandedSections.includes(section) ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <ul className="pl-3 pb-3 space-y-1">
                    {items.map((item, index) => (
                      <li key={index}>
                        <a
                          href="#"
                          className="block text-sm text-gray-600 hover:text-black transition-colors"
                        >
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        ))}
      </section>
    </>
  )
}
