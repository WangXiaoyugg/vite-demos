const { createCompiler } = require('@mdx-js/mdx')

const mdx = createCompiler()
console.log(mdx.processSync(`
import Button from 'button'

# Hello MDX

- first
- second

> do the best

<Button>Click Me</Button>

export const a = 100
`).contents)


// mdx.sync("# Hello MDX")编译后的jsx
/* @jsxRuntime classic */
/* @jsx mdx */
// const layoutProps = {

// };
// const MDXLayout = "wrapper"
// export default function MDXContent({
//   components,
//   ...props
// }) {
//   return <MDXLayout {...layoutProps} {...props} components={components} mdxType="MDXLayout">        
//     <h1>{`Hello MDX`}</h1>
//     </MDXLayout>;
// }

// ;
// MDXContent.isMDXComponent = true;