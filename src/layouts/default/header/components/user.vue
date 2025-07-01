<template>
    <div class="min-w-11 max-w-21 text-center pl-2 hover:bg-dark/4 h-full flex items-center justify-center">
        <Dropdown placement="bottomRight" :overlayStyle="overlayStyle">
            <div class="h-full w-full justify-center flex items-center text-sm cursor-pointer border-dark ">
                <div class="truncate" :title="userInfo?.name"> {{ userInfo?.name
                }}</div>
               
            </div>
            <template #overlay>
                <Menu>
                    <Menu.Item key="2" @click="changePwd">
                        <div class="min-w-30">
                            <LockOutlined class="mr-1" />
                            修改密码
                        </div>
                    </Menu.Item>
                    <Menu.Item key="1" @click="openModal">
                        <div class="min-w-30">
                            <PoweroffOutlined class="mr-1" />
                            退出登录
                        </div>
                    </Menu.Item>
                </Menu>
            </template>
        </Dropdown>
        <Password ref="passwordRef"></Password>
        <loginOut ref="loginOutRef" />
    </div>
</template>
<script lang="tsx" setup>

import { ref } from 'vue'
import { Dropdown, Menu } from 'ant-design-vue'
import { useUserStore } from '@/store/modules/user'
import { PoweroffOutlined, LockOutlined } from '@ant-design/icons-vue'
import { Password } from "@/views/account/infoSetting/components/modules"
import loginOut from '@/views/login/loginOut'
const userStore = useUserStore()
const userInfo = userStore.getUserInfo
const overlayStyle = {
    bottom: '20px'
}
const passwordRef = ref()
const loginOutRef = ref()
function changePwd() {
    passwordRef.value.visible = true
}
function openModal() {
    console.log("defineExpose--", loginOutRef);

    loginOutRef.value?.openModal()
}


</script>