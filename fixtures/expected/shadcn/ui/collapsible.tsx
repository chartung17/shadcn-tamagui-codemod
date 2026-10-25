import { Collapsible as CollapsiblePrimitive } from "tamagui/unstyled"
import { styled, html } from "@tamagui/tailwind"
import type { ComponentType, ComponentProps, ReactNode } from "react"
import { Children } from "react"
// Lets Tailwind classes (className) style a Tamagui UI primitive on web and native.
const tw = <C extends ComponentType<any>>(component: C) =>
  styled(component as never) as unknown as ComponentType<
    ComponentProps<C> & { className?: string }
  >
// Native views cannot render raw text: wraps string children in html.span,
// with the part's text classes applied to it on native.
const twText = <C extends ComponentType<any>>(component: C) => {
  const Styled = tw(component) as ComponentType<any>
  return ({
    className,
    children,
    ...props
  }: ComponentProps<C> & { className?: string; children?: ReactNode }) => {
    const textClasses = className
      ?.split(/\s+/)
      .filter((c: string) =>
        /^(?:text|font|leading|tracking)-|^(?:italic|underline|line-through|uppercase|lowercase|capitalize)$/.test(
          c
        )
      )
      .map((c: string) => `native:${c}`)
      .join(" ")
    const wrap = (child: ReactNode) =>
      typeof child === "string" || typeof child === "number" ? (
        <html.span className={textClasses}>{child}</html.span>
      ) : (
        child
      )
    return (
      <Styled className={className} {...props}>
        {Array.isArray(children)
          ? Children.map(children, wrap)
          : wrap(children)}
      </Styled>
    )
  }
}
const StyledCollapsibleTrigger = twText(CollapsiblePrimitive.Trigger)
const StyledCollapsibleContent = twText(CollapsiblePrimitive.Content)

function Collapsible({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive>) {
  return <CollapsiblePrimitive data-slot="collapsible" {...props} />
}

function CollapsibleTrigger({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Trigger>) {
  return <StyledCollapsibleTrigger data-slot="collapsible-trigger" {...props} />
}

function CollapsibleContent({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Content>) {
  return <StyledCollapsibleContent data-slot="collapsible-content" {...props} />
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
