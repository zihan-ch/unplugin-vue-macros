import { resolve } from 'node:path'
import { describe, expect, it, test } from 'vitest'
import glob from 'fast-glob'
import {
  RollupEsbuildPlugin,
  RollupRemoveVueFilePathPlugin,
  RollupVue,
  RollupVueJsx,
  rollupBuild,
} from '@vue-macros/test-utils'
import { babelParse } from '@vue-macros/common'
import VueSetupComponent from '../src/rollup'
import { overwriteImportsPath } from '../src/core'

describe('setup-component', () => {
  describe('fixtutes', async () => {
    const root = resolve(__dirname, '..')
    const files = await glob('tests/fixtures/*.{vue,[jt]s?(x)}', {
      cwd: root,
      onlyFiles: true,
    })

    for (const file of files) {
      it(file.replace(/\\/g, '/'), async () => {
        const filepath = resolve(root, file)

        const code = await rollupBuild(filepath, [
          VueSetupComponent(),
          RollupVue(),
          RollupVueJsx(),
          RollupRemoveVueFilePathPlugin(),
          RollupEsbuildPlugin({
            target: 'esnext',
          }),
        ])
        expect(code).toMatchSnapshot()
      })
    }
  })

  test('overwriteImportsPath', () => {
    function testImport(code: string) {
      expect(
        overwriteImportsPath(code, babelParse(code).body as any[]).join('\n')
      ).matchSnapshot()
    }

    testImport(`import { a, b as c } from "./d";
import { a1, b2 as b3 } from "../d"`)
    testImport('import { a, b as c } from "ref"')
  })
})
