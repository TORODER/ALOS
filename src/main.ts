import { createApp } from "vue";
import { router } from "./router";
import Root from "./Root.vue";
import "./scss/global.scss";
import axios from "axios";
import { OSTaskBuilder, osTaskManage, TaskType } from "./core/service/os-task-manage";
import { late } from "./core/utils/async";
import { starterPackageDescription } from "./core/package/starter.package";
import { osPackageManage } from "./core/service/os-package-manage";
import { osPackageDescription } from "./core/package/os.package";
import { bingPackageDescription } from "./core/package/bing.package";

axios.defaults.withCredentials = true

createApp(Root).use(router).mount("#app");

osPackageManage.register(starterPackageDescription);
osPackageManage.register(bingPackageDescription);