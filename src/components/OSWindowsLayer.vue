<template>
    <transition-group name="windowsTransition">
        <div
            class="alos-window"
            v-for="value,uuid in alosWindows "
            :style="{
                ...value.toPosStyle()
            }"
            @mousedown="(e) => handelDownWindow(e, value, undefined)"
            :key="value.task.pid"
        >
            <div
                class="alos-window-ui-box"
                :class="[value.task.config.showWindowBorder ? `border` : ``, value.task.config.showWindowBorder ? `use-statebar` : `no-statebar`]"
            >
                <div
                    class="alos-window-state-bar"
                    @mousedown.self="(e) => handelDownWindow(e, value, MouseConState.windowMove)"
                    @dblclick.self="(e) => handelFullScreenWindow(value)"
                >
                    <div class="alos-window-button close" @click="(e) => handelCloseWindow(value)"></div>
                    <div class="alos-window-button mini"></div>
                    <div
                        class="alos-window-button big"
                        @click="(e) => handelFullScreenWindow(value)"
                    ></div>
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
                    <component
                        :pid="value.task.pid"
                        :is="(value.task.config as WindowComponentModeConfig).component"
                    ></component>
                </div>
            </div>
            <div
                @mousedown.stop="(e) => handelDownWindow(e, value, MouseConState.sizeConBR)"
                class="alos-window-size-con br"
            ></div>
            <div
                @mousedown.stop="(e) => handelDownWindow(e, value, MouseConState.sizeConBL)"
                class="alos-window-size-con bl"
            ></div>
            <div
                @mousedown.stop="(e) => handelDownWindow(e, value, MouseConState.sizeConTL)"
                class="alos-window-size-con tl"
            ></div>
            <div
                @mousedown.stop="(e) => handelDownWindow(e, value, MouseConState.sizeConTR)"
                class="alos-window-size-con tr"
            ></div>
        </div>
    </transition-group>
</template>
<script  lang="ts" setup>
import { computed, reactive } from '@vue/reactivity';
import { onMounted, onUnmounted } from '@vue/runtime-core';
import { Ref, ref, shallowRef } from 'vue';
import { osTaskManage, TaskManageEvent } from '../core/service/os-task-manage';
import { ALOSWindow, WindowMode, windowsManage } from '../core/service/window-manage';
enum MouseConState {
    sizeConBR,
    sizeConBL,
    sizeConTR,
    sizeConTL,
    windowMove
}
function handelMoveWindow(event: MouseEvent) {
    if (activeALOSWindow.value != undefined) {
        switch (mouseConState.value) {
            case MouseConState.sizeConBR:
                activeALOSWindow.value.width += event.movementX;
                activeALOSWindow.value.height += event.movementY;
                break;
            case MouseConState.sizeConBL:
                activeALOSWindow.value.x += event.movementX;
                activeALOSWindow.value.height += event.movementY;
                activeALOSWindow.value.width += -event.movementX;
                break;
            case MouseConState.sizeConTR:
                activeALOSWindow.value.width += event.movementX;
                activeALOSWindow.value.y += event.movementY;
                activeALOSWindow.value.height += -event.movementY;
                break;
            case MouseConState.sizeConTL:
                activeALOSWindow.value.x += event.movementX;
                activeALOSWindow.value.y += event.movementY;
                activeALOSWindow.value.width += -event.movementX;
                activeALOSWindow.value.height += -event.movementY;
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

function handelDownWindow(event: MouseEvent, alosWindow: ALOSWindow, mstate: MouseConState | undefined) {
    windowsManage.windowToTopLayer(alosWindow);
    (activeALOSWindow.value as ALOSWindow) = alosWindow;
    if (mstate != undefined) {
        mouseConState.value = mstate;
    }
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

        &.use-statebar {
            & > .alos-window-frame,
            & > .alos-window-component {
                top: $windowBarHeight !important;
            }
        }
        &.no-statebar {
            .alos-window-state-bar {
                display: none !important;
            }
        }

        &.border {
            border: 1px solid #fff;
        }

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
        }

        & > .alos-window-frame {
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
        &.br {
            cursor: nwse-resize;
            right: $windowSizeConPos;
            bottom: $windowSizeConPos;
        }
        &.tl {
            cursor: nw-resize;
            left: $windowSizeConPos;
            top: $windowSizeConPos;
        }
        &.tr {
            cursor: ne-resize;
            right: $windowSizeConPos;
            top: $windowSizeConPos;
        }
        &.bl {
            cursor: sw-resize;
            bottom: $windowSizeConPos;
            left: $windowSizeConPos;
        }
    }
}
</style>