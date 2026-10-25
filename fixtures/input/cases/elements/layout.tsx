import * as React from "react"

export function Layout({ title, items }: { title: string; items: string[] }) {
  return (
    <main className="mx-auto max-w-3xl p-6">
      <header className="flex items-center justify-between border-b pb-4">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <nav className="text-sm">
          <a href="/docs" className="underline">
            Docs
          </a>
        </nav>
      </header>
      <section className="mt-6 space-y-4">
        <div className="flex flex-col gap-2">
          <p className="text-muted-foreground">A column flex container.</p>
          <span className="flex items-center gap-1">Inline flex row</span>
        </div>
        <div className="md:flex gap-4">Only flex from md up</div>
        <ul className="list-disc pl-6">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <img src="/logo.png" alt="Logo" className="size-10 rounded" />
        <button type="button" className="rounded-md bg-primary px-3 py-2">
          Click
        </button>
      </section>
      <footer className="mt-8 text-xs">
        <hr />
        <small>Small print</small>
      </footer>
    </main>
  )
}

export function Panel(props: React.ComponentProps<"div">) {
  // Spread props keep the semantic element so DOM-typed props still fit.
  return <div className="flex gap-2" {...props} />
}

export function WithRef() {
  const ref = React.useRef<HTMLDivElement>(null)
  return <div ref={ref} className="flex items-center" />
}
