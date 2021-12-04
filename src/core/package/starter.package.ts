import { DefineComponent, shallowRef } from "vue";
import start from "./starter/Start.vue";

export const starterPackageDescription: ComponentAppDescription = {
    "icon": {
        "logo": "/public/images/vue.png",
        "taskbar": "/public/images/vue.png",
    },
    "name": {
        "EN": "ALOS",
        "ZH_CN": "ALOS"
    },
    "packageID": "dev.alos",
    componentPageIndex: {
        "default": {
            "component": shallowRef(start as DefineComponent),
        }
    }
};