import { defineComponent } from 'vue'
import { Button } from 'ant-design-vue'
import { baseButtonFormProps } from './props'
export default defineComponent({
    props: baseButtonFormProps,
    emits: ['change', 'update:value'],
    setup(props, ctx) {
        function handleClick(data: any) {
            let _selected = data
            let _selectedValue = null
            if (typeof props.value === 'object' && props.value !== null) {
                // 是否支持全选
                if (props.selectAllKey) {
                    if (props.selectAllKey == data?.value) {
                        // 若已选中，则取消全选
                        if (props.value.includes(data?.value)) {
                            // 取消全选
                            clearAll()
                            return
                        } else {
                            // 全选
                            selectAll()
                            return
                        }
                    }
                }
                if (props.value?.length > 0) {
                    if (props.value.includes(data?.value)) {
                        _selectedValue = props.value.filter((item: any) => {
                            if (props.selectAllKey && item == props.selectAllKey) {
                                return false
                            } else {
                                return item !== data?.value
                            }
                        })

                    } else {
                        _selectedValue = [...props.value, data?.value]
                        // 所有项都被选中时，勾选全选
                        if (props.selectAllKey && _selectedValue.length == props.options.length - 1) {
                            _selectedValue.push(props.selectAllKey as any)
                        }
                    }
                } else {
                    _selectedValue = [data?.value]
                }

            } else {
                _selectedValue = props.value == data?.value ? null : data?.value
            }
            ctx.emit('update:value', _selectedValue)
            // 若要返回所有选中项，可重新赋值
            ctx.emit('change', _selected)
        }
        function selectAll() {
            ctx.emit('update:value', props.options?.map((item: any) => item.value))
        }
        function clearAll() {
            ctx.emit('update:value', [])
        }
        ctx.expose({
            selectAll,
            clearAll
        })
        return () => <div>
            {
                props.options.map((item, index) => {
                    let _selected = false
                    if (typeof props.value === 'object' && props.value !== null) {
                        _selected = props.value?.includes(item.value)
                    } else {
                        _selected = props.value === item.value
                    }

                    return <Button
                        type={_selected ? 'primary' : 'default'}
                        onClick={() => handleClick(item)}
                        class={['min-w-25 mr-4', _selected ? 'text-white' : 'text-black/65%']}
                        key={index}>{item.label}</Button>
                })
            }
        </div>
    }
})