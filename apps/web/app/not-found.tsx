"use client"

import { useEffect } from "react"
import Image from "next/image"

export default function NotFound() {
  useEffect(() => {
    // Vô hiệu hóa scroll khi mount
    document.body.style.overflow = "hidden"
    return () => {
      // Khôi phục lại scroll khi unmount
      document.body.style.overflow = ""
    }
  }, [])

  return (
    <div className="fixed inset-0 z-[1000] w-screen h-screen bg-black text-white overflow-hidden">
      {/* Background image mờ */}
      <Image
        src="/assets/not-found/download.png"
        alt="background"
        fill
        className="object-cover opacity-10"
        priority
      />

      {/* Nội dung trung tâm */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center px-6 text-center max-w-2xl mx-auto">
        <Image
          src="/assets/not-found/download (1).png"
          alt="logo"
          width={100}
          height={50}
          className="mb-8"
        />
        <p className="text-lg md:text-xl mb-4 font-medium">
          Sorry for slowing down your shopping experience.
          <br className="hidden md:inline" /> Our site is down for maintenance and we need a minute to walk it off.
        </p>
        <p className="text-lg md:text-xl font-semibold">
          We will be up and running shortly!
        </p>
      </div>
    </div>
  )
}
