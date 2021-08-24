import { createVNode, defineComponent, VNodeTypes, PropType, Fragment, SetupContext } from 'vue'
import { useMDXComponents } from './context';
const TYPE_PROP_NAME = 'mdxType'

const DEFAULTS:any = {
    inlineCode: 'code',
    wrapper: (props: any, { slots }: SetupContext) => createVNode(Fragment, {}, slots.default && slots.default())
}

const MDXCreateElement = defineComponent({
    nmae: 'MDXCreateElement',
    props: {
        components: {
            type: Object as PropType<Record<string, VNodeTypes>>,
            default: () => ({})
        },
        originalType: String,
        mdxType: {
            type: String,
            required: true,
        },
        parentName: String,
    },
    setup(props, { slots }) {
        const componentsRef = useMDXComponents(() => props.components);
        const components = componentsRef.value;
        const { parentName, originalType, mdxType: type, ...etc } = props
        const Component = components[`${parentName}.${type}`] ||
            components[type] ||
            DEFAULTS[type] ||
            originalType
         return () => createVNode(Component, { ...etc }, slots.default && slots.default())
    }
})
// mdx自定义VNode 比如MDXLayout
export default function mdx(
    type: VNodeTypes,
    props: any,
    children: unknown,
    patchFlag?: number, 
    dynamicProps?: string[] | null, 
    isBlockNode?: boolean
) {
    let component = type;
    let newProps = props;
    const mdxType = props && props.mdxType;
    console.log("type:", type, mdxType);
    if (typeof type === 'string' || mdxType) {
        component = MDXCreateElement;
        newProps = {};
        for (let key in props) {
            if (Object.hasOwnProperty.call(props, key)) {
                newProps[key] = props[key]
            }
         }
         newProps.originalType = type;
         newProps[TYPE_PROP_NAME] = typeof type === 'string' ? type: mdxType;
    }
    return createVNode(component, newProps, children, patchFlag, dynamicProps, isBlockNode)
}