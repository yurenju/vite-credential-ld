# Issue with `@veramo/credential-ld` in a Vite Environment

## Introduction

This project aims to demonstrate an issue with `@veramo/credential-ld` when running in a Vite environment. Specifically, the issue prevents `@veramo/credential-ld` from functioning correctly in a browser context.

## Environment Information

- Vite Version: 4.4.9
- Node.js Version: v18.17.0

## Steps to Reproduce

To reproduce the issue, execute the following shell commands:

```shell
$ npm install
$ npm run dev
```

After running the above commands, the following error appears in the console (based on my testing environment):

```
✘ [ERROR] Failed to resolve entry for package "@digitalcredentials/open-badges-context". The package may have incorrect main/module/exports specified in its package.json. [plugin vite:dep-pre-bundle]

    node_modules/esbuild/lib/main.js:1373:21:
      1373 │         let result = await callback({
           ╵                      ^

    at packageEntryFailure (file:///Users/yurenju/src/yurenju/vite-credential-ld/node_modules/vite/dist/node/chunks/dep-df561101.js:28691:11)
    at resolvePackageEntry (file:///Users/yurenju/src/yurenju/vite-credential-ld/node_modules/vite/dist/node/chunks/dep-df561101.js:28688:5)
    at tryNodeResolve (file:///Users/yurenju/src/yurenju/vite-credential-ld/node_modules/vite/dist/node/chunks/dep-df561101.js:28419:20)
    at Context.resolveId (file:///Users/yurenju/src/yurenju/vite-credential-ld/node_modules/vite/dist/node/chunks/dep-df561101.js:28180:28)
    at Object.resolveId (file:///Users/yurenju/src/yurenju/vite-credential-ld/node_modules/vite/dist/node/chunks/dep-df561101.js:44207:64)
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
    at async file:///Users/yurenju/src/yurenju/vite-credential-ld/node_modules/vite/dist/node/chunks/dep-df561101.js:65837:21
    at async file:///Users/yurenju/src/yurenju/vite-credential-ld/node_modules/vite/dist/node/chunks/dep-df561101.js:39941:34
    at async requestCallbacks.on-resolve (/Users/yurenju/src/yurenju/vite-credential-ld/node_modules/esbuild/lib/main.js:1373:22)
    at async handleRequest (/Users/yurenju/src/yurenju/vite-credential-ld/node_modules/esbuild/lib/main.js:729:13)

  This error came from the "onResolve" callback registered here:

    node_modules/esbuild/lib/main.js:1292:20:
      1292 │       let promise = setup({
           ╵                     ^

    at setup (file:///Users/yurenju/src/yurenju/vite-credential-ld/node_modules/vite/dist/node/chunks/dep-df561101.js:39921:19)
    at handlePlugins (/Users/yurenju/src/yurenju/vite-credential-ld/node_modules/esbuild/lib/main.js:1292:21)
    at buildOrContextImpl (/Users/yurenju/src/yurenju/vite-credential-ld/node_modules/esbuild/lib/main.js:978:5)
    at Object.buildOrContext (/Users/yurenju/src/yurenju/vite-credential-ld/node_modules/esbuild/lib/main.js:786:5)
    at /Users/yurenju/src/yurenju/vite-credential-ld/node_modules/esbuild/lib/main.js:2186:68
    at new Promise (<anonymous>)
    at Object.context (/Users/yurenju/src/yurenju/vite-credential-ld/node_modules/esbuild/lib/main.js:2186:27)
    at Object.context (/Users/yurenju/src/yurenju/vite-credential-ld/node_modules/esbuild/lib/main.js:2026:58)
    at prepareEsbuildOptimizerRun (file:///Users/yurenju/src/yurenju/vite-credential-ld/node_modules/vite/dist/node/chunks/dep-df561101.js:45967:35)

  The plugin "vite:dep-pre-bundle" was triggered by this import

    node_modules/@digitalcredentials/vc/lib/legacyDocumentLoader.js:6:22:
      6 │ const obCtx = require('@digitalcredentials/open-badges-context');
```

This is actually an issue with `@digitalcredentials/open-badges-context`, which has an incorrect `module` property specified in its `package.json`.

Even after manually changing the `module` path in `package.json` from:

```json
"module": "./dist/context.esm.js",
```

to:

```json
"module": "./dist/context.js",
```

the application runs, but another issue arises when opened in a browser:

```
Uncaught TypeError: Cannot read properties of undefined (reading 'Ed25519Signature2020')
    at index.js:2:47
```
