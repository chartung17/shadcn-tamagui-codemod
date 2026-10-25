// Metro config for the Expo app, which renders converted/src on iOS and Android.
const { getDefaultConfig } = require("expo/metro-config")
const { withTamagui } = require("@tamagui/cli/metro")

const config = getDefaultConfig(__dirname)

module.exports = withTamagui(config, {
  config: "./converted/tamagui.config.ts",
  components: ["tamagui", "@tamagui/tailwind"],
})
