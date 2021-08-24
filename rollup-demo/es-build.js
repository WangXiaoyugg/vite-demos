const txtOnloadPlugin = {
  name: 'example',
  setup (build) {
    const fs = require('fs')

    console.log(build.initialOptions)
    build.initialOptions.outdir = 'es-build'

    build.onResolve({ filter: /\.txt$/ }, args => ({
      path: args.path,
      namespace: 'txt'
    }))

    build.onLoad({ filter: /\.*/, namespace: 'txt' }, async (args) => {
      const text = await fs.promises.readFile(args.path, 'utf-8')
      return {
        contents: `export default ${
            JSON.stringify([...text.split(/\s+/), 'Hello'])
        }`
      }
    })
  }
}

require('esbuild')
  .build({
    entryPoints: ['esbuild-test.js'],
    bundle: true,
    outdir: 'dist',
    loader: {
      '.png': 'dataurl'
    },
    plugins: [txtOnloadPlugin]
  })
  .catch(() => {
    process.exit(1)
  })
