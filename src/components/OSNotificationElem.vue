<template>
    <div class="notification-elem">
        <div class="header-box">
            <img
                :src="getNotificationIcon(osPackageManage.getAppDescription(notification.packageID)!)"
                class="notification-icon"
            />
            <span
                class="notification-title"
            >{{ getLocalLanguage(osPackageManage.getAppDescription(notification.packageID)!.name) }}</span>
            <div class="flex-1"></div>
        </div>
        <div class="title-box" v-show="notification.title != undefined">{{ notification.title }}</div>
        <div class="content-box">{{ notification.content }}</div>
    </div>
</template>
<script  lang="ts" setup>
import { getLocalLanguage } from '../core/language';
import { osPackageManage } from '../core/service/os-package-manage';
import { getPackageIcon } from "../core/package";

const getNotificationIcon = (appDescription: AppDescription) => getPackageIcon(["simplify", "logo"], appDescription);

const { notification } = defineProps<{ notification: OSNotification }>();

</script>
<style lang="scss" scoped>
@import "/src/scss/utils/mixin/position.scss";
@import "/src/scss/utils/mixin/fix.scss";
@import "/src/scss/utils/mixin/shadow-border.scss";
@import "/src/scss/utils/mixin/font.scss";
.notification-elem {
    @include shadow-less;
    @include border-less;
    user-select: none;
    border-radius: 12px;
    backdrop-filter: blur(12px);
    background-color: #fff2;
    width: 100%;
    min-height: 70px;
    max-height: 130px;
    padding: 8px 5px 8px 12px;
    margin: 12px 12px 0 0;
    .header-box {
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: start;
        & > .notification-icon {
            width: 20px;
            height: 20px;
            border-radius: 3px;
            object-fit: contain;
        }
        & > .notification-title {
            @include subtitle1;
            margin-left: 5px;
            color: #ddde;
        }
    }
    .title-box {
        @include head1;
        margin-top: 2px;
        color: #ddd;
    }
    .content-box {
        @include boyd1;
        color: #ddd;
        margin-top: 3px;
    }
}
</style>