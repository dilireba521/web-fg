export interface BaseButtonFormProps {
    options: LabelValueOptions,
    value: string | string[] | number | number[],
    change?: (val: string | string[] | number | number[]) => void,
    selectAllKey?: string | number,
}