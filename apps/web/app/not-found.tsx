"use client"

import Image from "next/image"

export default function NotFound() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black text-white">
      {/* Optional Background image */}
      <Image
        src="/assets/not-found/download.png"
        alt="background"
        fill
        className="object-cover opacity-10"
        priority
      />

      {/* Overlay content */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-start p-10 max-w-xl">
        <Image
          src="/assets/not-found/download (1).png"
          alt="logo"
          width={100}
          height={50}
          className="mb-6"
        />
        <p className="text-xl mb-4 font-medium">
          Sorry for slowing down your shopping experience. Our site is down for maintenance and we
          need a minute to walk it off.
        </p>
        <p className="text-xl font-semibold">
          We will be up and running shortly!
        </p>
      </div>
    </div>
  )
}
