// components/ui/adidas-button.tsx

"use client"

import { useRouter } from "next/navigation"
import { Button, ButtonProps } from "@/components/ui/base-button" // ⬅️ đã có Button, thêm ButtonProps
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link" // ✅ Thêm dòng này

interface AdidasButtonProps extends ButtonProps { // ⬅️ Thêm kế thừa
  href: string
  children: React.ReactNode
  loading?: boolean
  shadow?: boolean
  fullWidth?: boolean // 👈 Thêm dòng này
  className?: string
}

export function AdidasButton({
  href,
  children,
  loading = false,
  shadow = false,
  fullWidth = false, 
  className,
  ...props // ⬅️ lấy phần còn lại, gồm variant, size, etc.
}: AdidasButtonProps) {
  const router = useRouter()

  return (
    <div className={cn("relative group", fullWidth ? "w-full" : "w-fit")}>
      {/* Shadow border layer */}
      {shadow && (
        <span
          className="absolute inset-0 translate-x-[6px] translate-y-[6px] border border-white group-hover:border-gray-400 pointer-events-none z-0 transition-colors"
          aria-hidden="true"
        />
      )}

      {/* Main button */}
      <Button
        asChild // ✅ Thêm dòng này để truyền <a> vào bên trong Button
        disabled={loading}
        variant="ghost"
        className={cn(
          "relative z-10 w-full inline-flex items-center justify-center px-4 h-12 bg-white text-black font-bold text-base uppercase tracking-wide border border-white rounded-none transition-all",
          className
        )}
        {...props} // ⬅️ truyền các prop còn lại
      >
        <Link href={href} onClick={e => loading && e.preventDefault()} className="w-full h-full flex items-center justify-center">
          {loading ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <span className="mr-2 -translate-y-[1px]">{children}</span>
          )}
          <span className="text-[22px] font-thin leading-none">⟶</span>
        </Link>
      </Button>
    </div>
  )
}
