import { js, jsx, ts, tsx } from '@ast-grep/napi'

export const isFunction = (kind: string) => kind.includes('function')

export const langMap = {
  js,
  jsx,
  ts,
  tsx,
} as const
export type Lang = keyof typeof langMap

export const parse = (
  code: string,
  lang: string,
  langAlias: Record<string, Lang> = {}
) => {
  const alias: Record<string, Lang> = {
    cjs: 'js',
    mjs: 'js',
    cts: 'ts',
    mts: 'ts',
    ...langAlias,
  }
  const processor: typeof js =
    (langMap as any)[lang] || (langMap as any)[alias[lang]]
  if (!processor) throw new Error(`not supported lang: ${lang}`)
  return processor.parse(code).root()
}
