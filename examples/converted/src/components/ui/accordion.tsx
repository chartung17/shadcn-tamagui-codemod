"use client"

import * as React from "react"
import { cn } from "cn"
import { html, styled, View } from "@tamagui/tailwind"
import { Accordion as AccordionPrimitive } from "tamagui/unstyled"
import { ChevronDownIcon, ChevronUpIcon } from "@/components/icons"
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
const StyledAccordion = tw(AccordionPrimitive)
const StyledAccordionItem = tw(AccordionPrimitive.Item)
const StyledAccordionHeader = tw(AccordionPrimitive.Header)
const StyledAccordionTrigger = twText(AccordionPrimitive.Trigger)
const StyledAccordionContent = twText(AccordionPrimitive.Content)

function Accordion({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive>) {
  return (
    <StyledAccordion
      data-slot="accordion"
      className={cn("flex w-full flex-col", className)}
      {...props}
    />
  )
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <StyledAccordionItem
      data-slot="accordion-item"
      className={cn("not-last:border-b! border-border", className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <StyledAccordionHeader className="flex flex-row">
      <StyledAccordionTrigger
        // TODO(native): `focus-visible:after:border-ring`: `::after` pseudo-elements do not exist on native, so this content is lost there.
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger relative flex flex-row flex-1 items-start justify-between rounded-md border border-transparent py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-(--ring)/50 focus-visible:ring-ring/50 focus-visible:after:border-(--ring) disabled:pointer-events-none disabled:opacity-50 **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-4 **:data-[slot=accordion-trigger-icon]:text-(--muted-foreground)",
          className
        )}
        {...props}
      >
        {children}
        <View
          asChild
          className="pointer-events-none shrink-0 group-aria-expanded/accordion-trigger:hidden!"
        >
          <ChevronDownIcon
            data-slot="accordion-trigger-icon"
            stroke={isWeb ? "currentColor" : undefined}
          />
        </View>
        <View
          asChild
          className="pointer-events-none hidden shrink-0 group-aria-expanded/accordion-trigger:inline!"
        >
          <ChevronUpIcon
            data-slot="accordion-trigger-icon"
            stroke={isWeb ? "currentColor" : undefined}
          />
        </View>
      </StyledAccordionTrigger>
    </StyledAccordionHeader>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <StyledAccordionContent
      data-slot="accordion-content"
      className="overflow-hidden text-sm data-[state=open]:animate-accordion-down! data-[state=closed]:animate-accordion-up!"
      {...props}
    >
      <html.div
        className={cn(
          "h-(--radix-accordion-content-height) pt-0 pb-4 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-(--foreground) [&_p:not(:last-child)]:mb-4",
          className
        )}
      >
        {children}
      </html.div>
    </StyledAccordionContent>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
