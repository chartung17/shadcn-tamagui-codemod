"use client"

import * as React from "react"
import { cn } from "cn"
import { View, styled } from "@tamagui/tailwind"
import { Select as SelectPrimitive } from "tamagui/unstyled"
import { ChevronDownIcon, CheckIcon, ChevronUpIcon } from "@/components/icons"
import { isWeb } from "tamagui"

// Lets Tailwind classes (className) style a Tamagui UI primitive on web and native.
const tw = <C extends React.ComponentType<any>>(component: C) =>
  styled(component as never) as unknown as React.ComponentType<
    React.ComponentProps<C> & { className?: string }
  >
const StyledSelectGroup = tw(SelectPrimitive.Group)
const StyledSelectTrigger = tw(SelectPrimitive.Trigger)
const StyledSelectViewport = tw(SelectPrimitive.Viewport)
const StyledSelectLabel = tw(SelectPrimitive.Label)
const StyledSelectItem = tw(SelectPrimitive.Item)
const StyledSelectSeparator = tw(SelectPrimitive.Separator)
const StyledSelectScrollUpButton = tw(SelectPrimitive.ScrollUpButton)
const StyledSelectScrollDownButton = tw(SelectPrimitive.ScrollDownButton)

function Select({ ...props }: React.ComponentProps<typeof SelectPrimitive>) {
  return <SelectPrimitive data-slot="select" {...props} />
}

function SelectGroup({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return (
    <StyledSelectGroup
      data-slot="select-group"
      className={cn("scroll-my-1 p-1", className)}
      {...props}
    />
  )
}

function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />
}

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: Omit<React.ComponentProps<typeof SelectPrimitive.Trigger>, "size"> & {
  size?: "sm" | "default"
}) {
  return (
    <StyledSelectTrigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "flex flex-row w-fit items-center justify-between gap-1.5 rounded-md border border-input bg-transparent py-2 pr-2 pl-2.5 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-(--ring)/50 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-(--destructive)! aria-invalid:ring-3! aria-invalid:ring-(--destructive)/20! data-placeholder:text-(--muted-foreground)! data-[size=default]:h-9! data-[size=sm]:h-8! *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5 dark:bg-input/30 dark:hover:bg-input/50 in-[.t_dark]:aria-invalid:border-(--destructive)/50! in-[.t_dark]:aria-invalid:ring-(--destructive)/40! [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <View asChild className="pointer-events-none">
          <ChevronDownIcon size={16} color="muted-foreground" />
        </View>
      </SelectPrimitive.Icon>
    </StyledSelectTrigger>
  )
}

function SelectContent({
  className,
  children,
  position = "item-aligned",
  align = "center",
  ...props
}: Omit<
  React.ComponentProps<typeof SelectPrimitive.Content>,
  "position" | "align"
> & {
  className?: string
  position?: "item-aligned" | "popper"
  align?: "start" | "center" | "end"
}) {
  return (
    <SelectPrimitive.Content
      data-slot="select-content"
      data-align-trigger={position === "item-aligned"}
      {...props}
    >
      <SelectScrollUpButton />
      <StyledSelectViewport
        data-position={position}
        className={cn(
          "data-[position=popper]:h-(--radix-select-trigger-height)! data-[position=popper]:w-full! data-[position=popper]:min-w-(--radix-select-trigger-width)!",
          position === "popper" && "",
          "relative z-50 max-h-(--radix-select-content-available-height) min-w-36 origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md bg-popover text-popover-foreground shadow-md ring-1 ring-(--foreground)/10 ring-foreground/10 duration-100 data-[align-trigger=true]:animate-none! data-[side=bottom]:slide-in-from-top-2! data-[side=left]:slide-in-from-right-2! data-[side=right]:slide-in-from-left-2! data-[side=top]:slide-in-from-bottom-2! data-[state=open]:animate-in! data-[state=open]:fade-in-0! data-[state=open]:zoom-in-95! data-[state=closed]:animate-out! data-[state=closed]:fade-out-0! data-[state=closed]:zoom-out-95!",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1! data-[side=left]:-translate-x-1! data-[side=right]:translate-x-1! data-[side=top]:-translate-y-1!",
          className
        )}
      >
        {children}
      </StyledSelectViewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  )
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <StyledSelectLabel
      data-slot="select-label"
      className={cn("px-2 py-1.5 text-xs text-muted-foreground", className)}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <StyledSelectItem
      data-slot="select-item"
      className={cn(
        "relative flex flex-row w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-(--accent-foreground) data-disabled:pointer-events-none! data-disabled:opacity-50! [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      )}
      {...props}
    >
      <View className="pointer-events-none absolute right-2 flex flex-row size-4 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <View asChild className="pointer-events-none">
            <CheckIcon stroke={isWeb ? "currentColor" : undefined} />
          </View>
        </SelectPrimitive.ItemIndicator>
      </View>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </StyledSelectItem>
  )
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <StyledSelectSeparator
      data-slot="select-separator"
      className={cn("pointer-events-none -mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  )
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <StyledSelectScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        "z-10 flex flex-row cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <ChevronUpIcon stroke={isWeb ? "currentColor" : undefined} />
    </StyledSelectScrollUpButton>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <StyledSelectScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        "z-10 flex flex-row cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <ChevronDownIcon stroke={isWeb ? "currentColor" : undefined} />
    </StyledSelectScrollDownButton>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
