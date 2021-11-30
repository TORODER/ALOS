<template>
    <div
        class="alos-window"
        v-for="value,uuid in alosWindows "
        :style="{
            left: `${value.x}px`,
            top: `${value.y}px`,
            width: `${value.width}px`,
            height: `${value.height}px`,
            zIndex: alosWindowStateMap.get(value)?.zindex ?? defZindex
        }"
        :key="value.task.pid"
        @mousedown="(e) => handelDownWindow(e, value, MouseConState.windowMove)"
    >
        <div class="alos-window-ui-box">
            <div class="alos-window-state-bar"></div>
            <div v-if="value.task.windowMode == WindowMode.frame" class="alos-window-frame">
                <iframe :src="(value.task.config as WindowFrameModeConfig).startUrl"></iframe>
                <div
                    v-if="mouseConState != undefined && activeALOSWindow != undefined"
                    class="alos-window-no-con"
                ></div>
            </div>
        </div>

        <div
            @mousedown.stop="(e) => handelDownWindow(e, value, MouseConState.sizeCon)"
            class="alos-window-size-con"
        ></div>
    </div>
</template>
<script  lang="ts" setup>

import { computed, reactive } from '@vue/reactivity';
import { onMounted, onUnmounted } from '@vue/runtime-core';
import { Ref, ref } from 'vue';
import { ALOSWindow, WindowMode, windowsManage } from '../core/service/window-manage';
const defZindex = 2;
interface ALOSWindowState {
    zindex: number
}
enum MouseConState {
    sizeCon,
    windowMove
}
function handelMoveWindow(event: MouseEvent) {
    if (activeALOSWindow.value != undefined) {
        switch (mouseConState.value) {
            case MouseConState.sizeCon:
                activeALOSWindow.value.width += event.movementX;
                activeALOSWindow.value.height += event.movementY;
                break;
            case MouseConState.windowMove:
                activeALOSWindow.value.x += event.movementX;
                activeALOSWindow.value.y += event.movementY;
                if (activeALOSWindow.value.x < 0) {
                    activeALOSWindow.value.x = 0
                }
                if (activeALOSWindow.value.y < 0) {
                    activeALOSWindow.value.y = 0
                }
                break;
        }
    }
}

function handelUpWindow(event: MouseEvent) {
    activeALOSWindow.value = undefined;
    mouseConState.value = undefined;
}


function handelDownWindow(event: MouseEvent, alosWindow: ALOSWindow, mstate: MouseConState) {
    createALOSWindowState(alosWindow);
    const alosWindowState = alosWindowStateMap.get(alosWindow)
    alosWindowState!.zindex = ++acc;
    activeALOSWindow.value = alosWindow;
    mouseConState.value = mstate;
}


function createALOSWindowState(alosWindow: ALOSWindow) {
    if (!alosWindowStateMap.has(alosWindow)) {
        alosWindowStateMap.set(alosWindow, reactive({ zindex: defZindex }));
    }
}

let mouseConState = ref<MouseConState | undefined>(undefined);
let activeALOSWindow = ref<ALOSWindow | undefined>(undefined);
let acc = defZindex;

const alosWindowStateMap = reactive(new Map<ALOSWindow, ALOSWindowState>());
const alosWindows = computed(() => Array.from(windowsManage.alosWindowMap.values()));

onMounted(() => {
    window.addEventListener("mousemove", handelMoveWindow)
    window.addEventListener("mouseup", handelUpWindow)
})

onUnmounted(() => {
    window.removeEventListener("mousemove", handelMoveWindow)
    window.removeEventListener("mouseup", handelUpWindow)
})

</script>
<style lang="scss" scoped>
@import "/src/scss/utils/mixin/position.scss";
@import "/src/scss/utils/mixin/fix.scss";
@import "/src/scss/utils/mixin/shadow-border.scss";
@import "/src/scss/utils/mixin/font.scss";
$windowSizeCon: 20px;
$windowSizeConPos: $windowSizeCon / -2;

$windowBarHeight: 24px;
.alos-window {
    @include shadow-less;
    position: absolute;
    &,
    * {
        transition: none;
    }
    .alos-window-ui-box {
        position: absolute;
        @include position-fill;
        border-radius: 8px;
        border: 1.2px solid #fff;
        overflow: hidden;
        & > .alos-window-state-bar {
            height: $windowBarHeight;
            width: 100%;
            background-color: #fff;
        }
        & > .alos-window-frame {
            position: absolute;
            @include position-fill;
            top: $windowBarHeight !important;
            background-color: #fff;
            iframe {
                border: 0;
                width: 100%;
                height: 100%;
            }
            .alos-window-no-con {
                @include position-fill;
                position: absolute;
            }
        }
    }
    & > .alos-window-size-con {
        position: absolute;
        background-color: transparent;
        width: $windowSizeCon;
        height: $windowSizeCon;
        z-index: 999;
        right: $windowSizeConPos;
        bottom: $windowSizeConPos;
    }
}
</style>