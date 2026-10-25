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
  /** Add this prop from the element's `key` when it is missing (Slider.Thumb `index`). */
  propFromKey?: string
  /**
   * The Tamagui part is a view that shadcn passes text to (`<TabsTrigger>Account</TabsTrigger>`).
   * Native views cannot render raw text, so the part is wrapped with `twText`.
   */
  wrapsText?: boolean
  /**
   * Props added where the Radix default differs from Tamagui's, before any
   * spread so callers can still override them. Values are JSX initializers.
   */
  defaults?: Record<string, string>
  /** Move the part's `className` to this descendant part (Select.Content -> Viewport). */
  classNameTo?: string
  /**
   * Tamagui gives this text part a font size of its own, where Radix's inherits
   * it; a part without a size class gets the size of this part (`Content`).
   */
  fontSizeFrom?: string
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

const POSITIONING_TYPES: Record<string, string> = {
  side: '"top" | "right" | "bottom" | "left"',
  sideOffset: 'number',
  align: '"start" | "center" | "end"',
  alignOffset: 'number',
  avoidCollisions: 'boolean',
  collisionPadding: 'number',
}

const POSITIONING_PROPS: Record<string, string> = Object.fromEntries(
  Object.keys(POSITIONING_TYPES).map((prop) => [prop, POSITIONING]),
)

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
      Trigger: { part: 'Trigger', wrapsText: true },
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
      Title: { part: 'Title', fontSizeFrom: 'Content' },
      Description: { part: 'Description', fontSizeFrom: 'Content' },
      Close: { part: 'Close', wrapsText: true },
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
        wrapsText: true,
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
        // Radix tooltips open above the trigger; Tamagui's default is below.
        defaults: { placement: '"top"' },
      },
      Trigger: { part: 'Trigger' },
      Portal: { part: null },
      Content: {
        part: 'Content',
        wrapsText: true,
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
      Trigger: { part: 'Tab', wrapsText: true },
      Content: { part: 'Content', wrapsText: true },
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
  {
    radix: 'AlertDialog',
    package: '@radix-ui/react-alert-dialog',
    tamagui: 'AlertDialog',
    parts: {
      Root: { part: '' },
      Trigger: { part: 'Trigger', wrapsText: true },
      Portal: { part: 'Portal' },
      Overlay: { part: 'Overlay' },
      Content: {
        part: 'Content',
        unsupported: {
          onOpenAutoFocus: FOCUS.replace('X', 'AlertDialog'),
          onCloseAutoFocus: FOCUS.replace('X', 'AlertDialog'),
        },
        radixTypes: {
          onOpenAutoFocus: '(event: Event) => void',
          onCloseAutoFocus: '(event: Event) => void',
        },
      },
      Title: { part: 'Title', fontSizeFrom: 'Content' },
      Description: { part: 'Description', fontSizeFrom: 'Content' },
      Action: { part: 'Action', wrapsText: true },
      Cancel: { part: 'Cancel', wrapsText: true },
    },
  },
  {
    radix: 'DropdownMenu',
    package: '@radix-ui/react-dropdown-menu',
    tamagui: 'Menu',
    parts: {
      Root: { part: '' },
      Trigger: { part: 'Trigger' },
      Portal: { part: 'Portal' },
      Content: {
        part: 'Content',
        unsupported: POSITIONING_PROPS,
        radixTypes: POSITIONING_TYPES,
      },
      Group: { part: 'Group' },
      Label: { part: 'Label' },
      Item: { part: 'Item', wrapsText: true },
      CheckboxItem: { part: 'CheckboxItem', wrapsText: true },
      RadioGroup: { part: 'RadioGroup' },
      RadioItem: { part: 'RadioItem', wrapsText: true },
      ItemIndicator: { part: 'ItemIndicator' },
      Separator: { part: 'Separator' },
      Arrow: { part: 'Arrow' },
      Sub: { part: 'Sub' },
      SubTrigger: { part: 'SubTrigger' },
      SubContent: {
        part: 'SubContent',
        unsupported: POSITIONING_PROPS,
        radixTypes: POSITIONING_TYPES,
      },
    },
    caveats: [
      'Tamagui Menu highlights items with `focus:` (shadcn already uses it); Radix `data-highlighted` and `data-side` attributes are not set.',
      'On native, Tamagui Menu renders a popover by default; platform-native menus need the Expo UI or Zeego adapter (see the Tamagui Menu docs).',
    ],
    cssVariables: {
      '--radix-dropdown-menu-content-transform-origin':
        '--tamagui-menu-content-transform-origin',
      '--radix-dropdown-menu-content-available-width':
        '--tamagui-menu-content-available-width',
      '--radix-dropdown-menu-content-available-height':
        '--tamagui-menu-content-available-height',
      '--radix-dropdown-menu-trigger-width': '--tamagui-menu-trigger-width',
      '--radix-dropdown-menu-trigger-height': '--tamagui-menu-trigger-height',
    },
  },
  {
    radix: 'Select',
    package: '@radix-ui/react-select',
    tamagui: 'Select',
    parts: {
      Root: { part: '' },
      Trigger: { part: 'Trigger' },
      Value: { part: 'Value' },
      Icon: { part: 'Icon' },
      Portal: { part: null },
      Content: {
        part: 'Content',
        classNameTo: 'Viewport',
        unsupported: {
          ...POSITIONING_PROPS,
          position: 'Tamagui Select always renders a floating list (or an adapted Sheet)',
        },
        // Tamagui's Select.Content props have no className (it still renders
        // the classes through the styled() wrapper).
        radixTypes: {
          ...POSITIONING_TYPES,
          position: '"item-aligned" | "popper"',
          className: 'string',
        },
      },
      Viewport: { part: 'Viewport' },
      Group: { part: 'Group' },
      Label: { part: 'Label' },
      Item: { part: 'Item' },
      ItemText: { part: 'ItemText' },
      ItemIndicator: { part: 'ItemIndicator' },
      ScrollUpButton: { part: 'ScrollUpButton' },
      ScrollDownButton: { part: 'ScrollDownButton' },
      Separator: { part: 'Separator' },
    },
    caveats: [
      'On native, Tamagui Select renders its items inline unless an `Adapt` target (e.g. a Sheet) is active; add `<Select.Adapt>` for a native picker experience.',
    ],
    cssVariables: {
      '--radix-select-trigger-width': null,
      '--radix-select-trigger-height': null,
      '--radix-select-content-available-height': null,
      '--radix-select-content-available-width': null,
      '--radix-select-content-transform-origin': null,
    },
  },
  {
    radix: 'Accordion',
    package: '@radix-ui/react-accordion',
    tamagui: 'Accordion',
    parts: {
      Root: { part: '' },
      Item: { part: 'Item' },
      Header: { part: 'Header' },
      Trigger: { part: 'Trigger', wrapsText: true },
      Content: { part: 'Content', wrapsText: true },
    },
    cssVariables: {
      '--radix-accordion-content-height': null,
      '--radix-accordion-content-width': null,
    },
  },
  {
    radix: 'RadioGroup',
    package: '@radix-ui/react-radio-group',
    tamagui: 'RadioGroup',
    parts: {
      Root: { part: '' },
      Item: { part: 'Item' },
      Indicator: { part: 'Indicator' },
    },
  },
  {
    radix: 'Slider',
    package: '@radix-ui/react-slider',
    tamagui: 'Slider',
    parts: {
      Root: { part: '' },
      Track: { part: 'Track' },
      Range: { part: 'TrackActive' },
      Thumb: { part: 'Thumb', propFromKey: 'index' },
    },
  },
  {
    radix: 'Avatar',
    package: '@radix-ui/react-avatar',
    tamagui: 'Avatar',
    parts: {
      Root: { part: '' },
      Image: { part: 'Image' },
      Fallback: {
        part: 'Fallback',
        wrapsText: true,
        rename: { delayMs: 'delay' },
        radixTypes: { delayMs: 'number' },
      },
    },
  },
  {
    radix: 'ToggleGroup',
    package: '@radix-ui/react-toggle-group',
    tamagui: 'ToggleGroup',
    parts: {
      Root: { part: '' },
      Item: { part: 'Item', wrapsText: true },
    },
  },
  {
    // No v3 docs page; parts and props from @tamagui/collapsible's types.
    radix: 'Collapsible',
    package: '@radix-ui/react-collapsible',
    tamagui: 'Collapsible',
    parts: {
      Root: { part: '' },
      Trigger: { part: 'Trigger', wrapsText: true },
      Content: { part: 'Content', wrapsText: true },
      CollapsibleTrigger: { part: 'Trigger', wrapsText: true },
      CollapsibleContent: { part: 'Content', wrapsText: true },
    },
  },
]

