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
        <div class="space big"></div>
        <div class="next-button" @click="signIn">
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

        <div class="next-button" @click="toSignUp">
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
import { reactive, ref } from '@vue/reactivity';
import { watch } from '@vue/runtime-core';
import { imagePath } from '../public';
import { toDesktop, toSignIn, toSignUp } from '../router';
import { getLocalLanguage } from '../core/language';
import { osNotificationManage } from '../core/service/os-notification-manage';
import { osPackageDescription } from '../core/package/os.package';
import { userManage } from '../core/service/user-manage';
import { requestPackageOk } from '../core/api/utils/api';

const userImage = ref(`${imagePath}user-image.jpg`);
const account = ref("wst13362307472@163.com");
const passwd = ref("Aa123456");

let showPassword = ref(account.value.length > 0);

const signIn = () => userManage.signIn(account.value, passwd.value);

watch(account, (account) => {
    showPassword.value = account.length > 0;
});
</script>
<style scoped lang="scss">
@import "../scss/class/login-content.scss";
</style>