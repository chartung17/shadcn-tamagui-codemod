import * as React from "react"
import { cn } from "@/lib/utils"
import { html, styled } from "@tamagui/tailwind"
import { Tabs as TabsPrimitive } from "tamagui/unstyled"
// Lets Tailwind classes (className) style a Tamagui UI primitive on web and native.
const tw = <C extends React.ComponentType<any>>(component: C) =>
  styled(component as never) as unknown as React.ComponentType<
    React.ComponentProps<C> & { className?: string }
  >
const StyledTabs = tw(TabsPrimitive)
const StyledTabsList = tw(TabsPrimitive.List)

// Classes Tamagui leaves to Tailwind on web: shadcn custom variants, dark:,
// theme colors and state variants; ring-* colors keep their native form.
export function Toggle({
  className,
  ...props
}: React.ComponentProps<typeof html.button>) {
  return (
    <html.button
      className={cn(
        "flex items-center rounded-md border border-border ring-1 ring-(--ring)/50 ring-ring/50 data-[state=checked]:bg-(--primary)! aria-invalid:border-(--destructive)! in-[.t_dark]:data-[state=open]:bg-(--accent)/50! [&_svg]:size-4",
        className
      )}
      {...props}
    />
  )
}

// `flex` on a Tamagui view gets flex-row; a direction behind data-horizontal:
// counts as the default (horizontal) and gets a native: copy.
export function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive>) {
  return (
    <StyledTabs
      className={cn(
        "flex gap-2 data-[orientation=horizontal]:flex-col! native:flex-col",
        className
      )}
      {...props}
    />
  )
}

export function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <StyledTabsList
      className={cn(
        "flex flex-row items-center not-last:border-b! border-border group-data-[orientation=vertical]/tabs:flex-col!",
        className
      )}
      {...props}
    />
  )
}
