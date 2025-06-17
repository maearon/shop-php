// app/components/ui/FullScreenLoader.tsx
// "use client"

// import React from "react"
// import Image from "next/image"

// const FullScreenLoader = () => {
//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center bg-white"
//       data-auto-id="loading-screen"
//     >
//       <div className="opacity-10 animate-pulse">
//         <Image
//           src="/adidas-logo.svg" // 👈 bạn phải đặt logo 3 sọc ở public/adidas-logo.svg
//           alt="Loading"
//           width={80}
//           height={80}
//           priority
//         />
//       </div>
//     </div>
//   )
// }

// export default FullScreenLoader
"use client"

import React from "react"

export default function FullScreenLoader() {
  return (
    <div className="fixed inset-0 z-50 bg-white flex items-center justify-center">
      <div className="relative w-20 h-20 animate-pulse opacity-70">
        <div className="absolute top-0 left-0 w-3 h-full bg-black transform rotate-12 origin-bottom-left"></div>
        <div className="absolute top-0 left-4 w-3 h-full bg-black transform rotate-12 origin-bottom-left"></div>
        <div className="absolute top-0 left-8 w-3 h-full bg-black transform rotate-12 origin-bottom-left"></div>
      </div>
    </div>
  )
}
