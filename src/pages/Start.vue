<template>
    <div class="login-box">
        <div
            class="background-image"
            :style="{
                'background-image': `url('${backgroundImage}')`
            }"
        ></div>
        <router-view name="LoginMainView"></router-view>
    </div>
</template>

<script setup lang="ts">
import { ref } from '@vue/reactivity';
import { userManage } from '../core/service/user-manage';
import { imagePath } from '../public';
import { toDesktop, toSignIn } from '../router';
const backgroundImage = ref(`${imagePath}background.jpg`);

if (userManage.loginUser.value != undefined) {
    toDesktop();
} else {
    toSignIn();
}

</script>

<style lang="scss" scoped>
@import "/src/scss/space.scss";
@import "/src/scss/utils/mixin/center.scss";
@import "/src/scss/utils/mixin/shadow-border.scss";
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