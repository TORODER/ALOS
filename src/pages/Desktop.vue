<template>
    <div class="desktop-box">
        <div
            class="background-image"
            :style="{
                'background-image': `url('${backgroundImage}')`
            }"
        ></div>
        <div class="desktop-windows-container"></div>
        <div class="desktop-system-ui-box">
            <div class="taskbar-box">
                <div
                    class="taskbar-content"
                    @mousemove="taskbarMoveAnimation"
                    @mouseout.self="taskbarMoveAnimation(undefined)"
                >
                    <div class="task-row">
                        <div
                            class="task"
                            :ref="(e) => handelTaskDoms(e as any, dockElem.task)"
                            :key="dockElem.task.pid"
                            :style="{
                                transform: `scale(${1 + dockElem.scale * .3}) translateY(${dockElem.scale * -15}px)`
                            }"
                            v-for="[dockElemKey, dockElem] in dockElemMap"
                        >
                            <img
                                :src="appDescriptionMap.get(dockElem.task.packageID)!.icon.taskbar"
                            />
                        </div>
                    </div>
                    <div class="taskbar"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts" >
import { reactive, ref } from 'vue';
import { PID, PIDMap, Task } from '../@types/task';
import { ListenerEvent } from '../core/listener';
import { taskManage, TaskManageEvent, TaskType } from '../core/task';
import { windowsManage } from '../core/window';
import { imagePath } from '../public';
const backgroundImage = ref(`${imagePath}background.jpg`);
const dockElemMap = windowsManage.dockElemMap;
const appDescriptions: AppDescription[] = [
    {
        "icon": {
            "taskbar": "/public/images/nodejs.png",
        },
        "name": {
            "EN": "NodeJS",
        },
        "packageID": "com.nodejs"
    },
    {
        "icon": {
            "taskbar": "/public/images/vue.png",
        },
        "name": {
            "EN": "Vue",
        },
        "packageID": "com.vue"
    }
];
const appDescriptionMap: Map<string, AppDescription> = new Map(appDescriptions.map(e => [e.packageID, e]));

appDescriptions.forEach((v, i) => {
    setTimeout(() => {
        taskManage.create(v, TaskType.window);
        taskManage.create(v, TaskType.window);
        taskManage.create(v, TaskType.window);
    }, i * 3000);
});

// setTimeout(() => {
//     const t = Array.from(taskManage.selectTasksFromTaskType(TaskType.window).values());
//     taskManage.remove(t[0]!.pid);
//     console.log(["delete", t[0]!.pid]);
// }, 1000 * 10)


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
            domElem.scale = Math.max(1 - Math.abs((centerOffset - e.x) / 250), 0);
        } else {
            console.log("out");
            domElem.scale = 0;
        }
    }
}

</script>

<style scoped lang="scss" >
@import "/src/scss/utils/space.scss";
@import "/src/scss/utils/mixin/center.scss";
@import "/src/scss/utils/mixin/shadow.scss";
@import "/src/scss/utils/mixin/position.scss";
@import "/src/scss/background.scss";

$taskbarHeight: 10px;
$taskBarMarginBottom: 10px;
$taskSize: 60px;
$taskMarginBottom: 10px;
.desktop-box {
    & > .background-image {
        @include position-fixed-fill;
        @include desktop-background;
        z-index: 0;
    }
    & > .desktop-windows-container {
        @include position-fixed-fill;
        z-index: 1;
    }
    & > .desktop-system-ui-box {
        @include position-fixed-fill;
        user-select: none;
        z-index: 2;
        & > .taskbar-box {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            display: flex;
            justify-content: center;
            .taskbar-content {
                position: relative;
                padding: 60px 25px 0;
                & > .taskbar {
                    @include shadow-less;
                    border-radius: 15px;
                    height: $taskbarHeight;
                    margin-bottom: 10px;
                    border: 1px solid #fff1;
                    background-color: #fff6;
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
                        @include shadow-less;
                        position: relative;
                        transform-origin: bottom center;
                        transition: all 0.1s linear;
                        filter: drop-shadow(2px 4px 6px #0004);
                        width: $taskSize;
                        height: $taskSize;
                        margin: 0 10px;
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