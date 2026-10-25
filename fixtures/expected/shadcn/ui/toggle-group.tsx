"use client"

import * as React from "react"
import { type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { toggleVariants } from "@/components/ui/toggle"
import { ToggleGroup as ToggleGroupPrimitive } from "tamagui/unstyled"
import { styled, html } from "@tamagui/tailwind"
// Lets Tailwind classes (className) style a Tamagui UI primitive on web and native.
const tw = <C extends React.ComponentType<any>>(component: C) =>
  styled(component as never) as unknown as React.ComponentType<
    React.ComponentProps<C> & { className?: string }
  >
// Native views cannot render raw text: wraps string children in html.span,
// with the part's text classes applied to it on native.
const twText = <C extends React.ComponentType<any>>(component: C) => {
  const Styled = tw(component) as React.ComponentType<any>
  return ({
    className,
    children,
    ...props
  }: React.ComponentProps<C> & {
    className?: string
    children?: React.ReactNode
  }) => {
    const textClasses = className
      ?.split(/\s+/)
      .filter((c: string) =>
        /^(?:text|font|leading|tracking)-|^(?:italic|underline|line-through|uppercase|lowercase|capitalize)$/.test(
          c
        )
      )
      .map((c: string) => `native:${c}`)
      .join(" ")
    const wrap = (child: React.ReactNode) =>
      typeof child === "string" || typeof child === "number" ? (
        <html.span className={textClasses}>{child}</html.span>
      ) : (
        child
      )
    return (
      <Styled className={className} {...props}>
        {Array.isArray(children)
          ? React.Children.map(children, wrap)
          : wrap(children)}
      </Styled>
    )
  }
}
const StyledToggleGroup = tw(ToggleGroupPrimitive)
const StyledToggleGroupItem = twText(ToggleGroupPrimitive.Item)

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants> & {
    spacing?: number
    orientation?: "horizontal" | "vertical"
  }
>({
  size: "default",
  variant: "default",
  spacing: 2,
  orientation: "horizontal",
})

function ToggleGroup({
  className,
  variant,
  size,
  spacing = 2,
  orientation = "horizontal",
  children,
  ...props
}: Omit<
  React.ComponentProps<typeof ToggleGroupPrimitive>,
  "spacing" | "orientation"
> &
  VariantProps<typeof toggleVariants> & {
    spacing?: number
    orientation?: "horizontal" | "vertical"
  }) {
  return (
    <StyledToggleGroup
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      data-spacing={spacing}
      data-orientation={orientation}
      style={{ "--gap": spacing } as React.CSSProperties}
      className={cn(
        "group/toggle-group flex w-fit flex-row items-center gap-[--spacing(var(--gap))] rounded-md data-[spacing=0]:data-[variant=outline]:shadow-xs! data-[orientation=vertical]:flex-col! data-[orientation=vertical]:items-stretch!",
        className
      )}
      {...props}
    >
      <ToggleGroupContext.Provider
        value={{ variant, size, spacing, orientation }}
      >
        {children}
      </ToggleGroupContext.Provider>
    </StyledToggleGroup>
  )
}

function ToggleGroupItem({
  className,
  children,
  variant = "default",
  size = "default",
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item> &
  VariantProps<typeof toggleVariants>) {
  const context = React.useContext(ToggleGroupContext)

  return (
    <StyledToggleGroupItem
      data-slot="toggle-group-item"
      data-variant={context.variant || variant}
      data-size={context.size || size}
      data-spacing={context.spacing}
      className={cn(
        "shrink-0 group-data-[spacing=0]/toggle-group:rounded-none! group-data-[spacing=0]/toggle-group:px-2! group-data-[spacing=0]/toggle-group:shadow-none! focus:z-10 focus-visible:z-10 group-data-[spacing=0]/toggle-group:has-data-[icon=inline-end]:pr-1.5! group-data-[spacing=0]/toggle-group:has-data-[icon=inline-start]:pl-1.5! group-data-[orientation=horizontal]/toggle-group:data-[spacing=0]:first:rounded-l-md! group-data-[orientation=vertical]/toggle-group:data-[spacing=0]:first:rounded-t-md! group-data-[orientation=horizontal]/toggle-group:data-[spacing=0]:last:rounded-r-md! group-data-[orientation=vertical]/toggle-group:data-[spacing=0]:last:rounded-b-md! data-[state=on]:bg-(--muted)! group-data-[orientation=horizontal]/toggle-group:data-[spacing=0]:data-[variant=outline]:border-l-0! group-data-[orientation=vertical]/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0! group-data-[orientation=horizontal]/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-l! border-border group-data-[orientation=vertical]/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t!",
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        className
      )}
      {...props}
    >
      {children}
    </StyledToggleGroupItem>
  )
}

export { ToggleGroup, ToggleGroupItem }
