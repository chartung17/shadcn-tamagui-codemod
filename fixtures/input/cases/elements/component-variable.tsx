import * as React from "react"
import { Slot } from "radix-ui"

function Pill({
  asChild = false,
  className,
  ...props
}: React.ComponentProps<"span"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"
  return <Comp data-slot="pill" className={className} {...props} />
}

function Cell(props: React.ComponentPropsWithoutRef<"td">) {
  const Tag = "td"
  return <Tag {...props} />
}

export { Pill, Cell }
