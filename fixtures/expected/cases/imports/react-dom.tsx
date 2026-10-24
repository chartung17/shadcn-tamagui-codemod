"use client"

import * as React from "react"
// TODO(native): `createPortal from "react-dom"`: `react-dom` is web-only and is not available in React Native.
import { createPortal } from "react-dom"
import { html } from "@tamagui/tailwind"

export function Floating({ children }: { children: React.ReactNode }) {
  return createPortal(
    <html.div className="fixed inset-0">{children}</html.div>,
    document.body
  )
}
