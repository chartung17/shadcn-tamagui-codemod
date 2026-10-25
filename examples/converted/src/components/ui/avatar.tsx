import * as React from "react"
import { cn } from "cn"
import { html, styled } from "@tamagui/tailwind"
import { Avatar as AvatarPrimitive } from "tamagui/unstyled"
// Lets Tailwind classes (className) style a Tamagui UI primitive on web and native.
const tw = <C extends React.ComponentType<any>>(component: C) =>
  styled(component as never) as unknown as React.ComponentType<
    React.ComponentProps<C> & { className?: string }
  >
// Native views cannot render raw text: wraps string children in html.span,
// with the part's text classes applied to it on native.
const twText = <C extends React.ComponentType<any>>(component: C) => {
  const Styled = tw(component) as React.ComponentType<any>
  return ({
    className,
    children,
    ...props
  }: React.ComponentProps<C> & {
    className?: string
    children?: React.ReactNode
  }) => {
    const textClasses = className
      ?.split(/\s+/)
      .filter((c: string) =>
        /^(?:text|font|leading|tracking)-|^(?:italic|underline|line-through|uppercase|lowercase|capitalize)$/.test(
          c
        )
      )
      .map((c: string) => `native:${c}`)
      .join(" ")
    const wrap = (child: React.ReactNode) =>
      typeof child === "string" || typeof child === "number" ? (
        <html.span className={textClasses}>{child}</html.span>
      ) : (
        child
      )
    return (
      <Styled className={className} {...props}>
        {Array.isArray(children)
          ? React.Children.map(children, wrap)
          : wrap(children)}
      </Styled>
    )
  }
}
const StyledAvatar = tw(AvatarPrimitive)
const StyledAvatarImage = tw(AvatarPrimitive.Image)
const StyledAvatarFallback = twText(AvatarPrimitive.Fallback)

function Avatar({
  className,
  size = "default",
  ...props
}: Omit<React.ComponentProps<typeof AvatarPrimitive>, "size"> & {
  size?: "default" | "sm" | "lg"
}) {
  return (
    <StyledAvatar
      // TODO(native): `after:absolute after:inset-0 after:rounded-full after:border after:border-bor...`: `::after` pseudo-elements do not exist on native, so this content is lost there.
      data-slot="avatar"
      data-size={size}
      className={cn(
        "group/avatar relative flex flex-row size-8 shrink-0 rounded-full select-none after:absolute after:inset-0 after:rounded-full after:border border-border after:border-(--border) after:mix-blend-darken data-[size=lg]:size-10! data-[size=sm]:size-6! in-[.t_dark]:after:mix-blend-lighten",
        className
      )}
      {...props}
    />
  )
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <StyledAvatarImage
      data-slot="avatar-image"
      className={cn(
        "aspect-square size-full rounded-full object-cover",
        className
      )}
      {...props}
    />
  )
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <StyledAvatarFallback
      data-slot="avatar-fallback"
      className={cn(
        "flex flex-row size-full items-center justify-center rounded-full bg-muted text-sm text-muted-foreground group-data-[size=sm]/avatar:text-xs!",
        className
      )}
      {...props}
    />
  )
}

function AvatarBadge({
  className,
  ...props
}: React.ComponentProps<typeof html.span>) {
  return (
    <html.span
      data-slot="avatar-badge"
      className={cn(
        "absolute right-0 bottom-0 z-10 inline-flex flex-row items-center justify-center rounded-full bg-primary text-primary-foreground bg-blend-color ring-2 ring-(--background) ring-background select-none",
        "group-data-[size=sm]/avatar:size-2! group-data-[size=sm]/avatar:[&>svg]:hidden",
        "group-data-[size=default]/avatar:size-2.5! group-data-[size=default]/avatar:[&>svg]:size-2",
        "group-data-[size=lg]/avatar:size-3! group-data-[size=lg]/avatar:[&>svg]:size-2",
        className
      )}
      {...props}
    />
  )
}

function AvatarGroup({
  className,
  ...props
}: React.ComponentProps<typeof html.div>) {
  return (
    <html.div
      data-slot="avatar-group"
      className={cn(
        "group/avatar-group flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-(--background)",
        className
      )}
      {...props}
    />
  )
}

function AvatarGroupCount({
  className,
  ...props
}: React.ComponentProps<typeof html.div>) {
  return (
    <html.div
      data-slot="avatar-group-count"
      className={cn(
        "relative flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm text-muted-foreground ring-2 ring-(--background) ring-background group-has-data-[size=lg]/avatar-group:size-10! group-has-data-[size=sm]/avatar-group:size-6! [&>svg]:size-4 group-has-data-[size=lg]/avatar-group:[&>svg]:size-5 group-has-data-[size=sm]/avatar-group:[&>svg]:size-3",
        className
      )}
      {...props}
    />
  )
}

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarBadge,
}
