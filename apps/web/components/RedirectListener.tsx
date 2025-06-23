"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function RedirectListener() {
  const router = useRouter()

  useEffect(() => {
    const handler = () => {
      router.push("/account-login")
    }

    window.addEventListener("customRedirectToLogin", handler)
    return () => {
      window.removeEventListener("customRedirectToLogin", handler)
    }
  }, [router])

  return null
}
