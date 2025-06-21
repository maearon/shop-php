"use client"

import { ChevronUp } from "lucide-react"
import { useEffect, useState } from "react"

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      // show after user scrolls 400 px
      setVisible(window.scrollY > 400)
    }

    // throttle with requestAnimationFrame for perf
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          onScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
    // hide immediately so it disappears while we scroll up
    setVisible(false)
  }

  return (
    <button
      aria-label="Scroll back to top"
      onClick={scrollToTop}
      className={`fixed bottom-8 right-4 md:bottom-10 md:right-8 z-50 flex h-12 w-12 items-center justify-center 
        rounded-sm bg-black text-white shadow-lg transition-opacity duration-300
        ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
    >
      <ChevronUp className="h-5 w-5" />
    </button>
  )
}
