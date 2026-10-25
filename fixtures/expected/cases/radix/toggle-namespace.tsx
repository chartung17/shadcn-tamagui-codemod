import { useState } from "react"
import { html } from "@tamagui/tailwind"
import type { ComponentProps } from "react"
// Radix Toggle has no Tamagui counterpart: a button with a pressed state,
// setting the same aria-pressed and data-state attributes.
const TogglePrimitive = {
  Root: function ToggleRoot({
    pressed: pressedProp,
    defaultPressed = false,
    onPressedChange,
    onClick,
    ...props
  }: ComponentProps<typeof html.button> & {
    pressed?: boolean
    defaultPressed?: boolean
    onPressedChange?: (pressed: boolean) => void
  }) {
    const [uncontrolled, setUncontrolled] = useState(defaultPressed)
    const pressed = pressedProp ?? uncontrolled
    return (
      <html.button
        type="button"
        aria-pressed={pressed}
        data-state={pressed ? "on" : "off"}
        data-disabled={props.disabled ? "" : undefined}
        onClick={(event) => {
          onClick?.(event)
          if (event?.defaultPrevented || props.disabled) return
          if (pressedProp === undefined) setUncontrolled(!pressed)
          onPressedChange?.(!pressed)
        }}
        {...props}
      />
    )
  },
}

// A namespace import of the standalone package gets the same local replacement.
export function Bold() {
  const [on, setOn] = useState(false)
  return (
    <TogglePrimitive.Root
      pressed={on}
      onPressedChange={setOn}
      className="rounded-md px-2 aria-pressed:bg-(--muted)!"
    >
      B
    </TogglePrimitive.Root>
  )
}
