import * as React from "react"

// JSX without Tailwind classes or shadcn imports: nothing to convert.
export function Plain({ title }: { title: string }) {
  return (
    <div style={{ display: "flex", padding: 16 }}>
      <h1   style={{fontSize: 24}}>{title}</h1>
      <button onClick={() => alert("hi")}>Say hi</button>
    </div>
  )
}
