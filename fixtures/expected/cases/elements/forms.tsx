import { html } from "@tamagui/tailwind"

export function SignupForm({
  onSubmit,
  type,
}: {
  onSubmit: () => void
  type?: string
}) {
  return (
    <html.form onSubmit={onSubmit} className="grid gap-4">
      <html.fieldset className="grid gap-2">
        <html.label htmlFor="email" className="text-sm font-medium">
          Email
        </html.label>
        <html.input
          id="email"
          type="email"
          className="h-9 rounded-md border border-border px-3"
        />
        <html.input
          type={type}
          className="h-9 rounded-md border border-border px-3"
        />
        <html.input
          // TODO(native): `<input type="checkbox">`: `html.input` supports only text-like types on native; `type="checkbox"` is a native build error.
          id="terms"
          type="checkbox"
          className="size-4"
        />
        <html.textarea className="min-h-16 rounded-md border border-border px-3 py-2" />
        <html.select
          // TODO(native): `<select>`: `html.select` fails native builds because React Native has no menu-based select control.
          className="h-9 rounded-md border border-border"
        >
          <html.option value="a">A</html.option>
          <html.optgroup label="More">
            <html.option value="b">B</html.option>
          </html.optgroup>
        </html.select>
      </html.fieldset>
    </html.form>
  )
}
