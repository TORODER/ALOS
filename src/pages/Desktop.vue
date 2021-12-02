<template>
    <div class="desktop-box">
        <div
            class="background-image"
            :style="{
                'background-image': `url('${backgroundImage}')`
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
                        <div
                            class="task"
                            :ref="(e) => handelTaskDoms(e as any, dockElem.task)"
                            :key="dockElem.task.pid"
                            :style="{
                                transform: `scale(${1 + dockElem.scale * scaleMax}) translateZ(0) translateY(${dockElem.scale * translateYMax}px)`
                            }"
                            v-for="[dockElemKey, dockElem] in dockElemMap"
                        >
                            <img
                                :src="osPackageManage.getAppDescription(dockElem.task.packageID)!.icon.taskbar"
                            />
                        </div>
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
<script setup lang="ts" >
import { OSTaskBuilder, osTaskManage, TaskType } from '../core/service/os-task-manage';
import { onMounted, onUnmounted, reactive, ref, watch } from 'vue';
import { osPackageDescription } from '../core/package/os.package';
import { osPackageManage } from '../core/service/os-package-manage';
import { windowsManage } from '../core/service/window-manage';
import { imagePath } from '../public';
import OSWindowsLayer from "../components/OSWindowsLayer.vue"
import { late } from '../core/utils/async';
const backgroundImage = ref(`${imagePath}background.jpg`);
const dockElemMap = windowsManage.dockElemMap;
const scaleMax = .3;
const translateYMax = -18;
const taskBarRef = ref();
const taskBarLeft = ref<number | undefined>(undefined);
const taskBarWidth = ref<number | undefined>(undefined);
const taskDoms: PIDMap<Element> = new Map();

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
            console.log("out");
            domElem.scale = 0;
        }
    }
}

function relayoutTaskBar() {
    const getTaskBarWidth = (taskBarRef.value as Element).clientWidth;
    const left = (window.innerWidth - getTaskBarWidth) / 2;
    taskBarWidth.value = getTaskBarWidth;
    taskBarLeft.value = left;
    console.log(taskBarRef.value);
}

onMounted(() => {
    relayoutTaskBar();
    windowsManage.addListener(relayoutTaskBar)
})
onUnmounted(()=>{
    windowsManage.removeListener(relayoutTaskBar)
});
</script>

<style scoped lang="scss" >
@import "/src/scss/space.scss";
@import "/src/scss/utils/mixin/center.scss";
@import "/src/scss/utils/mixin/shadow-border.scss";
@import "/src/scss/utils/mixin/position.scss";
@import "/src/scss/utils/mixin/fix.scss";
@import "/src/scss/background.scss";

$taskBarMarginBottom: 10px;
$taskSize: 50px;
$taskbarHeight: $taskSize + $taskBarMarginBottom * 2;
$taskMarginBottom: 10px;
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
            z-index: 9999999;
            .taskbar-content {
                position: relative;
                padding: 60px 25px 0;
                & > .taskbar {
                    @include shadow-less;
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
                        transform-origin: bottom center;
                        transition: all 0.05s linear;
                        filter: drop-shadow(2px 4px 6px #0004);
                        width: $taskSize;
                        height: $taskSize;
                        margin: 0 12px;
                        z-index: 1;
                        img {
                            width: 100%;
                            height: 100%;
                            object-fit: contain;
                        }
                    }
                }
            }
        }
    }
}
</style>