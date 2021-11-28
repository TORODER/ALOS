import { createRouter, createWebHashHistory } from "vue-router";
import Login from "./pages/Login.vue";
import Desktop from "./pages/Desktop.vue";

export const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/",
            name: "login",
            component: Login,
        },
        {
            path: "/desktop",
            name: "desktop",
            component: Desktop,
        },
    ],
});
