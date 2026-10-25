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
