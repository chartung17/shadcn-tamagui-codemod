import * as React from "react"
import { Slot } from "radix-ui"
import { html } from "@tamagui/tailwind"

function Pill({
  asChild = false,
  className,
  ...props
}: React.ComponentProps<typeof html.span> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : html.span
  return <Comp data-slot="pill" className={className} {...props} />
}

function Cell(props: React.ComponentPropsWithoutRef<"td">) {
  // TODO(native): `"td"`: `<td>` has no `html.*` equivalent, so it renders on web only.
  const Tag = "td"
  return <Tag {...props} />
}

export { Pill, Cell }
