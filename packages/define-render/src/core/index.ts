import {
  DEFINE_RENDER,
  MagicString,
  getLang,
  getTransformResult,
  sg,
} from '@vue-macros/common'

export const transfromDefineRender = (code: string, id: string) => {
  if (!code.includes(DEFINE_RENDER)) return

  const lang = getLang(id)
  const root = sg.parse(code, lang, { vue: 'jsx' })

  const nodes = root.findAll('defineRender($$$)')
  if (nodes.length === 0) return

  const s = new MagicString(code)

  for (const node of nodes) {
    const args = node.field('arguments')?.children()
    if (!args || args.length < 3 /* '(', first arg, ')' */)
      throw new SyntaxError(`bad arguments: ${node.text()}`)

    const [, arg] = args
    const argRng = arg.range()

    const parents = node.ancestors()
    if (parents[0].kind() !== 'expression_statement' || !parents[1]) {
      throw new SyntaxError(`bad case: ${node.text()}`)
    }

    // remove ReturnStatement of the parent
    const returnStmt = parents[1]
      .children()
      .find((n) => n.kind() === 'return_statement')

    if (returnStmt) s.removeSg(returnStmt)

    const lastChild = parents[1].children().at(-1)!
    const index = returnStmt
      ? returnStmt.range().start.index
      : lastChild.range()[lastChild.kind() === '}' ? 'start' : 'end'].index

    const shouldAddFn =
      !sg.isFunction(arg.kind()) && arg.kind() !== 'identifier'
    s.appendLeft(index, `return ${shouldAddFn ? '() => (' : ''}`)
    s.moveSg(arg, index)
    if (shouldAddFn) s.appendRight(index, `)`)

    const nodeRng = node.range()
    // removes `defineRender(`
    s.remove(nodeRng.start.index, argRng.start.index)
    // removes `)`
    s.remove(argRng.end.index, parents[0].range().end.index)
  }

  return getTransformResult(s, id)
}
