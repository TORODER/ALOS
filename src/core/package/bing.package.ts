
// * Bing Web Package 
export const bingPackageDescription: FrameAppDescription = {
    "icon": {
        "logo": "/public/images/bing.png",
        "taskbar": "/public/images/bing.png",
    },
    "name": {
        "EN": "Blog",
        "ZH_CN": "必应"
    },
    "packageID": "dev.alos.bing",
    "framePageIndex": {
        "default": {
            "startUrl": "http://bing.com.cn",
            showWindowBorder: true,
            showWindowStateBar: true,
            defaultZIndex: "window",
            defaultPositionType: "size",
            defaultPosition: {
                width: 500,
                height: 300
            }
        }
    }
};