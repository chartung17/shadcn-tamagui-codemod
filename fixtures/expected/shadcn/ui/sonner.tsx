"use client"

// TODO(native): `"next-themes"`: next-themes reads and writes the DOM (`document`, `localStorage`) and does not run on native.
import { useTheme } from "next-themes"
// TODO(native): `"sonner"`: sonner (toasts) renders DOM elements and does not run on native.
import { Toaster as Sonner, type ToasterProps } from "sonner"
import {
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  OctagonXIcon,
  Loader2Icon,
} from "@/components/icons"
import { View } from "@tamagui/tailwind"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon size={16} />,
        info: <InfoIcon size={16} />,
        warning: <TriangleAlertIcon size={16} />,
        error: <OctagonXIcon size={16} />,
        loading: (
          <View asChild className="animate-spin">
            <Loader2Icon size={16} />
          </View>
        ),
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "cn-toast",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
