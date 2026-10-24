import { cn } from "cn"
import { html } from "@tamagui/tailwind"

function Skeleton({
  className,
  ...props
}: React.ComponentProps<typeof html.div>) {
  return (
    <html.div
      data-slot="skeleton"
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

export { Skeleton }
