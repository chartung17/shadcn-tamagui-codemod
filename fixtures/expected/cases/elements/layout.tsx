import * as React from "react"
import { html, View } from "@tamagui/tailwind"

export function Layout({ title, items }: { title: string; items: string[] }) {
  return (
    <html.main className="mx-auto max-w-3xl p-6">
      <html.header className="flex items-center justify-between border-b border-border pb-4">
        <html.h1 className="text-2xl font-semibold">{title}</html.h1>
        <html.nav className="text-sm">
          <html.a href="/docs" className="underline">
            Docs
          </html.a>
        </html.nav>
      </html.header>
      <html.section className="mt-6 space-y-4">
        <View className="flex flex-col gap-2">
          <html.p className="text-muted-foreground">
            A column flex container.
          </html.p>
          <html.span className="flex items-center gap-1">
            Inline flex row
          </html.span>
        </View>
        <html.div className="md:flex gap-4">Only flex from md up</html.div>
        <html.ul className="list-disc pl-6">
          {items.map((item) => (
            <html.li key={item}>{item}</html.li>
          ))}
        </html.ul>
        <html.img src="/logo.png" alt="Logo" className="size-10 rounded" />
        <html.button type="button" className="rounded-md bg-primary px-3 py-2">
          Click
        </html.button>
      </html.section>
      <html.footer className="mt-8 text-xs">
        <html.hr />
        <small
        // TODO(native): `<small>`: `<small>` has no `html.*` equivalent, so it renders on web only.
        >
          Small print
        </small>
      </html.footer>
    </html.main>
  )
}

export function Panel(props: React.ComponentProps<typeof html.div>) {
  // Spread props keep the semantic element so DOM-typed props still fit.
  return <html.div className="flex gap-2" {...props} />
}

export function WithRef() {
  const ref = React.useRef<HTMLDivElement>(null)
  return <html.div ref={ref} className="flex items-center" />
}
