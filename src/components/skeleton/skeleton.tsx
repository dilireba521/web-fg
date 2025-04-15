import { defineComponent, computed, unref } from "vue";
import { Skeleton, Empty, Tag } from "ant-design-vue";
import { baseSkeletonProps } from "./props"
import type { BaseSkeletonProps } from "./types/type"
export default defineComponent({
    props: baseSkeletonProps(),
    setup(props: BaseSkeletonProps, { attrs, slots }) {
        const emptyProps = props.emptyProps || {}
        const getBindValues = computed(() => {
            return {
                ...attrs,
                active: props.active,
                loading: props.loading,
                paragraph: props.paragraph,
            }
        })
        return () => {
            return (
                <Skeleton {...getBindValues.value}>
                    {props?.showEmpty ? <Empty {...emptyProps} /> : slots.default?.()}
                </Skeleton>
            )
        }
    }
})