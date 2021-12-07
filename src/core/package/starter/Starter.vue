<template>
    <div class="start">
        <div class="app-box">
            <div
                v-for="appDescription in appDescriptions"
                :key="appDescription.packageID"
                class="app"
            >
                <img
                    :src="osPackageManage.getAppDescription(appDescription.packageID)!.icon.taskbar"
                />
            </div>
        </div>
    </div>
</template>


<script lang="ts" setup>
import { osPackageManage } from '../../service/os-package-manage';
import { osTaskManage, OSTaskBuilder } from '../../service/os-task-manage';
const appDescriptions = osPackageManage.getALLAppDescription();
const { pid } = defineProps<{ pid: string }>();
console.log("pid:", pid);
function startApp(packageID: string) {
    const appDescription=osPackageManage.getAppDescription(packageID);
    
    osTaskManage.remove(pid);
    // osTaskManage.addTask()
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
        }
    }
}
</style>