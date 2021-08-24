import { computed, defineComponent, PropType, provide, VNodeTypes, inject, Ref, SetupContext } from "vue"

export const contextKey = '__MDX_PROVIDER_KEY__'
export const MDXProvider = defineComponent({
    name: 'MDXProdiver',
    props: {
        components: {
            type: Object as PropType<Record<string, VNodeTypes>>,
            required: true,
        }
    },
    setup(props, { slots }: SetupContext) {
        const componentsRef = computed(() => props.components)
        provide(contextKey, componentsRef)
        return () => slots.default && slots.default()
    }
})

const defaultComponentsRef = computed(() => ({})) 

export const useMDXComponents = (
    getPropsComponents: () => Record<string, VNodeTypes>
): Ref<Record<string, VNodeTypes>> => {
    const providedComponentsRef = inject(contextKey, defaultComponentsRef)
    const mergedComponentsRef = computed(() => ({
        ...providedComponentsRef.value,
        ...getPropsComponents()
    }))
    return mergedComponentsRef;
}