import { createRouter, createWebHashHistory } from "vue-router";
import Login from "./pages/Login.vue";
import Desktop from "./pages/Desktop.vue";
import Registered from "./pages/Registered.vue"

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
        {
            path: '/registered',
            name: "registered",
            component: Registered,
        }
    ],
});
