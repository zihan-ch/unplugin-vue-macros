# Getting Started

## Bundler integrations

### Installation

:::: code-group

::: code-group-item npm

```bash
npm i -D unplugin-vue-macros
```

:::

::: code-group-item yarn

```bash
yarn add -D unplugin-vue-macros
```

:::

::: code-group-item pnpm

```bash
pnpm add -D unplugin-vue-macros
```

:::

::::

:::: code-group

::: code-group-item Vite (first-class support)

```ts
// vite.config.ts
import VueMacros from 'unplugin-vue-macros/vite'
import Vue from '@vitejs/plugin-vue'
// import VueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
  plugins: [
    VueMacros({
      plugins: {
        vue: Vue(),
        // vueJsx: VueJsx(), // if needed
      },
    }),
  ],
})
```

:::

::: code-group-item Rollup (first-class support)

```ts
// rollup.config.js
import Vue from 'unplugin-vue/rollup'
import VueMacros from 'unplugin-vue-macros/rollup'

export default {
  plugins: [
    VueMacros({
      plugins: {
        vue: Vue(),
        // vueJsx: VueJsx(), // if needed
      },
    }),
  ],
}
```

:::

::: code-group-item esbuild

```js
// esbuild.config.js
import { build } from 'esbuild'

build({
  plugins: [
    require('unplugin-vue-macros/esbuild')({
      plugins: {
        vue: require('unplugin-vue/esbuild')(),
        // vueJsx: VueJsx(), // if needed
      },
    }),
  ],
})
```

:::

::: code-group-item Webpack

```js
// webpack.config.js
module.exports = {
  /* ... */
  plugins: [
    require('unplugin-vue-macros/webpack')({
      plugins: {
        vue: require('unplugin-vue/webpack')(),
        // vueJsx: VueJsx(), // if needed
      },
    }),
  ],
}
```

:::

::::

## TypeScript Support

```json
// tsconfig.json
{
  "compilerOptions": {
    // ...
    "types": ["unplugin-vue-macros/macros-global" /* ... */]
  }
}
```

## Volar Support

For detailed configuration, please refer to the description of the specific macro.

```bash
npm i -D @vue-macros/volar
```

```json
// tsconfig.json
{
  "vueCompilerOptions": {
    "plugins": [
      "@vue-macros/volar/define-model",
      "@vue-macros/volar/short-vmodel"
      // ...more feature
    ]
    // ...
  }
}
```

:tada: Congratulations! You have successfully set up unplugin-vue-macros.

To learn more about the macros, please visit [All Macros](/macros/) :laughing:.
