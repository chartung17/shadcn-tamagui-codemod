/**
 * Hand-maintained mapping from Radix primitives (as used by shadcn/ui) to
 * Tamagui v3 UI primitives. Part names and props come from the Tamagui v3
 * component docs (tamagui.dev/ui/<component>) and the runtime exports of
 * `tamagui/unstyled`; `test/mappings.test.ts` checks every part exists there.
 *
 * The unstyled primitives are used because shadcn supplies all styling as
 * Tailwind classes. A part that receives `className` is wrapped once per file
 * with `styled()` from `@tamagui/tailwind`, which makes Tamagui parse the
 * classes on web and native (see README, "Radix components").
 *
 * To add a component: add an entry below, then run `pnpm test` (the mapping
 * test fails if a Tamagui part does not exist) and add a fixture.
 */

export const TAMAGUI_PRIMITIVES_MODULE = 'tamagui/unstyled'

export interface PartMapping {
  /**
   * Part path on the Tamagui export: `''` is the root itself (`Dialog`),
   * `'Content'` is `Dialog.Content`. `null` removes the element and keeps its
   * children (Tamagui handles it internally, e.g. Popover portals itself).
   */
  part: string | null
  /** Use a different top-level export for this part (Tooltip.Provider -> TooltipGroup). */
  export?: string
  /** Radix prop -> Tamagui prop. */
  rename?: Record<string, string>
  /** Radix props with no Tamagui equivalent on this part, with the reason. */
  unsupported?: Record<string, string>
  /**
   * Radix props whose value maps to a different Tamagui prop. `expression`
   * uses `$` for the original value; `data` also forwards the original value
   * as a `data-*` attribute so Radix-style `data-[...]` classes keep matching.
   */
  convert?: Record<string, { prop: string; expression: string; data?: string }>
  /**
   * Types of Radix-only props (removed, renamed or converted ones). When a
   * shadcn wrapper destructures one of them from `ComponentProps<typeof Part>`,
   * the prop is added back to the wrapper's props type so its API is unchanged.
   */
  radixTypes?: Record<string, string>
}

export interface RadixMapping {
  /** Export name in the unified `radix-ui` package. */
  radix: string
  /** Standalone package, e.g. `@radix-ui/react-dialog`. */
  package: string
  /** Export of `tamagui/unstyled`. */
  tamagui: string
  parts: Record<string, PartMapping>
  /** Shown once per file as a warning. */
  caveats?: string[]
  /** Radix CSS variables -> Tamagui equivalents (`null`: no equivalent). */
  cssVariables?: Record<string, string | null>
}

const POSITIONING =
  'Tamagui positions this content from the root (`placement`, `offset`, `allowFlip`, `stayInFrame` on the root component)'

const FOCUS =
  'Tamagui controls focus through `<X.FocusScope onMountAutoFocus onUnmountAutoFocus>`'

/** CSS variables Tamagui's popper sets on the wrapper of positioned content. */
function popperVariables(radixName: string): Record<string, string | null> {
  return {
    [`--radix-${radixName}-trigger-width`]: '--tamagui-popper-anchor-width',
    [`--radix-${radixName}-trigger-height`]: '--tamagui-popper-anchor-height',
    [`--radix-${radixName}-content-available-width`]: '--tamagui-popper-available-width',
    [`--radix-${radixName}-content-available-height`]:
      '--tamagui-popper-available-height',
    [`--radix-${radixName}-content-transform-origin`]: null,
  }
}

