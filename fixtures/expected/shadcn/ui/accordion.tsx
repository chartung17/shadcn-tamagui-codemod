"use client"

import * as React from "react"
import { cn } from "cn"
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react"
import { html, styled } from "@tamagui/tailwind"
import { Accordion as AccordionPrimitive } from "tamagui/unstyled"
// Lets Tailwind classes (className) style a Tamagui UI primitive on web and native.
const tw = <C extends React.ComponentType<any>>(component: C) =>
  styled(component as never) as unknown as React.ComponentType<
    React.ComponentProps<C> & { className?: string }
  >
const StyledAccordion = tw(AccordionPrimitive)
const StyledAccordionItem = tw(AccordionPrimitive.Item)
const StyledAccordionHeader = tw(AccordionPrimitive.Header)
const StyledAccordionTrigger = tw(AccordionPrimitive.Trigger)
const StyledAccordionContent = tw(AccordionPrimitive.Content)

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
      className={cn("not-last:border-b", className)}
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
    <StyledAccordionHeader className="flex">
      <StyledAccordionTrigger
        // TODO(native): `focus-visible:after:border-ring`: `::after` pseudo-elements do not exist on native, so this content is lost there.
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger relative flex flex-1 items-start justify-between rounded-md border border-transparent py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:after:border-ring disabled:pointer-events-none disabled:opacity-50 **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-4 **:data-[slot=accordion-trigger-icon]:text-muted-foreground",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon
          data-slot="accordion-trigger-icon"
          className="pointer-events-none shrink-0 group-aria-expanded/accordion-trigger:hidden"
        />
        <ChevronUpIcon
          data-slot="accordion-trigger-icon"
          className="pointer-events-none hidden shrink-0 group-aria-expanded/accordion-trigger:inline"
        />
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
      className="overflow-hidden text-sm data-open:animate-accordion-down data-closed:animate-accordion-up"
      {...props}
    >
      <html.div
        className={cn(
          "h-(--radix-accordion-content-height) pt-0 pb-4 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
          className
        )}
      >
        {children}
      </html.div>
    </StyledAccordionContent>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
