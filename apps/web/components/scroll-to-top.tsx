"use client"

import { ChevronUp } from "lucide-react"
import { useEffect, useState } from "react"

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      // Show after user scrolls 400 px
      setVisible(window.scrollY > 400)
    }

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
    setVisible(false)
  }

  return (
    <button
      aria-label="Scroll back to top"
      onClick={scrollToTop}
      className={`flex fixed bottom-6 left-1/2 -translate-x-1/2 z-50 
        h-12 w-12 items-center justify-center rounded-sm bg-black text-white shadow-lg 
        transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
    >
      <ChevronUp className="h-5 w-5 mx-auto my-auto" />
    </button>
  )
}
