<template>
    <div
        class="window"
        v-for="value,uuid in windows "
        :style="{
            left: `${value.x}px`,
            top: `${value.y}px`,
            width: `${value.width}px`,
            height: `${value.height}px`,
        }"
        @mousedown=""
    >
        <div class="window-state-bar"></div>
        <div v-if="value.task.windowMode == WindowMode.frame" class="window-frame">
            <iframe :src="(value.task.config as WindowFrameModeConfig).startUrl"></iframe>
        </div>
    </div>
</template>
<script  lang="ts" setup>

import { computed } from '@vue/reactivity';
import { WindowMode, windowsManage } from '../core/service/window-manage';
const windows = computed(() => windowsManage.alosWindowMap.values());

function handelDownWindow(){}

</script>
<style lang="scss" scoped>
.window {
    position: absolute;
    border: 1px solid #0001;
    border-radius: 8px;
    overflow: hidden;
    &>.window-state-bar{
        height: 22px;
        width: 100%;
        background-color: #fff;
    }
    & > .window-frame {
        width: 100%;
        height: 100%;
        iframe {
            width: 100%;
            height: 100%;
        }
    }
}
</style>