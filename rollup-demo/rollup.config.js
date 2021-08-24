// rollup.config.js
// const mode = process.env.MODE;
// const isDEV = mode === "DEV";
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
// import { terser } from 'rollup-plugin-terser';
import alias from '@rollup/plugin-alias'
import replace from '@rollup/plugin-replace'
import tsc from '@rollup/plugin-typescript'
// import strip from '@rollup/plugin-strip'
import image from '@rollup/plugin-image'
// import eslint from '@rollup/plugin-eslint'

const entry = 'index.js'
export default [
//   {
//     input: entry,
//     output: {
//       file: "dist/index.umd.js",
//       format: "umd",
//       name: "Index",
//     },
//     plugins: [ resolve(), commonjs(), json(), terser()],
//   },
  {
 	input: entry,
    output: {
      file: 'dist/index.es.js',
      format: 'es',
      name: 'Index',
      banner: '/** This is Banner wirte by Garen **/'
    },
    external: ['react'],
    plugins: [resolve(), commonjs(), tsc(), alias({
      entries: {
        a: './a'
      }

    }),
    replace({
      __TEST__: 123456,
      preventAssignment: true
    }),
    json(),
    image()
      // eslint({
      //   throwOnError: true
      // })
      // strip(),

      // terser()
    ]
  }
]
