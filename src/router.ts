import { createRouter, createWebHashHistory } from "vue-router";
import Login from "./pages/Start.vue";
import Desktop from "./pages/Desktop.vue";
import LoginSignIn from "./components/LoginSignIn.vue"
import LoginSignUp from "./components/LoginSignUp.vue"
export enum RouterNameView {
    LoginMainView = "LoginMainView",
}


export const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/",
            redirect: "/start"
        },
        {
            path: "/start",
            name: "start",
            components: {
                default: Login,
            },
            children: [
                {
                    path: "signIn",
                    components: {
                        [RouterNameView.LoginMainView]: LoginSignIn
                    }
                },
                {
                    path: "signUp",
                    components: {
                        [RouterNameView.LoginMainView]: LoginSignUp
                    }
                }
            ]
        },
        {
            path: "/desktop",
            name: "desktop",
            component: Desktop,
        },

    ],
});


export function toDesktop() {
    router.push("/desktop");
}


export function toStart() {
    router.push("/start");
}
export function toSignUp() {
    router.push("/start/signUp");
}
export function toSignIn() {
    router.push("/start/signIn");
}