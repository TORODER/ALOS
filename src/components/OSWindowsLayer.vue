<template>
    <transition-group name="windowsTransition">
        <div
            class="alos-window"
            v-for="value,uuid in alosWindows "
            :style="{
                left: `${value.x}px`,
                top: `${value.y}px`,
                width: `${value.width}px`,
                height: `${value.height}px`,
                zIndex: value.zIndex
            }"
            :key="value.task.pid"
            @mousedown="(e) => handelDownWindow(e, value, MouseConState.windowMove)"
        >
            <div class="alos-window-ui-box">
                <div class="alos-window-state-bar">
                    <div class="alos-window-button close" @click="(e) => handelCloseWindow(value)"></div>
                    <div class="alos-window-button mini"></div>
                    <div class="alos-window-button big" @click="(e) => handelFullScreenWindow(value)"></div>
                </div>
                <div v-if="value.task.windowMode == WindowMode.frame" class="alos-window-frame">
                    <iframe :src="(value.task.config as WindowFrameModeConfig).startUrl"></iframe>
                    <div
                        v-if="mouseConState != undefined && activeALOSWindow != undefined"
                        class="alos-window-no-con"
                    ></div>
                </div>
                <div
                    v-else-if="value.task.windowMode == WindowMode.component"
                    class="alos-window-component"
                >
                    <component :is="(value.task.config as WindowComponentModeConfig).component"></component>
                </div>
            </div>
            <div
                @mousedown.stop="(e) => handelDownWindow(e, value, MouseConState.sizeCon)"
                class="alos-window-size-con"
            ></div>
        </div>
    </transition-group>
</template>
<script  lang="ts" setup>
import { computed, reactive } from '@vue/reactivity';
import { onMounted, onUnmounted } from '@vue/runtime-core';
import { Ref, ref, shallowRef } from 'vue';
import { osTaskManage, TaskManageEvent } from '../core/service/os-task-manage';
import { ALOSWindow, defZindex, WindowMode, windowsManage } from '../core/service/window-manage';
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
    windowsManage.windowToTopLayer(alosWindow);
    (activeALOSWindow.value as ALOSWindow) = alosWindow;
    mouseConState.value = mstate;
}

function handelCloseWindow(alosWindow: ALOSWindow) {
    osTaskManage.remove(alosWindow.task.pid);
}
function handelFullScreenWindow(alosWindow: ALOSWindow) {
    windowsManage.windowToFullScreen(alosWindow);
}

const mouseConState = ref<MouseConState | undefined>(undefined);
const activeALOSWindow = ref<ALOSWindow | undefined>(undefined);
const alosWindows = computed(() => Array.from(windowsManage.alosWindowMap.values()));

onMounted(() => {
    window.addEventListener("mousemove", handelMoveWindow)
    window.addEventListener("mouseup", handelUpWindow)
});

onUnmounted(() => {
    window.removeEventListener("mousemove", handelMoveWindow)
    window.removeEventListener("mouseup", handelUpWindow)
});

</script>
<style lang="scss" scoped>
@use "sass:math";

@import "/src/scss/utils/mixin/position.scss";
@import "/src/scss/utils/mixin/fix.scss";
@import "/src/scss/utils/mixin/shadow-border.scss";
@import "/src/scss/utils/mixin/font.scss";
@import "/src/scss/class/window.scss";

$windowSizeCon: 20px;
$windowSizeConPos: math.div($windowSizeCon, -2);
$windowBarHeight: 24px;

.windowsTransition-enter-active,
.windowsTransition-leave-active {
    transition: all 0.275s ease !important;
}
.windowsTransition-enter-from,
.windowsTransition-leave-to {
    transform: scale(0.3) rotate(25deg);
    opacity: 0;
}

.alos-window {
    position: absolute;
    min-width: 100px;
    min-height: 100px;
    &,
    * {
        transition: none;
    }

    .alos-window-ui-box {
        @include position-fill;
        @include alos-window-shadow;
        position: absolute;
        border-radius: 8px;
        overflow: hidden;
        border: 1px solid #fff;
        & > .alos-window-state-bar {
            height: $windowBarHeight;
            width: 100%;
            background-color: #fff;
            display: flex;
            align-items: center;
            padding: 0 5px;
            .alos-window-button {
                @include alos-window-button;
                margin-right: 5px;
                &.close {
                    background-color: #f33;
                }
                &.mini {
                    @include alos-window-button;
                    background-color: rgb(255, 224, 51);
                }
                &.big {
                    @include alos-window-button;
                    background-color: rgb(37, 209, 31);
                }
            }
        }
        & > .alos-window-frame,
        & > .alos-window-component {
            @include position-fill;
            position: absolute;
            top: $windowBarHeight !important;
            background-color: #fff;
        }

        & > .alos-window-frame {
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
        cursor: nwse-resize;
    }
}
</style>