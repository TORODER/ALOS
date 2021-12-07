<template>
    <div class="desktop-box">
        <div
            class="background-image"
            :style="{
                'background-image': `url('${osDesktopBackround}')`
            }"
        ></div>
        <div class="desktop-windows-container">
            <OSWindowsLayer />
            <div
                class="taskbar-box"
                :ref="(refElem) => taskBarRef = refElem"
                :style="{
                    left: taskBarLeft == undefined ? `50%` : `${taskBarLeft}px`,
                }"
            >
                <div
                    class="taskbar-content"
                    @mousemove="taskbarMoveAnimation"
                    @mouseleave.self="taskbarMoveAnimation(undefined)"
                >
                    <div class="task-row">
                        <transition-group name="taskbarTaskTransition">
                            <div
                                class="task"
                                v-for="[dockElemKey, dockElem] in dockElemMap"
                                :key="dockElem.task.pid"
                                :ref="(e) => handelTaskDoms(e as any, dockElem.task)"
                                @click="() => handelOnClickTaskbarTask(dockElem.task.pid)"
                                :style="(taskStyle as any)"
                            >
                                <img
                                    :style="{
                                        transform: `scale(${1 + dockElem.scale * scaleMax}) translateZ(0) translateY(${dockElem.scale * translateYMax}px)`
                                    }"
                                    :src="osPackageManage.getAppDescription(dockElem.task.packageID)!.icon.taskbar"
                                />
                                <div class="presence-indicator"></div>
                            </div>
                        </transition-group>
                    </div>
                    <div
                        class="taskbar"
                        :style="{
                            width: taskBarWidth == undefined ? `0px` : `${taskBarWidth}px`
                        }"
                    ></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref, watch } from 'vue';
import { osPackageManage } from '../core/service/os-package-manage';
import { windowsManage, WindowsManageEventType } from '../core/service/window-manage';
import { imagePath } from '../public';
import OSWindowsLayer from "../components/OSWindowsLayer.vue"
import { late, lateDuration } from '../core/utils/async';
import { ListenerEvent } from '../core/listener';
import { osSettingManage } from "../core/service/os-setting-manage";
const osDesktopBackround = osSettingManage.desktopBackground;
const dockElemMap = windowsManage.dockElemMap;
const scaleMax = .28;
const translateYMax = -12;
const taskBarRef = ref();
const taskBarLeft = ref<number | undefined>(undefined);
const taskBarWidth = ref<number | undefined>(undefined);
const taskDoms: PIDMap<Element> = new Map();
const taskStyle = { "--duration": 300 };

function handelTaskDoms(dom: Element | null, task: Task) {
    if (dom != null) {
        taskDoms.set(task.pid, dom);
    } else {
        taskDoms.delete(task.pid);
    }
}

function taskbarMoveAnimation(e: MouseEvent | undefined) {
    for (const [pid, elem] of taskDoms) {
        const domElem = windowsManage.dockElemMap.get(pid);
        if (domElem == undefined) continue;
        if (e != undefined) {
            const domRect = elem.getBoundingClientRect();
            const centerOffset = domRect.left + domRect.width / 2;
            domElem.scale = Math.max(1 - Math.abs((centerOffset - e.x) / 160), 0);
        } else {
            domElem.scale = 0;
        }
    }
}

function relayoutTaskBar() {
    const getTaskBarWidth = (taskBarRef.value as Element).clientWidth;
    const left = (window.innerWidth - getTaskBarWidth) / 2;
    taskBarWidth.value = getTaskBarWidth;
    taskBarLeft.value = left;
}

function handelOnClickTaskbarTask(pid: string) {
    const setToTopWindow = windowsManage.alosWindowMap.get(pid);
    if (setToTopWindow != undefined) {
        windowsManage.windowToTopLayer(setToTopWindow);
    }
}

function handelWindowManageEvent(event: ListenerEvent<WindowsManageEventType, Task>) {
    switch (event.event) {
        case WindowsManageEventType.add:
            relayoutTaskBar();
            break;
        case WindowsManageEventType.del:
            late(() => relayoutTaskBar(), taskStyle['--duration'] + 10);
            late(() => relayoutTaskBar(), taskStyle['--duration'] + 200);
            break;
    }
}

const handelWindowResize = lateDuration(() => relayoutTaskBar(), 150);

onMounted(() => {
    relayoutTaskBar();
    windowsManage.addListener(handelWindowManageEvent)
    window.addEventListener("resize", handelWindowResize);
})
onUnmounted(() => {
    windowsManage.removeListener(handelWindowManageEvent)
    window.removeEventListener("resize", handelWindowResize);
});
</script>

<style scoped lang="scss" >
@import "/src/scss/utils/var/var.scss";
@import "/src/scss/space.scss";
@import "/src/scss/utils/mixin/center.scss";
@import "/src/scss/utils/mixin/shadow-border.scss";
@import "/src/scss/utils/mixin/position.scss";
@import "/src/scss/utils/mixin/fix.scss";
@import "/src/scss/background.scss";
@import "/src/scss/utils/var/var.scss";

$taskBarMarginBottom: 10px;
$taskSize: 48px;
$taskbarHeight: $taskSize + $taskBarMarginBottom * 2;
$taskMarginBottom: 10px;

.taskbarTaskTransition-leave-active {
    transition: all none ease !important;
    .task {
        transition-duration: var(--duration) !important;
    }
}

.taskbarTaskTransition-leave-to {
    transform: scale(0.3);
    opacity: 0;
}

.desktop-box {
    & > .background-image {
        @include position-fixed-fill;
        @include desktop-background;
        z-index: 0;
    }
    & > .desktop-windows-container {
        @include position-fixed-fill;
        user-select: none;
        z-index: 2;
        & > .taskbar-box {
            position: absolute;
            display: flex;
            justify-content: center;
            bottom: 0;
            transition: all 0.4s;
            z-index: $topFloorZIndex;
            .taskbar-content {
                position: relative;
                padding: 60px 25px 0;
                & > .taskbar {
                    @include shadow-high;
                    border-radius: 20px;
                    height: $taskbarHeight;
                    margin-bottom: 10px;
                    border: 1px solid #fff1;
                    background-color: #fff4;
                    backdrop-filter: blur(10px);
                    position: absolute;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    z-index: 0;
                }
                .task-row {
                    display: flex;
                    position: relative;
                    padding-top: 10px;
                    top: -($taskMarginBottom + $taskBarMarginBottom);
                    & > .task {
                        @include fix-transform-scale;
                        cursor: pointer;
                        position: relative;
                        z-index: 1;
                        filter: drop-shadow(2px 3px 6px #0002);
                        width: $taskSize;
                        height: $taskSize;
                        margin: 0 10px;
                        padding-bottom: 5px;
                        &:active {
                            transition-duration: $now;
                            transition-timing-function: ease;
                            transform: scale(0.8) !important;
                        }
                        img {
                            width: 100%;
                            height: 100%;
                            object-fit: contain;
                            transform-origin: bottom center;
                            transition: all 0.05s linear;
                        }
                        .presence-indicator {
                            @include shadow-less;
                            position: absolute;
                            bottom: -5px;
                            width: 5px;
                            height: 5px;
                            background-color: #fff8;
                            border-radius: 100%;
                            left: calc(50% - 2.5px);
                        }
                    }
                }
            }
        }
    }
}
</style>