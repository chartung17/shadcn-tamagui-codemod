import * as React from "react"
import { cn } from "cn"
import { CheckIcon } from "lucide-react"
import { Checkbox as CheckboxPrimitive } from "tamagui/unstyled"
import { styled } from "@tamagui/tailwind"
// Lets Tailwind classes (className) style a Tamagui UI primitive on web and native.
const tw = <C extends React.ComponentType<any>>(component: C) =>
  styled(component as never) as unknown as React.ComponentType<
    React.ComponentProps<C>
  >
const StyledCheckbox = tw(CheckboxPrimitive)
const StyledCheckboxIndicator = tw(CheckboxPrimitive.Indicator)

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive>) {
  return (
    <StyledCheckbox
      // TODO(native): `after:absolute after:-inset-x-3 after:-inset-y-2`: `::after` pseudo-elements do not exist on native, so this content is lost there.
      data-slot="checkbox"
      className={cn(
        "peer relative flex size-4 shrink-0 items-center justify-center rounded-[4px] border border-input shadow-xs transition-shadow outline-none group-has-disabled/field:opacity-50 group-has-[:focus-visible]/field-label:ring-0 group-has-[:focus-visible]/field-label:not-data-checked:border-input after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground group-has-[:focus-visible]/field-label:data-checked:border-primary dark:data-checked:bg-primary",
        className
      )}
      {...props}
    >
      <StyledCheckboxIndicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none [&>svg]:size-3.5"
      >
        <CheckIcon />
      </StyledCheckboxIndicator>
    </StyledCheckbox>
  )
}

export { Checkbox }
