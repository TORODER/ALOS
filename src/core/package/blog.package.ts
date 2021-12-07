
// * Blog Web Package 
export const blogPackageDescription: FrameAppDescription = {
    "icon": {
        "logo": "/public/images/vue.png",
        "taskbar": "/public/images/hxllogo.png",
    },
    "name": {
        "EN": "Blog",
        "ZH_CN": "博客"
    },
    "packageID": "dev.alos.blog",
    "framePageIndex": {
        "default": {
            "startUrl": "http://www.houxinlin.com:6060/",
            showWindowBorder: true,
            showWindowStateBar: true,
            defaultZIndex:"window",
            defaultPositionType: "size",
            defaultPosition: {
                width: 500,
                height: 300
            }
        }
    }
};