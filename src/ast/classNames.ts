import {
  Node,
  type CallExpression,
  type Expression,
  type JsxAttribute,
  type JsxOpeningElement,
  type JsxSelfClosingElement,
  type NoSubstitutionTemplateLiteral,
  type StringLiteral,
} from 'ts-morph'
import { parseClass, splitClasses, type ClassToken } from '../tailwind/tokenize.js'

/** Function names treated as class-joining helpers (`cn("a", cond && "b")`). */
export const CLASS_HELPER_NAMES = new Set([
  'cn',
  'clsx',
  'cx',
  'twMerge',
  'twJoin',
  'classNames',
])

export type StaticString = StringLiteral | NoSubstitutionTemplateLiteral

export function isStaticString(node: Node | undefined): node is StaticString {
  return (
    !!node && (Node.isStringLiteral(node) || Node.isNoSubstitutionTemplateLiteral(node))
  )
}

export function getClassNameAttribute(
  element: JsxOpeningElement | JsxSelfClosingElement,
): JsxAttribute | undefined {
  for (const attr of element.getAttributes()) {
    if (Node.isJsxAttribute(attr) && attr.getNameNode().getText() === 'className')
      return attr
  }
  return undefined
}

/** The expression a `className` attribute holds (string literal or `{expr}`). */
export function getAttributeExpression(attr: JsxAttribute): Expression | undefined {
  const init = attr.getInitializer()
  if (!init) return undefined
  if (Node.isStringLiteral(init)) return init
  if (Node.isJsxExpression(init)) return init.getExpression()
  return undefined
}

export function isClassHelperCall(node: Node | undefined): node is CallExpression {
  if (!node || !Node.isCallExpression(node)) return false
  const callee = node.getExpression()
  return Node.isIdentifier(callee) && CLASS_HELPER_NAMES.has(callee.getText())
}

/**
 * String literals that always contribute classes: the attribute value itself,
 * or the unconditional string arguments of a top-level `cn()`-style call.
 */
export function getUnconditionalStrings(expr: Expression | undefined): StaticString[] {
  if (!expr) return []
  if (isStaticString(expr)) return [expr]
  if (isClassHelperCall(expr)) {
    return expr.getArguments().filter((arg): arg is StaticString => isStaticString(arg))
  }
  return []
}

/** Parsed unconditional classes of an element. */
export function getUnconditionalClasses(
  element: JsxOpeningElement | JsxSelfClosingElement,
): ClassToken[] {
  const attr = getClassNameAttribute(element)
  if (!attr) return []
  const tokens: ClassToken[] = []
  for (const literal of getUnconditionalStrings(getAttributeExpression(attr))) {
    for (const raw of splitClasses(literal.getLiteralText())) {
      const token = parseClass(raw)
      if (token) tokens.push(token)
    }
  }
  return tokens
}

/** Replace a string literal's value, keeping its quote style. */
export function setStringValue(literal: StaticString, value: string): void {
  if (Node.isNoSubstitutionTemplateLiteral(literal)) {
    literal.replaceWithText(
      `\`${value.replace(/[`\\]/g, '\\$&').replace(/\$\{/g, '\\${')}\``,
    )
    return
  }
  literal.setLiteralValue(value)
}

/** A piece of source text that holds Tailwind classes. */
export interface ClassSource {
  node: Node
  /** Class text; template substitutions are replaced with a space. */
  text: string
  /** Template substitutions glued to class text, e.g. `bg-${color}-500`. */
  interpolations: string[]
}

function templateSource(node: Node): ClassSource | undefined {
  if (!Node.isTemplateExpression(node)) return undefined
  // Mark each substitution with a sentinel, then split into words. A word that
  // is only a substitution (`${className}`) is opaque and skipped; a word that
  // mixes text and a substitution (`text-${color}-500`) is an interpolation and
  // is left out of the analyzed text.
  const spans = node.getTemplateSpans()
  let joined = node.getHead().getLiteralText()
  spans.forEach((span, index) => {
    joined += `\uE000${index}\uE000${span.getLiteral().getLiteralText()}`
  })
  const classes: string[] = []
  const interpolations: string[] = []
  for (const word of joined.split(/\s+/).filter(Boolean)) {
    if (!word.includes('\uE000')) {
      classes.push(word)
    } else if (!/^\uE000\d+\uE000$/.test(word)) {
      interpolations.push(
        word.replace(
          /\uE000(\d+)\uE000/g,
          (_, i: string) => `\${${spans[Number(i)]!.getExpression().getText()}}`,
        ),
      )
    }
  }
  return { node, text: classes.join(' '), interpolations }
}

/**
 * Class sources reachable from an expression through class-joining syntax:
 * `cn()`/`clsx()` arguments, conditional branches, `&&`/`||`/`??` operands,
 * arrays, clsx object keys and template literals. Comparison operands,
 * object values, other function calls and so on are not classes.
 */
