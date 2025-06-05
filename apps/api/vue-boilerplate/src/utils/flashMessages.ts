"use client"

import { useToast } from "vue-toastification"

type ToastType = "success" | "error" | "warning" | "info"

let toast: any = null

const flashMessage = (type: ToastType, message: string) => {
  if (!toast) {
    toast = useToast()
  }
  switch (type) {
    case "success":
      toast.success(message)
      break
    case "error":
      toast.error(message)
      break
    case "warning":
      toast.warning(message)
      break
    case "info":
      toast.info(message)
      break
    default:
      toast.info(message)
  }
}

export default flashMessage
