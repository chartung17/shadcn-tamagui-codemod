import {
  Node,
  type JsxAttribute,
  type JsxOpeningElement,
  type JsxSelfClosingElement,
  type SourceFile,
} from 'ts-morph'

export type ElementNode = JsxOpeningElement | JsxSelfClosingElement

export function collectElements(sourceFile: SourceFile): ElementNode[] {
  const out: ElementNode[] = []
  sourceFile.forEachDescendant((node) => {
    if (Node.isJsxOpeningElement(node) || Node.isJsxSelfClosingElement(node))
      out.push(node)
  })
  return out
}

export function getAttribute(
  element: ElementNode,
  name: string,
): JsxAttribute | undefined {
  for (const attr of element.getAttributes()) {
    if (Node.isJsxAttribute(attr) && attr.getNameNode().getText() === name) return attr
  }
  return undefined
}

/** Rename an element's tag, including its closing tag. */
export function renameElement(element: ElementNode, name: string): void {
  element.getTagNameNode().replaceWithText(name)
  if (Node.isJsxOpeningElement(element)) {
    const parent = element.getParent()
    if (Node.isJsxElement(parent))
      parent.getClosingElement().getTagNameNode().replaceWithText(name)
  }
}

/** Insert `name={expression}` as the element's first attribute. */
export function addAttribute(
  element: ElementNode,
  name: string,
  expression: string,
  index = 0,
): void {
  element.insertAttribute(index, { name, initializer: `{${expression}}` })
}

/** Name of the function component that contains `node`, if any. */
export function enclosingComponentName(node: Node): string | undefined {
  for (const ancestor of node.getAncestors()) {
    if (Node.isFunctionDeclaration(ancestor)) return ancestor.getName()
    if (Node.isArrowFunction(ancestor) || Node.isFunctionExpression(ancestor)) {
      const parent = ancestor.getParent()
      if (Node.isVariableDeclaration(parent)) return parent.getName()
    }
  }
  return undefined
}
