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
                <div class="taskbar-content" @mousemove="taskbarMoveAnimation">
                    <div class="task-row">
                        <div
                            class="task"
                            :ref="(dom) => {
                                console.log(dom);
                                taskDoms[value.pid] = dom;
                            }"
                            :index="value.pid"
                            v-for="value in windowTasks"
                        >
                            <img :src="appDescriptionMap.get(value.packageID)!.icon.taskbar" />
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
import { Task } from '../@types/task';
import { ListenerEvent } from '../core/listener';
import { taskManage, TaskManageEvent, TaskType } from '../core/task';
import { imagePath } from '../public';
const backgroundImage = ref(`${imagePath}background.jpg`);

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
        console.log("add");
    }, i * 3000);
});

const windowTasks: Set<Task> = reactive(new Set());
function onTaskManageEvent(v: ListenerEvent<TaskManageEvent, Task>) {
    switch (v.event) {
        case TaskManageEvent.add:
            console.log("add", v.data);
            windowTasks.add(v.data);
            break;
    }
}
taskManage.addListener(onTaskManageEvent);

const taskDoms: Record<string, any> = {};

function taskbarMoveAnimation(e: MouseEvent) {
    // console.log(e.offsetX, e.offsetY);
    // console.log(taskDoms, taskDoms.map(e => [e.offsetLeft, e.offsetTop]));
}

</script>

<style scoped lang="scss" >
@import "/src/scss/utils/space.scss";
@import "/src/scss/utils/mixin/center.scss";
@import "/src/scss/utils/mixin/shadow.scss";
@import "/src/scss/utils/mixin/position.scss";
@import "/src/scss/background.scss";

$taskbarHeight: 20px;
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
                padding: 0 25px;
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
                    & > .task {
                        @include shadow-less;
                        // border: 1px solid #fff1;
                        // backdrop-filter: blur(10px);
                        // padding: 10px;
                        filter: drop-shadow(2px 4px 6px #0004);
                        position: relative;
                        width: $taskSize;
                        height: $taskSize;
                        border-radius: 15px;
                        margin: 0 10px;
                        z-index: 1;
                        top: -($taskMarginBottom + $taskBarMarginBottom);
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