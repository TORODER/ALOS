type PackageID = string;


type AppDescriptionIconType = "task" | "taskbar" | "window" | "logo" | "simplify";

interface AppDescription {
    // * App 包名
    // * 类似 top.autopc.freeMessage
    packageID: PackageID;
    // * APP 显示名称
    // * {"EN":"freeMessage","ZH_CN":"自由信息"}
    name: Multilingual<string>,
    // * APP 图标
    // * {"task":"http://127.0.0.1:8080/a.png","dock":"http://127.0.0.1:8080/a.png"}
    icon: Partial<Record<AppDescriptionIconType, string>> & { "logo": string }
}

interface AppDescriptionNeedIndex<T>{
    default:T
}

interface FrameAppDescription extends AppDescription {
    framePageIndex:Record<string,WindowFrameModeConfig>&AppDescriptionNeedIndex<WindowFrameModeConfig>
}


interface ComponentAppDescription extends AppDescription {
    componentPageIndex:Record<string,WindowComponentModeConfig>&AppDescriptionNeedIndex<WindowComponentModeConfig>
}

