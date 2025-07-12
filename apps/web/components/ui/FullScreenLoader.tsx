"use client"

import React from "react"
import Image from "next/image"

export default function FullScreenLoader() {
  return (
    <div
      className="fixed inset-0 z-[9999] bg-white flex items-center justify-center"
      data-auto-id="loading-screen"
    >
      <div className="relative w-28 h-28 animate-pulse opacity-80 -translate-y-6">
        <Image
          src="/logo.png"
          alt="Loading"
          fill
          className="object-contain"
          priority
        />
      </div>
    </div>
  )
}
