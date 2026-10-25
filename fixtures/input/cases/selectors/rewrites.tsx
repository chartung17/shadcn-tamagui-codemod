import { cn } from "cn"

export function Field({ invalid }: { invalid: boolean }) {
  return (
    <div className="inline-flex items-center gap-2">
      <input
        className={cn(
          "h-9 placeholder:text-muted-foreground placeholder:text-sm",
          invalid && "border-destructive"
        )}
      />
      <span className="inline-flex flex-col">Already has a direction</span>
      <button className="active:scale-95 hover:bg-accent focus-visible:ring-2">
        Press
      </button>
    </div>
  )
}
