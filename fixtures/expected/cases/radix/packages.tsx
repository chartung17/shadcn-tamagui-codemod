import * as React from "react"
// TODO(native): `import { Root as CheckboxRoot } from "@radix-ui/react-checkbox"`: Only namespace imports (`import * as X from "@radix-ui/react-..."`) of Radix packages are converted.
import { Root as CheckboxRoot } from "@radix-ui/react-checkbox"
// TODO(native): `HoverCard (HoverCardPrimitive)`: There is no Tamagui mapping for Radix `HoverCard` yet, so it stays on Radix, which is web-only.
import { HoverCard as HoverCardPrimitive } from "radix-ui"
import {
  Dialog as DialogPrimitive,
  Switch as SwitchPrimitive,
} from "tamagui/unstyled"
import { styled } from "@tamagui/tailwind"
// Lets Tailwind classes (className) style a Tamagui UI primitive on web and native.
const tw = <C extends React.ComponentType<any>>(component: C) =>
  styled(component as never) as unknown as React.ComponentType<
    React.ComponentProps<C>
  >
const StyledDialogOverlay = tw(DialogPrimitive.Overlay)
const StyledDialogContent = tw(DialogPrimitive.Content)
const StyledDialogTitle = tw(DialogPrimitive.Title)

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
          <DialogPrimitive.Close>Cancel</DialogPrimitive.Close>
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
