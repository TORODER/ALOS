<template>
    <div class="login-content">
        <div class="user-image">
            <img :src="userImage" alt="user image" />
        </div>
        <div class="space big"></div>
        <div class="input-box" :class="[showPassword ? 'lock' : '']">
            <input v-model="account" type="text" placeholder="账号" />
        </div>
        <div class="space small"></div>
        <div class="input-box" :class="[showPassword ? 'show' : 'noshow']">
            <input type="text" v-model="passwd" placeholder="密码" />
        </div>
        <div class="space small"></div>
        <div class="input-box" :class="[showPassword ? 'show' : 'noshow']">
            <input type="text" v-model="emailcode" placeholder="邮箱验证码" />
        </div>
        <div class="space"></div>
        <div class="next-button" @click="sendEmailCode">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-arrow-narrow-right"
                width="44"
                height="44"
                viewBox="0 0 24 24"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <line x1="5" y1="12" x2="19" y2="12" />
                <line x1="15" y1="16" x2="19" y2="12" />
                <line x1="15" y1="8" x2="19" y2="12" />
            </svg>
        </div>
        <div class="space"></div>
        <div class="next-button" @click="toRegistered">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-arrow-narrow-right"
                width="44"
                height="44"
                viewBox="0 0 24 24"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <line x1="5" y1="12" x2="19" y2="12" />
                <line x1="15" y1="16" x2="19" y2="12" />
                <line x1="15" y1="8" x2="19" y2="12" />
            </svg>
        </div>
        <div class="space big"></div>
    </div>
</template>
<script setup lang="ts">
import { apiCodeDescribe } from '../core/api/config';
import sendemailcode from '../core/api/sendemailcode';
import registered from '../core/api/registered';
import { ref } from '@vue/reactivity';
import { imagePath } from '../public';
import { getLocalLanguage } from '../core/language';
import { osNotificationManage } from '../core/service/os-notification-manage';
import { osPackageDescription } from '../core/package/os.package';
import { toDesktop } from '../router';
import { userManage } from '../core/service/user-manage';
import { requestPackageOk } from '../core/api/utils/api';

const userImage = ref(`${imagePath}user-image.jpg`);
const account = ref("wst13362307472@163.com");
const passwd = ref("Aa123456");
let showPassword = ref(true);
let emailcode = ref("");

async function sendEmailCode() {
    const data = await sendemailcode(account.value);
    if (data.code === 2000) {
        osNotificationManage.pushNewOSNotification({
            "title": "发送验证码成功",
            "content": `验证码已经发送至 ${account.value}`,
            "packageID": osPackageDescription.packageID
        });
    } else {
        osNotificationManage.pushNewOSNotification({
            "title": "发送验证码失败",
            "content": `${getLocalLanguage(apiCodeDescribe(data.code))} Code:${data.code}`,
            "packageID": osPackageDescription.packageID
        });
    }
}

async function toRegistered() {
    const data = await registered(account.value, passwd.value, emailcode.value);
    if (requestPackageOk(data)) {
        osNotificationManage.pushNewOSNotification({
            "title": "注册成功",
            "content": `${account.value} 注册成功`,
            "packageID": osPackageDescription.packageID
        });
        const loginPackage = await userManage.signIn(account.value, passwd.value);
    } else {
        osNotificationManage.pushNewOSNotification({
            "title": "注册失败",
            "content": `${getLocalLanguage(apiCodeDescribe(data.code))}`,
            "packageID": osPackageDescription.packageID
        });
    }
}

</script>
<style scoped lang="scss">
@import "../scss/class/login-content.scss";
</style>