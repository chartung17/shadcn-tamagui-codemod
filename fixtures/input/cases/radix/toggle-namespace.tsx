import { useState } from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"

// A namespace import of the standalone package gets the same local replacement.
export function Bold() {
  const [on, setOn] = useState(false)
  return (
    <TogglePrimitive.Root
      pressed={on}
      onPressedChange={setOn}
      className="rounded-md px-2 aria-pressed:bg-muted"
    >
      B
    </TogglePrimitive.Root>
  )
}
