import * as React from "react"
// TODO(native): `import { Root as CheckboxRoot } from "@radix-ui/react-checkbox"`: Only namespace imports (`import * as X from "@radix-ui/react-..."`) of Radix packages are converted.
import { Root as CheckboxRoot } from "@radix-ui/react-checkbox"
// TODO(native): `HoverCard (HoverCardPrimitive)`: There is no Tamagui mapping for Radix `HoverCard` yet, so it stays on Radix, which is web-only.
import { HoverCard as HoverCardPrimitive } from "radix-ui"
import {
  Dialog as DialogPrimitive,
  Switch as SwitchPrimitive,
} from "tamagui/unstyled"
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
const StyledDialogOverlay = tw(DialogPrimitive.Overlay)
const StyledDialogContent = tw(DialogPrimitive.Content)
const StyledDialogTitle = tw(DialogPrimitive.Title)
const StyledDialogClose = twText(DialogPrimitive.Close)

export function Confirm({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  return (
    <DialogPrimitive open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <StyledDialogOverlay className="fixed inset-0 bg-black/50" />
        <StyledDialogContent className="fixed top-1/2 left-1/2 rounded-lg bg-background p-6">
          <StyledDialogTitle className="text-lg font-semibold">
            Are you sure?
          </StyledDialogTitle>
          <StyledDialogClose>Cancel</StyledDialogClose>
        </StyledDialogContent>
      </DialogPrimitive.Portal>
    </DialogPrimitive>
  )
}

export function Setting(props: React.ComponentProps<typeof SwitchPrimitive>) {
  return (
    <SwitchPrimitive {...props}>
      <SwitchPrimitive.Thumb />
    </SwitchPrimitive>
  )
}

export function Card() {
  return (
    <HoverCardPrimitive.Root>
      <HoverCardPrimitive.Trigger>Hover</HoverCardPrimitive.Trigger>
    </HoverCardPrimitive.Root>
  )
}

export { CheckboxRoot }
