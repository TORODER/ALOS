import { createApp } from "vue";
import { router } from "./router";
import Root from "./Root.vue";
import "./scss/global.scss";
import axios from "axios";
import { OSTaskBuilder, osTaskManage, TaskType } from "./core/service/os-task-manage";
import { osPackageDescription } from "./core/package/os.package";
axios.defaults.withCredentials = true
createApp(Root).use(router).mount("#app");

osTaskManage.addTask(OSTaskBuilder.createWindowFrameTask(osPackageDescription, { "startUrl": "https://www.bing.com/?mkt=zh-CN" }));
osTaskManage.addTask(OSTaskBuilder.createWindowFrameTask(osPackageDescription, { "startUrl": "https://www.bing.com/?mkt=zh-CN" }));