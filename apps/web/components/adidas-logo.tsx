"use client"

import Image from "next/image"

export default function AdidasLogo() {
  return (
    <Image
      src="/logo.png"
      alt="Adidas logo"
      width={80}
      height={80}
      priority
    />
  )
}
