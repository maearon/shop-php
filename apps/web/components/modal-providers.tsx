"use client"

import LocationModal from "./location-modal"
import FeedbackModal from "./feedback-modal"
import { useLocationModal } from "@/hooks/useLocationModal"
import { useFeedbackModal } from "@/hooks/useFeedbackModal"

export function LocationModalProvider() {
  const { isOpen, closeModal, selectLocation } = useLocationModal()

  return <LocationModal isOpen={isOpen} onClose={closeModal} onLocationSelect={selectLocation} />
}

export function FeedbackModalProvider() {
  const { isOpen, closeModal } = useFeedbackModal()

  return <FeedbackModal isOpen={isOpen} onClose={closeModal} />
}
