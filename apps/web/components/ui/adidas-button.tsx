import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function AdidasButton({ href, children }: { href: string; children: React.ReactNode }) {
  const router = useRouter()

  return (
    <div className="relative inline-block group">
      {/* White border shadow right side hover gray */}
      <span
        className="absolute inset-0 translate-x-[6px] translate-y-[6px] border border-white group-hover:border-gray-400 pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Main Button */}
      <Button
        onClick={() => router.push(href)}
        variant="ghost"
        className="relative z-10 inline-flex items-center justify-center px-3 h-13 bg-white text-black font-bold text-base uppercase tracking-wide
          border border-white rounded-none"
      >
        <span className="mr-2 -translate-y-[1px]">{children}</span>
        <span className="text-[22px] font-thin leading-none">⟶</span>
      </Button>
    </div>
  )
}
