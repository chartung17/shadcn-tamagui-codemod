import { View } from "react-native"
import { View as TwView, html } from "@tamagui/tailwind"

// `View` is already taken, so the Tamagui import gets an alias.
export function Mixed() {
  return (
    <View>
      <TwView className="flex flex-row gap-2">
        <html.span>Tailwind</html.span>
      </TwView>
    </View>
  )
}
