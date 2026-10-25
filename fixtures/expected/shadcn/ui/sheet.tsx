"use client"

import * as React from "react"
import { cn } from "cn"
import { Button } from "@/components/ui/button"
import { html, styled } from "@tamagui/tailwind"
import { Dialog as SheetPrimitive } from "tamagui/unstyled"
import { XIcon } from "@/components/icons"
import { isWeb } from "tamagui"

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
const StyledSheetTrigger = twText(SheetPrimitive.Trigger)
const StyledSheetClose = twText(SheetPrimitive.Close)
const StyledSheetOverlay = tw(SheetPrimitive.Overlay)
const StyledSheetContent = tw(SheetPrimitive.Content)
const StyledSheetTitle = tw(SheetPrimitive.Title)
const StyledSheetDescription = tw(SheetPrimitive.Description)

function Sheet({ ...props }: React.ComponentProps<typeof SheetPrimitive>) {
  return <SheetPrimitive data-slot="sheet" {...props} />
}

function SheetTrigger({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <StyledSheetTrigger data-slot="sheet-trigger" {...props} />
}

function SheetClose({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Close>) {
  return <StyledSheetClose data-slot="sheet-close" {...props} />
}

function SheetPortal({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Portal>) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />
}

function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <StyledSheetOverlay
      data-slot="sheet-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs! data-[state=open]:animate-in! data-[state=open]:fade-in-0! data-[state=closed]:animate-out! data-[state=closed]:fade-out-0!",
        className
      )}
      {...props}
    />
  )
}

function SheetContent({
  className,
  children,
  side = "right",
  showCloseButton = true,
  ...props
}: Omit<
  React.ComponentProps<typeof SheetPrimitive.Content>,
  "side" | "showCloseButton"
> & {
  side?: "top" | "right" | "bottom" | "left"
  showCloseButton?: boolean
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <StyledSheetContent
        data-slot="sheet-content"
        data-side={side}
        className={cn(
          "fixed z-50 flex flex-col gap-4 bg-popover bg-clip-padding text-sm text-popover-foreground shadow-lg transition duration-200 ease-in-out data-[side=bottom]:inset-x-0! data-[side=bottom]:bottom-0! data-[side=bottom]:h-auto! data-[side=bottom]:border-t! border-border data-[side=left]:inset-y-0! data-[side=left]:left-0! data-[side=left]:h-full! data-[side=left]:w-3/4! data-[side=left]:border-r! data-[side=right]:inset-y-0! data-[side=right]:right-0! data-[side=right]:h-full! data-[side=right]:w-3/4! data-[side=right]:border-l! data-[side=top]:inset-x-0! data-[side=top]:top-0! data-[side=top]:h-auto! data-[side=top]:border-b! data-[side=left]:sm:max-w-sm! data-[side=right]:sm:max-w-sm! data-[state=open]:animate-in! data-[state=open]:fade-in-0! data-[side=bottom]:data-[state=open]:slide-in-from-bottom-10! data-[side=left]:data-[state=open]:slide-in-from-left-10! data-[side=right]:data-[state=open]:slide-in-from-right-10! data-[side=top]:data-[state=open]:slide-in-from-top-10! data-[state=closed]:animate-out! data-[state=closed]:fade-out-0! data-[side=bottom]:data-[state=closed]:slide-out-to-bottom-10! data-[side=left]:data-[state=closed]:slide-out-to-left-10! data-[side=right]:data-[state=closed]:slide-out-to-right-10! data-[side=top]:data-[state=closed]:slide-out-to-top-10!",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <StyledSheetClose data-slot="sheet-close" asChild>
            <Button
              variant="ghost"
              className="absolute top-4 right-4"
              size="icon-sm"
            >
              <XIcon stroke={isWeb ? "currentColor" : undefined} />
              <html.span className="sr-only">Close</html.span>
            </Button>
          </StyledSheetClose>
        )}
      </StyledSheetContent>
    </SheetPortal>
  )
}

function SheetHeader({
  className,
  ...props
}: React.ComponentProps<typeof html.div>) {
  return (
    <html.div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-1.5 p-4", className)}
      {...props}
    />
  )
}

function SheetFooter({
  className,
  ...props
}: React.ComponentProps<typeof html.div>) {
  return (
    <html.div
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  )
}

function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <StyledSheetTitle
      data-slot="sheet-title"
      className={cn(
        "text-sm font-heading font-medium text-foreground",
        className
      )}
      {...props}
    />
  )
}

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <StyledSheetDescription
      data-slot="sheet-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
