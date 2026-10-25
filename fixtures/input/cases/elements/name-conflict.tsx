import { View } from "react-native"

// `View` is already taken, so the Tamagui import gets an alias.
export function Mixed() {
  return (
    <View>
      <div className="flex gap-2">
        <span>Tailwind</span>
      </div>
    </View>
  )
}
