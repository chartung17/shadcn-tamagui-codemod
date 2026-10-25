import * as React from "react"
import { html, styled } from "@tamagui/tailwind"
import type { GetTailwindVariantProps } from "@tamagui/tailwind"

const AlertFrame = styled(
  html.div,
  "relative grid w-full rounded-lg border border-border px-4 py-3 text-sm",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        destructive: "bg-card text-destructive",
      },
      inset: {
        true: "pl-8",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Alert({
  className,
  variant,
  inset,
  ...props
}: React.ComponentProps<typeof html.div> &
  GetTailwindVariantProps<typeof AlertFrame>) {
  return (
    <AlertFrame
      role="alert"
      variant={variant}
      inset={inset ?? false}
      className={className}
      {...props}
    />
  )
}

export { Alert }
