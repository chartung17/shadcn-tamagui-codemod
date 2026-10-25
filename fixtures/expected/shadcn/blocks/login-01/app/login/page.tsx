import { LoginForm } from "@/components/login-form"
import { View, html } from "@tamagui/tailwind"

export default function Page() {
  return (
    <View className="flex flex-row min-h-svh w-full items-center justify-center p-6 md:p-10">
      <html.div className="w-full max-w-sm">
        <LoginForm />
      </html.div>
    </View>
  )
}
