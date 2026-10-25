import { cn } from "@/lib/utils"

export function Static() {
  return (
    <div className={cn("flex items-center", "gap-2")}>
      <span className={cn("text-sm")}>Static</span>
    </div>
  )
}

export function Conditional({ active, className }: { active: boolean; className?: string }) {
  return <div className={cn("p-2", active && "bg-accent", className)} />
}
