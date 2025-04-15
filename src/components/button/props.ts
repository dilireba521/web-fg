import { multiply } from "lodash-es";

export const baseButtonFormProps = {
    options: {
        type: Array as PropType<LabelValueOptions>,
        default: null,
    },
    value: {
        type: [String, Number, Array] as PropType<string | number | string[]>,
        default: null,
    },
    change: {
        type: Function as PropType<(val: string | number | string[]) => void>,
        default: null,
    },
    selectAllKey: {
       type: [String, Number] as PropType<string | number>,
       default: null,
    }
}