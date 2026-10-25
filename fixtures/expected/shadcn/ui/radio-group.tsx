import * as React from "react"
import { cn } from "cn"
import { html, styled } from "@tamagui/tailwind"
import { RadioGroup as RadioGroupPrimitive } from "tamagui/unstyled"
// Lets Tailwind classes (className) style a Tamagui UI primitive on web and native.
const tw = <C extends React.ComponentType<any>>(component: C) =>
  styled(component as never) as unknown as React.ComponentType<
    React.ComponentProps<C> & { className?: string }
  >
const StyledRadioGroup = tw(RadioGroupPrimitive)
const StyledRadioGroupItem = tw(RadioGroupPrimitive.Item)
const StyledRadioGroupIndicator = tw(RadioGroupPrimitive.Indicator)

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive>) {
  return (
    <StyledRadioGroup
      data-slot="radio-group"
      className={cn("grid w-full gap-3", className)}
      {...props}
    />
  )
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <StyledRadioGroupItem
      // TODO(native): `after:absolute after:-inset-x-3 after:-inset-y-2`: `::after` pseudo-elements do not exist on native, so this content is lost there.
      data-slot="radio-group-item"
      className={cn(
        "group/radio-group-item peer relative flex aspect-square size-4 shrink-0 rounded-full border border-input outline-none group-has-[:focus-visible]/field-label:ring-0 group-has-[:focus-visible]/field-label:not-data-checked:border-input after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground group-has-[:focus-visible]/field-label:data-checked:border-primary dark:data-checked:bg-primary",
        className
      )}
      {...props}
    >
      <StyledRadioGroupIndicator
        data-slot="radio-group-indicator"
        className="flex size-4 items-center justify-center"
      >
        <html.span className="absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-foreground" />
      </StyledRadioGroupIndicator>
    </StyledRadioGroupItem>
  )
}

export { RadioGroup, RadioGroupItem }
