import { cn } from "@/lib/utils"
import { html, styled } from "@tamagui/tailwind"

const ExampleFrame = styled(
  html.span,
  "inline-flex flex-row items-center rounded-full px-2 text-xs",
  {
    variants: {
      tone: {
        neutral: "bg-muted text-muted-foreground",
        brand: "bg-primary text-primary-foreground hover:bg-primary/90",
      },
    },
    defaultVariants: { tone: "neutral" },
  }
)

export function Example({
  active,
  color,
  variant,
}: {
  active: boolean
  color: string
  variant: "solid" | "outline"
}) {
  return (
    <html.div
      className={cn(
        "grid gap-4 p-4 md:grid-cols-2",
        active && "ring-2 ring-ring",
        variant === "outline" ? "border border-input" : "bg-secondary",
        { "opacity-50": !active }
      )}
    >
      <html.span
        // TODO(native): `before:absolute before:inset-0 before:bg-black/10`: `::before` pseudo-elements do not exist on native, so this content is lost there.
        className="relative before:absolute before:inset-0 before:bg-black/10"
      >
        Pseudo-element decoration
      </html.span>
      <html.p
        // TODO(native): `text-${color}-500`: This class name is assembled at runtime, so neither the codemod nor Tailwind can check it.
        className={`text-sm text-${color}-500`}
      >
        Interpolated
      </html.p>
      <html.p className="data-[state=open]:font-bold aria-invalid:text-destructive">
        Selector variants
      </html.p>
      <html.input className="placeholder:text-muted-foreground placeholder-muted-foreground w-38 my-custom-class" />
      <ExampleFrame tone={"brand"}>Chip</ExampleFrame>
    </html.div>
  )
}
