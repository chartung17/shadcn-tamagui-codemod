import { cn } from "cn"
import { html } from "@tamagui/tailwind"

export function Field({ invalid }: { invalid: boolean }) {
  return (
    <html.div className="inline-flex flex-row items-center gap-2">
      <html.input
        className={cn(
          "h-9 placeholder:text-muted-foreground placeholder-muted-foreground placeholder:text-sm",
          invalid && "border-destructive"
        )}
      />
      <html.span className="inline-flex flex-col">
        Already has a direction
      </html.span>
      <html.button className="active:scale-95 hover:bg-accent focus-visible:ring-2">
        Press
      </html.button>
    </html.div>
  )
}
