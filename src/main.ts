import { createApp } from "vue";
import { router } from "./router";
import Root from "./Root.vue";
import "./scss/global.scss";

createApp(Root).use(router).mount("#app");