export const RADIX_MAPPINGS: readonly RadixMapping[] = [
  {
    radix: 'Dialog',
    package: '@radix-ui/react-dialog',
    tamagui: 'Dialog',
    parts: {
      Root: { part: '' },
      Trigger: { part: 'Trigger' },
      Portal: { part: 'Portal' },
      Overlay: { part: 'Overlay' },
      Content: {
        part: 'Content',
        unsupported: {
          onOpenAutoFocus: FOCUS.replace('X', 'Dialog'),
          onCloseAutoFocus: FOCUS.replace('X', 'Dialog'),
        },
        radixTypes: {
          onOpenAutoFocus: '(event: Event) => void',
          onCloseAutoFocus: '(event: Event) => void',
        },
      },
      Title: { part: 'Title' },
      Description: { part: 'Description' },
      Close: { part: 'Close' },
    },
  },
  {
    radix: 'Popover',
    package: '@radix-ui/react-popover',
    tamagui: 'Popover',
    parts: {
      Root: { part: '' },
      Trigger: { part: 'Trigger' },
      Anchor: { part: 'Anchor' },
      Portal: { part: null },
      Content: {
        part: 'Content',
        unsupported: {
          side: POSITIONING,
          sideOffset: POSITIONING,
          align: POSITIONING,
          alignOffset: POSITIONING,
          avoidCollisions: POSITIONING,
          collisionPadding: POSITIONING,
        },
        radixTypes: {
          side: '"top" | "right" | "bottom" | "left"',
          sideOffset: 'number',
          align: '"start" | "center" | "end"',
          alignOffset: 'number',
          avoidCollisions: 'boolean',
          collisionPadding: 'number',
        },
      },
      Close: { part: 'Close' },
      Arrow: { part: 'Arrow' },
    },
    caveats: [
      'Tamagui Popover sets `data-placement` instead of Radix `data-side`/`data-align`, so `data-[side=...]:` classes no longer match.',
    ],
    cssVariables: popperVariables('popover'),
  },
  {
    radix: 'Tooltip',
    package: '@radix-ui/react-tooltip',
    tamagui: 'Tooltip',
    parts: {
      Provider: {
        part: '',
        export: 'TooltipGroup',
        rename: { delayDuration: 'delay' },
        unsupported: {
          skipDelayDuration: '`TooltipGroup` has `timeoutMs` instead',
          disableHoverableContent: 'not supported by Tamagui Tooltip',
        },
        radixTypes: {
          delayDuration: 'number',
          skipDelayDuration: 'number',
          disableHoverableContent: 'boolean',
        },
      },
      Root: {
        part: '',
        rename: { delayDuration: 'delay' },
        radixTypes: { delayDuration: 'number' },
      },
      Trigger: { part: 'Trigger' },
      Portal: { part: null },
      Content: {
        part: 'Content',
        unsupported: {
          side: POSITIONING,
          sideOffset: POSITIONING,
          align: POSITIONING,
          alignOffset: POSITIONING,
          avoidCollisions: POSITIONING,
          collisionPadding: POSITIONING,
        },
        radixTypes: {
          side: '"top" | "right" | "bottom" | "left"',
          sideOffset: 'number',
          align: '"start" | "center" | "end"',
          alignOffset: 'number',
          avoidCollisions: 'boolean',
          collisionPadding: 'number',
        },
      },
      Arrow: { part: 'Arrow' },
    },
    caveats: [
      'Tamagui Tooltip does not render on native; there it only provides accessibility output.',
      'Tamagui Tooltip sets `data-placement` instead of Radix `data-side`, so `data-[side=...]:` classes no longer match.',
    ],
    cssVariables: popperVariables('tooltip'),
  },
  {
    radix: 'Tabs',
    package: '@radix-ui/react-tabs',
    tamagui: 'Tabs',
    parts: {
      Root: { part: '' },
      List: { part: 'List' },
      Trigger: { part: 'Tab' },
      Content: { part: 'Content' },
    },
  },
  {
    radix: 'Checkbox',
    package: '@radix-ui/react-checkbox',
    tamagui: 'Checkbox',
    parts: {
      Root: { part: '' },
      Indicator: { part: 'Indicator' },
    },
  },
  {
    radix: 'Switch',
    package: '@radix-ui/react-switch',
    tamagui: 'Switch',
    parts: {
      Root: { part: '' },
      Thumb: { part: 'Thumb' },
    },
  },
  {
    radix: 'Separator',
    package: '@radix-ui/react-separator',
    tamagui: 'Separator',
    parts: {
      Root: {
        part: '',
        convert: {
          orientation: {
            prop: 'vertical',
            expression: '$ === "vertical"',
            data: 'data-orientation',
          },
        },
        unsupported: {
          decorative:
            'Tamagui Separator has no `decorative` option (it always renders `role="separator"`)',
        },
        radixTypes: { orientation: '"horizontal" | "vertical"', decorative: 'boolean' },
      },
    },
  },
  {
    radix: 'Label',
    package: '@radix-ui/react-label',
    tamagui: 'Label',
    parts: {
      Root: { part: '' },
    },
  },
]

export function findMapping(radixExport: string): RadixMapping | undefined {
  return RADIX_MAPPINGS.find((m) => m.radix === radixExport)
}

export function findMappingByPackage(pkg: string): RadixMapping | undefined {
  return RADIX_MAPPINGS.find((m) => m.package === pkg)
}
