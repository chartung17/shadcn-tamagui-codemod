"use client"

import * as React from "react"
import { createPortal } from "react-dom"

export function Floating({ children }: { children: React.ReactNode }) {
  return createPortal(<div className="fixed inset-0">{children}</div>, document.body)
}
