import { DefineComponent, shallowRef } from "vue";
import start from "./starter/Starter.vue";

export const starterPackageDescription: ComponentAppDescription = {
    "icon": {
        "logo": "/public/images/starter.png",
        "taskbar": "/public/images/starter.png",
    },
    "name": {
        "EN": "Starter",
        "ZH_CN": "启动器"
    },
    "packageID": "dev.alos.starter",
    componentPageIndex: {
        "default": {
            "component": shallowRef(start as DefineComponent),
            "showWindowStateBar": false,
            "showWindowBorder": false,
            defaultPositionType: "pos",
            defaultZIndex: "layoutFill",
            defaultPosition: {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
            }
        }
    }
};