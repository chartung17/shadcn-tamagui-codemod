import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import * as SwitchPrimitive from "@radix-ui/react-switch"
import { Root as CheckboxRoot } from "@radix-ui/react-checkbox"
import { HoverCard as HoverCardPrimitive } from "radix-ui"
import { cn } from "@/lib/utils"

export function Confirm({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 bg-black/50" />
        <DialogPrimitive.Content
          className={cn("fixed top-1/2 left-1/2 rounded-lg bg-background p-6")}
          onOpenAutoFocus={(event) => event.preventDefault()}
        >
          <DialogPrimitive.Title className="text-lg font-semibold">Are you sure?</DialogPrimitive.Title>
          <DialogPrimitive.Close>Cancel</DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}

export function Setting(props: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root {...props}>
      <SwitchPrimitive.Thumb />
    </SwitchPrimitive.Root>
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
