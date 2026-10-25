import { html } from "@tamagui/tailwind"

export function Report({ rows }: { rows: { id: string; total: number }[] }) {
  return (
    <html.div className="overflow-x-auto">
      <table
        // TODO(native): `<table>`: `<table>` has no `html.*` equivalent, so it renders on web only.
        className="w-full text-sm"
      >
        <thead>
          <tr>
            <th className="text-left">Id</th>
            <th className="text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td>
                <html.span className="font-mono">{row.id}</html.span>
              </td>
              <td className="text-right">{row.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <svg
        // TODO(native): `<svg>`: `<svg>` has no `html.*` equivalent, so it renders on web only.
        viewBox="0 0 10 10"
        className="size-4"
      >
        <defs>
          <linearGradient id="g">
            <stop offset="0" />
          </linearGradient>
        </defs>
        <path d="M0 0h10v10z" />
      </svg>
    </html.div>
  )
}