export function classSourcesIn(expr: Node | undefined): ClassSource[] {
  if (!expr) return []
  if (isStaticString(expr))
    return [{ node: expr, text: expr.getLiteralText(), interpolations: [] }]
  const template = templateSource(expr)
  if (template) return [template]
  if (
    Node.isParenthesizedExpression(expr) ||
    Node.isAsExpression(expr) ||
    Node.isNonNullExpression(expr) ||
    Node.isSatisfiesExpression(expr)
  ) {
    return classSourcesIn(expr.getExpression())
  }
  if (Node.isConditionalExpression(expr)) {
    return [...classSourcesIn(expr.getWhenTrue()), ...classSourcesIn(expr.getWhenFalse())]
  }
  if (Node.isBinaryExpression(expr)) {
    const op = expr.getOperatorToken().getText()
    if (op === '&&') return classSourcesIn(expr.getRight())
    if (op === '||' || op === '??' || op === '+') {
      return [...classSourcesIn(expr.getLeft()), ...classSourcesIn(expr.getRight())]
    }
    return []
  }
  if (isClassHelperCall(expr))
    return expr.getArguments().flatMap((arg) => classSourcesIn(arg))
  if (Node.isArrayLiteralExpression(expr))
    return expr.getElements().flatMap((el) => classSourcesIn(el))
  if (Node.isObjectLiteralExpression(expr)) {
    return expr.getProperties().flatMap((prop) => {
      if (!Node.isPropertyAssignment(prop)) return []
      const name = prop.getNameNode()
      return isStaticString(name)
        ? [{ node: name, text: name.getLiteralText(), interpolations: [] }]
        : []
    })
  }
  return []
}

/** `{ variants: { size: { sm: "..." } }, compoundVariants: [{ class: "..." }] }` */
function variantConfigSources(config: Node | undefined): ClassSource[] {
  if (!config || !Node.isObjectLiteralExpression(config)) return []
  const out: ClassSource[] = []
  const variants = config.getProperty('variants')
  if (variants && Node.isPropertyAssignment(variants)) {
    const groups = variants.getInitializer()
    if (groups && Node.isObjectLiteralExpression(groups)) {
      for (const group of groups.getProperties()) {
        if (!Node.isPropertyAssignment(group)) continue
        const options = group.getInitializer()
        if (!options || !Node.isObjectLiteralExpression(options)) continue
        for (const option of options.getProperties()) {
          if (Node.isPropertyAssignment(option))
            out.push(...classSourcesIn(option.getInitializer()))
        }
      }
    }
  }
  const compound = config.getProperty('compoundVariants')
  if (compound && Node.isPropertyAssignment(compound)) {
    const list = compound.getInitializer()
    if (list && Node.isArrayLiteralExpression(list)) {
      for (const entry of list.getElements()) {
        if (!Node.isObjectLiteralExpression(entry)) continue
        for (const key of ['class', 'className']) {
          const prop = entry.getProperty(key)
          if (prop && Node.isPropertyAssignment(prop))
            out.push(...classSourcesIn(prop.getInitializer()))
        }
      }
    }
  }
  return out
}

function calleeName(call: CallExpression): string | undefined {
  const callee = call.getExpression()
  return Node.isIdentifier(callee) ? callee.getText() : undefined
}

/**
 * Every class source in a file: `className`-like JSX attributes, `cn()`-style
 * calls, `cva()` bases and variants, and `styled(Component, "...", { variants })`
 * from `@tamagui/tailwind`. Each literal is returned once.
 */
export function collectClassSources(
  sourceFile: Node,
  names: { cva?: ReadonlySet<string>; styled?: ReadonlySet<string> } = {},
): ClassSource[] {
  const seen = new Set<Node>()
  const out: ClassSource[] = []
  const add = (sources: ClassSource[]) => {
    for (const source of sources) {
      if (seen.has(source.node)) continue
      seen.add(source.node)
      out.push(source)
    }
  }
  const cva = names.cva ?? new Set(['cva'])
  const styled = names.styled ?? new Set<string>()
  sourceFile.forEachDescendant((node) => {
    if (Node.isJsxAttribute(node) && /className$/i.test(node.getNameNode().getText())) {
      add(classSourcesIn(getAttributeExpression(node)))
    } else if (Node.isCallExpression(node)) {
      const name = calleeName(node)
      if (!name) return
      if (CLASS_HELPER_NAMES.has(name)) add(classSourcesIn(node))
      else if (cva.has(name)) {
        const [base, config] = node.getArguments()
        add([...classSourcesIn(base), ...variantConfigSources(config)])
      } else if (styled.has(name)) {
        const [, base, config] = node.getArguments()
        add([...classSourcesIn(base), ...variantConfigSources(config)])
      }
    }
  })
  return out
}
