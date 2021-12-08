<template>
    <div class="start" @click="startApp(undefined)">
        <div class="app-box">
            <div
                v-for="appDescription in appDescriptions"
                :key="appDescription.packageID"
                class="app"
            >
                <img
                    @click.stop="startApp(appDescription.packageID)"
                    :src="osPackageManage.getAppDescription(appDescription.packageID)!.icon.taskbar"
                />
                <div class="name">
                    {{
                        getLocalLanguage(appDescription.name)
                    }}
                </div>
            </div>
        </div>
    </div>
</template>


<script lang="ts" setup>
import { getLocalLanguage } from '../../language';
import { osPackageManage } from '../../service/os-package-manage';
import { osTaskManage, OSTaskBuilder } from '../../service/os-task-manage';
const appDescriptions = osPackageManage.getALLAppDescription();
const { pid } = defineProps<{ pid: string }>();
console.log("pid:", pid);
function startApp(packageID: string | undefined) {
    if (packageID) {
        const appDescription = osPackageManage.getAppDescription(packageID);
        if (appDescription) {
            const windowTask = OSTaskBuilder.createWindowTask(appDescription, "default");
            if (windowTask) osTaskManage.addTask(windowTask);
        }
    }
    osTaskManage.remove(pid);
}
</script>
<style lang="scss">
.start {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    backdrop-filter: blur(10px);
    background-color: #0002;
    .app-box {
        padding: 5% 10%;
        display: flex;
        flex-wrap: wrap;
        .app {
            width: min(max(10%, 50px), 150px);
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            img {
                width: 100px;
                height: 100px;
                object-fit: contain;
                cursor: pointer;
                &:hover {
                    transform: scale(1.2);
                    filter: drop-shadow(0 0 10px #0002);
                }
            }
            .name{
                margin: 8px;
                color: #fff;
                font-size: 14px;
            }
        }
    }
}
</style>