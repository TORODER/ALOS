<template>
    <div class="os-notification-box">
        <transition-group name="notificationElem">
            <OSNotificationElem
                v-for="notification in showOSNotifications"
                :notification="notification"
                :key="notification.nid"
            />
        </transition-group>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import OSNotificationElem from "./OSNotificationElem.vue";
import { osNotificationManage } from "../core/service/os-notification-manage";
const showCount = ref(3);
const showOSNotifications = computed(() => osNotificationManage.notifications.slice(0, showCount.value));
</script>

<style lang="scss" scoped>
@import "/src/scss/utils/mixin/position.scss";
@import "/src/scss/utils/mixin/fix.scss";
@import "/src/scss/utils/mixin/shadow-border.scss";
@import "/src/scss/utils/mixin/font.scss";
$notificationBoxWidth: max(min(16%, 350px), 260px);
.os-notification-box {
    z-index: 2;
    position: fixed;
    display: flex;
    right: 0;
    bottom: 0;
    top: 0;
    width: $notificationBoxWidth;
    flex-direction: column;
    justify-content: start;
    padding: 15px;
}

.notificationElem-enter-active,
.notificationElem-leave-active {
    transition: all 0.2s ease-in-out;
}
.notificationElem-enter-from,
.notificationElem-leave-to {
    opacity: 0;
    transform: translateY(30px);
}
</style>