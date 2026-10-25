"use client"

import * as React from "react"
import { cn } from "cn"
import { Tooltip as TooltipPrimitive, TooltipGroup } from "tamagui/unstyled"
import { styled } from "@tamagui/tailwind"
// Lets Tailwind classes (className) style a Tamagui UI primitive on web and native.
const tw = <C extends React.ComponentType<any>>(component: C) =>
  styled(component as never) as unknown as React.ComponentType<
    React.ComponentProps<C>
  >
const StyledTooltipContent = tw(TooltipPrimitive.Content)
const StyledTooltipArrow = tw(TooltipPrimitive.Arrow)

function TooltipProvider({
  delayDuration = 0,
  ...props
}: Omit<React.ComponentProps<typeof TooltipGroup>, "delay"> & {
  delayDuration?: number
}) {
  return (
    <TooltipGroup
      data-slot="tooltip-provider"
      delay={delayDuration}
      {...props}
    />
  )
}

function Tooltip({ ...props }: React.ComponentProps<typeof TooltipPrimitive>) {
  return <TooltipPrimitive data-slot="tooltip" {...props} />
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content> & {
  sideOffset?: number
}) {
  return (
    <StyledTooltipContent
      data-slot="tooltip-content"
      className={cn(
        "z-50 inline-flex flex-row w-fit max-w-xs origin-(--radix-tooltip-content-transform-origin) items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-xs text-background has-data-[slot=kbd]:pr-1.5 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 **:data-[slot=kbd]:relative **:data-[slot=kbd]:isolate **:data-[slot=kbd]:z-50 **:data-[slot=kbd]:rounded-sm data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
        className
      )}
      {...props}
    >
      {children}
      <StyledTooltipArrow className="z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px] bg-foreground fill-foreground" />
    </StyledTooltipContent>
  )
}

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger }
