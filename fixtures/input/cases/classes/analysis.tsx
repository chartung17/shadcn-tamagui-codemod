import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const chip = cva("inline-flex items-center rounded-full px-2 text-xs", {
  variants: {
    tone: {
      neutral: "bg-muted text-muted-foreground",
      brand: "bg-primary text-primary-foreground hover:bg-primary/90",
    },
  },
  defaultVariants: { tone: "neutral" },
})

export function Example({
  active,
  color,
  variant,
}: {
  active: boolean
  color: string
  variant: "solid" | "outline"
}) {
  return (
    <div
      className={cn(
        "grid gap-4 p-4 md:grid-cols-2",
        active && "ring-2 ring-ring",
        variant === "outline" ? "border border-input" : "bg-secondary",
        { "opacity-50": !active }
      )}
    >
      <span className="relative before:absolute before:inset-0 before:bg-black/10">
        Pseudo-element decoration
      </span>
      <p className={`text-sm text-${color}-500`}>Interpolated</p>
      <p className="data-[state=open]:font-bold aria-invalid:text-destructive">
        Selector variants
      </p>
      <input className="placeholder:text-muted-foreground w-38 my-custom-class" />
      <span className={chip({ tone: "brand" })}>Chip</span>
    </div>
  )
}
