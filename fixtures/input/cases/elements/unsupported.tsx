export function Report({ rows }: { rows: { id: string; total: number }[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
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
                <span className="font-mono">{row.id}</span>
              </td>
              <td className="text-right">{row.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <svg viewBox="0 0 10 10" className="size-4">
        <defs>
          <linearGradient id="g">
            <stop offset="0" />
          </linearGradient>
        </defs>
        <path d="M0 0h10v10z" />
      </svg>
    </div>
  )
}
