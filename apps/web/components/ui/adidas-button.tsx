import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function AdidasButton({ href, children }: { href: string; children: React.ReactNode }) {
  const router = useRouter()

  return (
    <div className="relative inline-block group">
      {/* Bóng viền trắng lệch phải dưới */}
      <span
        className="absolute inset-0 translate-x-[6px] translate-y-[6px] border border-white group-hover:border-gray-400 pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Nút chính */}
      <Button
        onClick={() => router.push(href)}
        variant="ghost"
        className="relative z-10 inline-flex items-center justify-center px-3 h-12 bg-white text-black font-bold text-base uppercase tracking-wide
          border border-white rounded-none"
      >
        <span className="mr-2">{children}</span>
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4 15.3536H26.2929L22.6464 11.7072L23.3536 11L28.2071 15.8536L23.3536 20.7072L22.6464 20L26.2929 16.3536H4V15.3536Z"
            fill="black"
          />
        </svg>
      </Button>
    </div>
  )
}
