import * as React from "react"
import { html } from "@tamagui/tailwind"

function Pill({
  asChild = false,
  className,
  ...props
}: React.ComponentProps<typeof html.span> & { asChild?: boolean }) {
  return (
    <html.span
      data-slot="pill"
      className={className}
      {...props}
      asChild={asChild}
    />
  )
}

function Cell(props: React.ComponentPropsWithoutRef<"td">) {
  // TODO(native): `"td"`: `<td>` has no `html.*` equivalent, so it renders on web only.
  const Tag = "td"
  return <Tag {...props} />
}

export { Pill, Cell }
