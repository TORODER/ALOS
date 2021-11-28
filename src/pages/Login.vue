<template>
    <div class="login-box">
        <div
            class="background-image"
            :style="{
                'background-image': `url('${backgroundImage}')`
            }"
        ></div>
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
                <input type="text" placeholder="密码" />
            </div>
            <div class="space big"></div>
            <div class="next-button" @click="toOS">
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
    </div>
</template>

<script setup lang="ts">
import { ref } from '@vue/reactivity';
import { watch } from '@vue/runtime-core';
import { useRouter } from 'vue-router';
import { imagePath } from '../public';
const backgroundImage = ref(`${imagePath}login-background-1.jpg`);
const userImage = ref(`${imagePath}user-image.jpg`);
const account = ref("");
let showPassword = ref(false);
const router = useRouter();
watch([account], ([account]) => {
    showPassword.value = account.length > 0;
});

function toOS() {
    router.push("/desktop");
}

</script>

<style lang="scss" scoped>
@import "/src/scss/utils/space.scss";
@import "/src/scss/utils/mixin/center.scss";
@import "/src/scss/utils/mixin/shadow.scss";
@import "/src/scss/utils/mixin/position.scss";
@import "/src/scss/background.scss";
.login-box {
    width: 100%;
    height: 100%;
    @include flex-center;
    & > .background-image {
        @include position-fixed-fill;
        @include desktop-background;
        z-index: 1;
        background-size: cover;
    }
    & > .login-content {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        width: 200px;
        flex-direction: column;
        z-index: 2;
        user-select: none;
        & > .space {
            &.big {
                height: $spaceBig;
            }
            &.small {
                height: $spaceSmall;
            }
            height: $spaceAlone;
        }
        .input-box {
            @include flex-center;
            @include shadow-less;
            width: 175px;
            height: 35px;
            border-radius: 25px;
            overflow: hidden;
            backdrop-filter: blur(10px);
            background-color: #f0f0f011;
            border: 1px solid #0001;

            &.lock {
                opacity: 0.8;
            }
            &.noshow {
                opacity: 0;
                height: 0px;
            }
            &.show {
                opacity: 1;
            }

            input {
                background-color: transparent;
                width: 100%;
                border: 0px;
                padding: 7px 10px;
                color: #fff;
                font-size: 12px;
                letter-spacing: 0.3px;
                &::placeholder {
                    color: #fff;
                }
            }
        }

        .next-button {
            @include flex-center;
            @include shadow-less;
            border: 1px solid #0001;
            background-color: #f0f0f022;
            width: 40px;
            height: 40px;
            backdrop-filter: blur(10px);
            border-radius: 100%;
            font-weight: 600;
            stroke: #fff;
            stroke-width: 2px;
            padding: 8px;
        }

        .user-image {
            @include flex-center;
            @include shadow-less;
            width: 100px;
            height: 100px;
            border-radius: 100%;
            background-color: #fff;
            overflow: hidden;
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
    }
}
</style>