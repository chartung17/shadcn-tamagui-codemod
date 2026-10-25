import { cva } from "class-variance-authority"
import { Tabs as TabsPrimitive } from "radix-ui"
import { cn } from "cn"

// Exported: other modules may call it for class strings.
export const chipVariants = cva("rounded-full px-2", {
  variants: { tone: { muted: "bg-muted", brand: "bg-primary" } },
})

// compoundVariants have no styled() equivalent.
const boxVariants = cva("p-2", {
  variants: { size: { sm: "p-1", lg: "p-4" }, tone: { muted: "bg-muted" } },
  compoundVariants: [{ size: "lg", tone: "muted", class: "border" }],
})

// Styles a Radix primitive, not an html.* element.
const listVariants = cva("inline-flex items-center", {
  variants: { variant: { line: "gap-1" } },
})

// Pseudo-element content cannot be converted.
const markVariants = cva("relative after:absolute after:inset-0", {
  variants: { on: { true: "after:bg-primary" } },
})

export function Box({ size }: { size: "sm" | "lg" }) {
  return (
    <div className={cn(boxVariants({ size, tone: "muted" }))}>
      <TabsPrimitive.List className={cn(listVariants({ variant: "line" }))} />
      <span className={markVariants({ on: true })} />
    </div>
  )
}
