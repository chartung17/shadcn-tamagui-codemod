/**
 * Pins the Tamagui runtime behavior the cn/cva and asChild rewrites rely on,
 * by server-rendering @tamagui/tailwind components with the web build. If one
 * of these changes in a Tamagui update, revisit src/passes/cnCva.ts and
 * src/passes/radix.ts.
 */
import { defaultConfig } from '@tamagui/config/v6'
import { TamaguiProvider, createTamagui } from '@tamagui/core'
import { html, styled } from '@tamagui/tailwind'
import * as unstyled from 'tamagui/unstyled'
import { cn } from 'cn'
import { createElement as h, type ReactElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

// tamagui's .d.ts files use extensionless re-exports that NodeNext cannot follow.
const { Switch } = unstyled as unknown as {
  Switch: (props: Record<string, unknown>) => ReactElement
}

const config = createTamagui({
  ...defaultConfig,
  themes: {
    light: { ...defaultConfig.themes.light, primary: '#111111' },
    dark: defaultConfig.themes.dark,
  },
})

function render(element: ReactElement): string {
  const markup = renderToStaticMarkup(
    h(TamaguiProvider, { config, defaultTheme: 'light' }, element),
  )
  // Keep only the rendered component, not the provider's style/meta output.
  return markup.replace(/^[\s\S]*?font_body">/, '').replace(/<\/span>$/, '')
}

const Frame = styled(html.button, 'inline-flex flex-row p-2 [&_svg]:size-4', {
  variants: {
    variant: {
      default: 'bg-primary aria-invalid:border-destructive',
      ghost: 'bg-transparent',
    },
  },
  defaultVariants: { variant: 'default' },
})

describe('@tamagui/tailwind runtime', () => {
  it('styled() applies base and variant styles and keeps web-only classes', () => {
    const out = render(h(Frame, null, 'x'))
    expect(out).toContain('background-color:var(--primary)')
    expect(out).toContain('flex-direction:row')
    expect(out).toContain('[&amp;_svg]:size-4')
    expect(out).toContain('aria-invalid:border-destructive')
  })

  it('resolves a runtime cn() string with the last class winning', () => {
    const active = Math.random() >= 0
    const out = render(
      h(html.div, { className: cn('p-2', active && 'p-4', 'data-[a=b]:p-1') }, 'x'),
    )
    expect(out).toMatch(/class="[^"]*_p-/)
    expect(out).toContain('data-[a=b]:p-1')
    expect(out).not.toContain('p-2')
  })

  it('asChild forwards className-derived styles to the child', () => {
    const out = render(
      h(
        html.button,
        { asChild: true, className: 'p-2 bg-primary' },
        h('a', { href: '#' }, 'x'),
      ),
    )
    expect(out).toMatch(/^<a href="#" class="[^"]*_p-[^"]*_b-/)
  })

  it('asChild does not forward styled() base or variant styles (why cva is kept for asChild)', () => {
    const out = render(h(Frame, { asChild: true }, h('a', { href: '#' }, 'x')))
    expect(out).toMatch(/^<a /)
    expect(out).not.toContain('background-color')
    expect(out).not.toMatch(/_b-|_p-/)
  })

  it('styled() over a Tamagui UI primitive parses call-site className (the radix tw() wrapper)', () => {
    const StyledSwitch = styled(Switch as never, 'h-5 w-9') as unknown as typeof Switch
    const out = render(
      h(StyledSwitch, {
        className: 'mt-2 data-[state=checked]:bg-primary',
        defaultChecked: true,
      }),
    )
    expect(out).toContain('role="switch"')
    expect(out).toContain('data-state="checked"')
    expect(out).toMatch(/class="[^"]*_h-[^"]*_w-[^"]*_m-/)
    expect(out).toContain('data-[state=checked]:bg-primary')
  })

  it('a raw className on a Tamagui UI primitive is not parsed (why parts are wrapped)', () => {
    const out = render(h(Switch, { className: 'mt-2' }))
    expect(out).toMatch(/class="[^"]*\bmt-2\b/)
  })
})
