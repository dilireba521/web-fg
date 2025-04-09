<script setup>
import { ref, watch } from 'vue'
const emit = defineEmits(['change', 'update:active'])
const props = defineProps({
    list: {
        type: Array,
        default: () => [
            {
                label: '标签1',
                value: '1'
            },
            {
                label: '标签2',
                value: '2'
            }
        ]
    },
    active: {
        type: String,
        default: '1'
    },
    size: { // 大还是小,一级菜单小，二级菜单大
        type: String,
        default: 'default',
        validator: (value) => {
            return ['default', 'large'].includes(value)
        }
    },
    type: { // 白色字还是黑色字
        type: String,
        default: 'default',
        validator: (value) => {
            return ['default', 'black'].includes(value)
        }
    }
})
const curActive = ref('')
watch(() => props.active, (val) => {
    curActive.value = val
}, { immediate: true })
function handleClick(data) {
    // console.log(data, curActive.value, props.active);
    // curActive.value = data.value
    emit('change', data.value)
    emit('update:active', data.value)
}
</script>
<template>
    <div class="tabs">
        <div @click="handleClick(item)" v-for="item in props.list" :key="item.value" :class="['tab-item font-h7', {
            active: item.value == curActive,
            large: props.size == 'large',
            black: props.type == 'black',
        }]">
            <div class="tab-inner">{{ item.label }}</div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.tabs {
    display: flex;

    .tab-item {
        display: flex;
        align-items: center;
        cursor: pointer;
        padding: 0 32px;
        height: 56px;
        color: rgba(@colorWhite, .88);

        &.large {
            height: 64px;
            padding: 0 40px;
        }

        &.black {
            color: rgba(@colorBlack, .88);
        }

        .tab-inner {
            padding: 8px 0;
            border-bottom: 1px solid transparent;
        }

        &.active {
            color: rgba(@colorWhite, 1);

            .tab-inner {
                border-bottom-color: rgba(@colorWhite, .88);
            }

            &.black {
                color: rgba(@colorBlack, 1);

                .tab-inner {
                    border-bottom-color: rgba(@colorBlack, .88);
                }
            }
        }

    }

}
</style>