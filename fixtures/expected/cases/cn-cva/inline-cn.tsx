import { cn } from "@/lib/utils"
import { View, html } from "@tamagui/tailwind"

export function Static() {
  return (
    <View className="flex flex-row items-center gap-2">
      <html.span className="text-sm">Static</html.span>
    </View>
  )
}

export function Conditional({
  active,
  className,
}: {
  active: boolean
  className?: string
}) {
  return <html.div className={cn("p-2", active && "bg-accent", className)} />
}