export function findMapping(radixExport: string): RadixMapping | undefined {
  return RADIX_MAPPINGS.find((m) => m.radix === radixExport)
}

export function findMappingByPackage(pkg: string): RadixMapping | undefined {
  return RADIX_MAPPINGS.find((m) => m.package === pkg)
}

/**
 * A Radix primitive with no Tamagui counterpart that is small enough to
 * rebuild from `html.*` elements. The codemod writes `code` into the file under
 * the import's local name, so `Local.Root` and `typeof Local.Root` keep working.
 */
export interface LocalComponent {
  /** Export name in the unified `radix-ui` package. */
  radix: string
  /** Standalone package, e.g. `@radix-ui/react-toggle`. */
  package: string
  /**
   * Source of the replacement. `$LOCAL` is the import's local name; `$HTML`,
   * `$COMPONENT_PROPS` and `$USE_STATE` are replaced with the names in scope for
   * `html`, `React.ComponentProps` and `React.useState`.
   */
  code: string
}

export const LOCAL_COMPONENTS: LocalComponent[] = [
  {
    radix: 'Toggle',
    package: '@radix-ui/react-toggle',
    // Same API and attributes as Radix Toggle.Root (pressed, defaultPressed,
    // onPressedChange; aria-pressed, data-state="on" | "off", data-disabled).
    code: `// Radix Toggle has no Tamagui counterpart: a button with a pressed state,
// setting the same aria-pressed and data-state attributes.
const $LOCAL = {
  Root: function ToggleRoot({
    pressed: pressedProp,
    defaultPressed = false,
    onPressedChange,
    onClick,
    ...props
  }: $COMPONENT_PROPS<typeof $HTML.button> & {
    pressed?: boolean
    defaultPressed?: boolean
    onPressedChange?: (pressed: boolean) => void
  }) {
    const [uncontrolled, setUncontrolled] = $USE_STATE(defaultPressed)
    const pressed = pressedProp ?? uncontrolled
    return (
      <$HTML.button
        type="button"
        aria-pressed={pressed}
        data-state={pressed ? "on" : "off"}
        data-disabled={props.disabled ? "" : undefined}
        onClick={(event) => {
          onClick?.(event)
          if (event?.defaultPrevented || props.disabled) return
          if (pressedProp === undefined) setUncontrolled(!pressed)
          onPressedChange?.(!pressed)
        }}
        {...props}
      />
    )
  },
}`,
  },
]

export function findLocalComponent(radixOrPackage: string): LocalComponent | undefined {
  return LOCAL_COMPONENTS.find(
    (c) => c.radix === radixOrPackage || c.package === radixOrPackage,
  )
}
