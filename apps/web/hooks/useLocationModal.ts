"use client"

import { useState, useEffect } from "react"

export function useLocationModal() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Check if user has already selected a location
    const savedLocation = localStorage.getItem("delivery-location")
    const hasSeenModal = localStorage.getItem("location-modal-seen")

    if (!savedLocation && !hasSeenModal) {
      // Show modal after a short delay
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [])

  const closeModal = () => {
    setIsOpen(false)
    localStorage.setItem("location-modal-seen", "true")
  }

  const selectLocation = (location: string) => {
    localStorage.setItem("delivery-location", location)
    localStorage.setItem("location-modal-seen", "true")
    setIsOpen(false)
  }

  return {
    isOpen,
    closeModal,
    selectLocation,
  }
}
