import { ScrollView } from "react-native"
import { TamaguiProvider } from "tamagui"

import { App } from "@/App"
import config from "./converted/tamagui.config"

export function NativeApp() {
  return (
    <TamaguiProvider config={config} defaultTheme="light">
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <App />
      </ScrollView>
    </TamaguiProvider>
  )
}
