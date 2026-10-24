export function SignupForm({ onSubmit, type }: { onSubmit: () => void; type?: string }) {
  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <fieldset className="grid gap-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input id="email" type="email" className="h-9 rounded-md border px-3" />
        <input type={type} className="h-9 rounded-md border px-3" />
        <input id="terms" type="checkbox" className="size-4" />
        <textarea className="min-h-16 rounded-md border px-3 py-2" />
        <select className="h-9 rounded-md border">
          <option value="a">A</option>
          <optgroup label="More">
            <option value="b">B</option>
          </optgroup>
        </select>
      </fieldset>
    </form>
  )
}
