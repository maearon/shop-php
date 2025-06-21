"use client"

import { X } from "lucide-react"

interface MobileAppBannerProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileAppBanner({ isOpen, onClose }: MobileAppBannerProps) {
  if (!isOpen) return null

  return (
    <div className="md:hidden bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <button onClick={onClose} className="p-1">
          <X className="h-5 w-5 text-gray-500" />
        </button>

        <div className="flex items-center space-x-3 flex-1 mx-4">
          {/* App Icon */}
          <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white">
              <path d="M12.01 2.011c-5.52 0-9.99 4.47-9.99 9.99s4.47 9.99 9.99 9.99 9.99-4.47 9.99-9.99-4.47-9.99-9.99-9.99zm4.99 16.49c-.39.39-1.02.39-1.41 0L12 15.01l-3.59 3.59c-.39.39-1.02.39-1.41 0-.39-.39-.39-1.02 0-1.41L10.59 13.6 7 10.01c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0L12 12.19l3.59-3.59c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41L13.41 13.6l3.59 3.59c.39.39.39 1.02 0 1.41z" />
            </svg>
          </div>

          {/* App Info */}
          <div className="flex-1">
            <div className="font-semibold text-sm">ADIDAS - SPORTS & STYLE</div>
            <div className="flex items-center space-x-1 text-xs text-gray-600">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">
                    ★
                  </span>
                ))}
              </div>
              <span>548.7K</span>
            </div>
          </div>
        </div>

        {/* Download Button */}
        <button className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">DOWNLOAD</button>
      </div>
    </div>
  )
}
