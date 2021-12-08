// * ALOS 操作系统 Package 
export const osPackageDescription: FrameAppDescription = {
    "icon": {
        "logo": "/public/images/vue.png",
        "taskbar": "/public/images/vue.png",
    },
    "name": {
        "EN": "ALOS",
        "ZH_CN": "ALOS"
    },
    "packageID": "dev.alos.os",
    framePageIndex: {
        "default": {
            "startUrl": ".",
            showWindowBorder: true,
            showWindowStateBar: true,
            defaultPositionType: "size",
            defaultZIndex: "window",
            defaultPosition: {
                width: 500,
                height: 300
            },
        }
    }
};