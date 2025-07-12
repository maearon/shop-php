// hooks/useLockBodyScroll.ts
import { useEffect } from "react"

export function useScrollLock(lock: boolean) {
  useEffect(() => {
    // Check an toàn khi chạy SSR
    if (typeof window === "undefined") return

    const originalOverflow = document.body.style.overflow
    const originalPaddingRight = document.body.style.paddingRight

    if (lock) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth
      document.body.style.overflow = "hidden"
      document.body.style.paddingRight = `${scrollBarWidth}px`
    } else {
      document.body.style.overflow = originalOverflow
      document.body.style.paddingRight = originalPaddingRight
    }

    return () => {
      document.body.style.overflow = originalOverflow
      document.body.style.paddingRight = originalPaddingRight
    }
  }, [lock])
}