"use client"

import * as React from "react"
import { cn } from "cn"
import { Separator as SeparatorPrimitive } from "tamagui/unstyled"
import { styled } from "@tamagui/tailwind"
// Lets Tailwind classes (className) style a Tamagui UI primitive on web and native.
const tw = <C extends React.ComponentType<any>>(component: C) =>
  styled(component as never) as unknown as React.ComponentType<
    React.ComponentProps<C>
  >
const StyledSeparator = tw(SeparatorPrimitive)

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive> & {
  orientation?: "horizontal" | "vertical"
  decorative?: boolean
}) {
  return (
    <StyledSeparator
      data-slot="separator"
      data-orientation={orientation}
      vertical={orientation === "vertical"}
      className={cn(
        "shrink-0 bg-border data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch",
        className
      )}
      {...props}
    />
  )
}

export { Separator }
