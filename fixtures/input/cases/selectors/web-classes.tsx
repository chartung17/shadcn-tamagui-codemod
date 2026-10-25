import * as React from "react"
import { Tabs as TabsPrimitive } from "radix-ui"
import { cn } from "@/lib/utils"

// Classes Tamagui leaves to Tailwind on web: shadcn custom variants, dark:,
// theme colors and state variants; ring-* colors keep their native form.
export function Toggle({ className, ...props }: React.ComponentProps<"button">) {
  return (
    <button
      className={cn(
        "flex items-center rounded-md border ring-1 ring-ring/50 data-checked:bg-primary aria-invalid:border-destructive dark:data-open:bg-accent/50 [&_svg]:size-4",
        className
      )}
      {...props}
    />
  )
}

// `flex` on a Tamagui view gets flex-row; a direction behind data-horizontal:
// counts as the default (horizontal) and gets a native: copy.
export function Tabs({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      className={cn("flex gap-2 data-horizontal:flex-col", className)}
      {...props}
    />
  )
}

export function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      className={cn("flex items-center not-last:border-b group-data-vertical/tabs:flex-col", className)}
      {...props}
    />
  )
}
