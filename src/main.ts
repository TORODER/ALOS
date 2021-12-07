import { createApp } from "vue";
import { router } from "./router";
import Root from "./Root.vue";
import "./scss/global.scss";
import axios from "axios";
import { OSTaskBuilder, osTaskManage, TaskType } from "./core/service/os-task-manage";
import { late } from "./core/utils/async";
import { blogPackageDescription } from "./core/package/blog.package";
import { starterPackageDescription } from "./core/package/starter.package";
import { osPackageManage } from "./core/service/os-package-manage";
import { osPackageDescription } from "./core/package/os.package";

axios.defaults.withCredentials = true

createApp(Root).use(router).mount("#app");

osPackageManage.register(osPackageDescription)
osPackageManage.register(blogPackageDescription)
osPackageManage.register(starterPackageDescription);