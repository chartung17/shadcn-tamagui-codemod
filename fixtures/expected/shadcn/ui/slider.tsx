"use client"

import * as React from "react"
import { cn } from "cn"
import { Slider as SliderPrimitive } from "tamagui/unstyled"
import { styled } from "@tamagui/tailwind"
// Lets Tailwind classes (className) style a Tamagui UI primitive on web and native.
const tw = <C extends React.ComponentType<any>>(component: C) =>
  styled(component as never) as unknown as React.ComponentType<
    React.ComponentProps<C> & { className?: string }
  >
const StyledSlider = tw(SliderPrimitive)
const StyledSliderTrack = tw(SliderPrimitive.Track)
const StyledSliderTrackActive = tw(SliderPrimitive.TrackActive)
const StyledSliderThumb = tw(SliderPrimitive.Thumb)

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: React.ComponentProps<typeof SliderPrimitive>) {
  const _values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [min, max],
    [value, defaultValue, min, max]
  )

  return (
    <StyledSlider
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        "relative flex flex-row w-full touch-none items-center select-none data-disabled:opacity-50! data-[orientation=vertical]:h-full! data-[orientation=vertical]:min-h-40! data-[orientation=vertical]:w-auto! data-[orientation=vertical]:flex-col!",
        className
      )}
      {...props}
    >
      <StyledSliderTrack
        data-slot="slider-track"
        className="relative grow overflow-hidden rounded-full bg-muted data-[orientation=horizontal]:h-1.5! native:h-1.5 data-[orientation=horizontal]:w-full! native:w-full data-[orientation=vertical]:h-full! data-[orientation=vertical]:w-1.5!"
      >
        <StyledSliderTrackActive
          data-slot="slider-range"
          className="absolute bg-primary select-none data-[orientation=horizontal]:h-full! native:h-full data-[orientation=vertical]:w-full!"
        />
      </StyledSliderTrack>
      {Array.from({ length: _values.length }, (_, index) => (
        <StyledSliderThumb
          data-slot="slider-thumb"
          key={index}
          className="block size-4 shrink-0 rounded-full border border-primary bg-white shadow-sm ring-(--ring)/50 ring-ring/50 transition-[color,box-shadow] select-none hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
          index={index}
        />
      ))}
    </StyledSlider>
  )
}

export { Slider }
