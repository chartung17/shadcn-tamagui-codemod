import * as React from "react"
import { cn } from "cn"
import { html, styled } from "@tamagui/tailwind"
import { Popover as PopoverPrimitive } from "tamagui/unstyled"
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
const StyledPopoverContent = twText(PopoverPrimitive.Content)

function Popover({ ...props }: React.ComponentProps<typeof PopoverPrimitive>) {
  return <PopoverPrimitive data-slot="popover" {...props} />
}

function PopoverTrigger({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
}

function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: Omit<
  React.ComponentProps<typeof PopoverPrimitive.Content>,
  "align" | "sideOffset"
> & { align?: "start" | "center" | "end"; sideOffset?: number }) {
  return (
    <StyledPopoverContent
      data-slot="popover-content"
      className={cn(
        "z-50 flex w-72 origin-(--radix-popover-content-transform-origin) flex-col gap-4 rounded-md bg-popover p-4 text-sm text-popover-foreground shadow-md ring-1 ring-(--foreground)/10 ring-foreground/10 outline-hidden duration-100 data-[side=bottom]:slide-in-from-top-2! data-[side=left]:slide-in-from-right-2! data-[side=right]:slide-in-from-left-2! data-[side=top]:slide-in-from-bottom-2! data-[state=open]:animate-in! data-[state=open]:fade-in-0! data-[state=open]:zoom-in-95! data-[state=closed]:animate-out! data-[state=closed]:fade-out-0! data-[state=closed]:zoom-out-95!",
        className
      )}
      {...props}
    />
  )
}

function PopoverAnchor({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />
}

function PopoverHeader({
  className,
  ...props
}: React.ComponentProps<typeof html.div>) {
  return (
    <html.div
      data-slot="popover-header"
      className={cn("flex flex-col gap-1 text-sm", className)}
      {...props}
    />
  )
}

function PopoverTitle({
  className,
  ...props
}: React.ComponentProps<typeof html.h2>) {
  return (
    <html.div
      data-slot="popover-title"
      className={cn("font-medium", className)}
      {...props}
    />
  )
}

function PopoverDescription({
  className,
  ...props
}: React.ComponentProps<typeof html.p>) {
  return (
    <html.p
      data-slot="popover-description"
      className={cn("text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
}
