import { cva } from "class-variance-authority"
import { cn } from "cn"
import { html, styled } from "@tamagui/tailwind"
import { Tabs as TabsPrimitive } from "tamagui/unstyled"
import type { ComponentType, ComponentProps, ReactNode } from "react"
import { Children } from "react"
// Lets Tailwind classes (className) style a Tamagui UI primitive on web and native.
const tw = <C extends ComponentType<any>>(component: C) =>
  styled(component as never) as unknown as ComponentType<
    ComponentProps<C> & { className?: string }
  >
const StyledTabsList = tw(TabsPrimitive.List)

// Exported: other modules may call it for class strings.
export const chipVariants = cva("rounded-full px-2", {
  variants: { tone: { muted: "bg-muted", brand: "bg-primary" } },
})

// compoundVariants have no styled() equivalent.
const boxVariants = cva("p-2", {
  variants: { size: { sm: "p-1", lg: "p-4" }, tone: { muted: "bg-muted" } },
  compoundVariants: [
    { size: "lg", tone: "muted", class: "border border-border" },
  ],
})

// Styles a Radix primitive, not an html.* element.
const listVariants = cva("inline-flex flex-row items-center", {
  variants: { variant: { line: "gap-1" } },
})

// Pseudo-element content cannot be converted.
// TODO(native): `after:absolute after:inset-0`: `::after` pseudo-elements do not exist on native, so this content is lost there.
const markVariants = cva("relative after:absolute after:inset-0", {
  variants: {
    on: {
      // TODO(native): `after:bg-primary`: `::after` pseudo-elements do not exist on native, so this content is lost there.
      true: "after:bg-(--primary)",
    },
  },
})

export function Box({ size }: { size: "sm" | "lg" }) {
  return (
    <html.div className={cn(boxVariants({ size, tone: "muted" }))}>
      <StyledTabsList className={cn(listVariants({ variant: "line" }))} />
      <html.span className={markVariants({ on: true })} />
    </html.div>
  )
}
