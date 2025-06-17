<template>
    <div class="w-21 text-center hover:bg-dark/4 h-full flex items-center justify-center">
        <Dropdown placement="bottom" :overlayStyle="overlayStyle">
            <div class="h-full w-full justify-center flex items-center text-sm cursor-pointer border-dark">{{ userInfo?.name }}</div>
            <template #overlay>
                <Menu>
                    <Menu.Item key="2" @click="changePwd">修改密码</Menu.Item>
                    <Menu.Item key="1" @click="userStore.confirmLoginOut">退出登录</Menu.Item>
                </Menu>
            </template>
        </Dropdown>
        <Password ref="passwordRef"></Password>
    </div>
</template>
<script lang="tsx" setup>

import { ref } from 'vue'
import { Dropdown, Menu} from 'ant-design-vue'
import { useUserStore } from '@/store/modules/user'

import { Password } from "@/views/account/infoSetting/components/modules"
const userStore = useUserStore()
const userInfo = userStore.getUserInfo
const overlayStyle = {
    bottom:'20px'
}
const passwordRef = ref()
function changePwd() {
    passwordRef.value.visible = true
}

</script>