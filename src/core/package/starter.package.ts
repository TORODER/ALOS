import { DefineComponent, shallowRef } from "vue";
import start from "./starter/Starter.vue";

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
            "showWindowStateBar": false,
            "showWindowBorder": false,
            defaultPositionType: "pos",
            defaultPosition: {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
            }
        }
    }
};