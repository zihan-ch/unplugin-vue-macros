import MagicStringBase from 'magic-string'
import type { OverwriteOptions } from 'magic-string'
import type { Node } from '@babel/types'
import type { SgNode } from '@ast-grep/napi'

export class MagicString extends MagicStringBase {
  removeNode(node: Node, { offset = 0 }: { offset?: number } = {}) {
    this.remove(offset + node.start!, offset + node.end!)
    return this
  }

  removeSg(node: SgNode, { offset = 0 }: { offset?: number } = {}) {
    const rng = node.range()
    this.remove(offset + rng.start.index, offset + rng.end.index)
    return this
  }

  moveNode(
    node: Node,
    index: number,
    { offset = 0 }: { offset?: number } = {}
  ) {
    this.move(offset + node.start!, offset + node.end!, index)
    return this
  }

  moveSg(
    node: SgNode,
    index: number,
    { offset = 0 }: { offset?: number } = {}
  ) {
    const rng = node.range()
    this.move(offset + rng.start.index, offset + rng.end.index, index)
    return this
  }

  sliceNode(node: Node, { offset = 0 }: { offset?: number } = {}) {
    return this.slice(offset + node.start!, offset + node.end!)
  }

  sliceSg(node: SgNode, { offset = 0 }: { offset?: number } = {}) {
    const rng = node.range()
    return this.slice(offset + rng.start.index, offset + rng.end.index)
  }

  overwriteNode(
    node: Node,
    content: string | Node,
    { offset = 0, ...options }: OverwriteOptions & { offset?: number } = {}
  ) {
    const _content =
      typeof content === 'string' ? content : this.sliceNode(content)
    this.overwrite(offset + node.start!, offset + node.end!, _content, options)
    return this
  }

  overwriteSg(
    node: SgNode,
    content: string | SgNode,
    { offset = 0, ...options }: OverwriteOptions & { offset?: number } = {}
  ) {
    const _content =
      typeof content === 'string' ? content : this.sliceSg(content)
    const rng = node.range()
    this.overwrite(
      offset + rng.start.index,
      offset + rng.end.index,
      _content,
      options
    )
    return this
  }
}
