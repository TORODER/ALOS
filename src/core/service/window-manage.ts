import { __ } from "ramda";
import { reactive } from "vue";
import { Listener, ListenerEvent } from "../listener";
import { starterPackageDescription } from "../package/starter.package";
import { interval, late } from "../utils/async";
import { MathUtils } from "../utils/math";
import { defZindex, topFloorZIndex } from "../var";
import { osTaskManage, TaskManageEvent, TaskType } from "./os-task-manage";
export type PositionType = "pos" | "size" | "posSize";
export type ZIndexType = "layoutFill" | "window";
interface DockElem {
    task: Task,
    scale: number,
};


export interface ALOSWindowPositionAttr {
    x: number;
    y: number;
    width: number;
    height: number;
    zIndex: number;
}

export class ALOSWindowPosition implements ALOSWindowPositionAttr {
    x: number;
    y: number;
    bottom: number | undefined;
    right: number | undefined;
    width: number;
    height: number;
    zIndex: number;
    constructor(x?: number, y?: number, width?: number, height?: number, index?: number, bottom?: number, right?: number) {
        this.x = x ?? 100;
        this.y = y ?? 100
        this.width = width ?? 100;
        this.height = height ?? 100;
        this.zIndex = index ?? defZindex;
        this.bottom = bottom;
        this.right = right;

    }
    copyPositionAttr = (): ALOSWindowPositionAttr => {
        return Object.assign({}, this);
    }
    setPositionAttr(alosWindowPositionAttr: ALOSWindowPositionAttr) {
        Object.assign(this, alosWindowPositionAttr);
    }
}

export class ALOSWindow extends ALOSWindowPosition {
    task: WindowTask;
    oldALOSWindowPosition?: ALOSWindowPositionAttr;
    constructor(task: WindowTask, x?: number, y?: number, width?: number, height?: number) {
        super();
        this.task = task;
        switch (task.config.defaultZIndex) {
            case "layoutFill":
                this.zIndex = topFloorZIndex + 2;
                break;
            case "window":
                this.zIndex = defZindex;
                break;
        }
        switch (task.config.defaultPositionType) {
            case "pos": {
                const pos = task.config.defaultPosition as PositionLTRB;
                this.x = pos.left;
                this.y = pos.top;
                this.bottom = pos.bottom;
                this.right = pos.right;
            }
                break;
            case "posSize":
                {
                    const pos = task.config.defaultPosition as PositionLTWH;
                    this.x = pos.left;
                    this.y = pos.top;
                    this.width = pos.width;
                    this.height = pos.height;
                }
                break;
            case "size":
                {
                    const pos = task.config.defaultPosition as PositionSize;
                    this.x = window.innerWidth / 2 - pos.width / 2;
                    this.y = window.innerHeight / 2 - pos.height / 2;
                    this.width = pos.width;
                    this.height = pos.height;
                }
                break;
        }
    }

    toPosStyle() {
        switch (this.task.config.defaultPositionType) {
            case "pos":
                return {
                    left: `${this.x}px`,
                    top: `${this.y}px`,
                    right: `${this.right}px`,
                    bottom: `${this.bottom}px`,
                    zIndex: this.zIndex
                };
            case "size":
            case "posSize":
                return {
                    left: `${this.x}px`,
                    top: `${this.y}px`,
                    width: `${this.width}px`,
                    height: `${this.height}px`,
                    zIndex: this.zIndex
                };
        }
    }

}

/**
 * * 窗口管理器
 */
class WindowsManage extends Listener<ListenerEvent<WindowsManageEventType, Task>> {
    windowTasks: Set<Task>;
    dockElemMap: PIDMap<DockElem>;
    alosWindowMap: PIDMap<ALOSWindow>;
    commonlyPackage: Map<PackageID, AppDescription>;

    constructor() {
        super();
        this.windowTasks = reactive(new Set());
        this.dockElemMap = reactive(new Map());
        this.alosWindowMap = reactive(new Map());
        this.commonlyPackage = reactive(new Map());
        osTaskManage.addListener(this.onTaskManageEvent);
        this.addPackage(starterPackageDescription);
    }

    addPackage = (appDescription: AppDescription) => {
        this.commonlyPackage.set(appDescription.packageID, appDescription);
    }

    delPackage = (appDescription: AppDescription) => {
        this.commonlyPackage.delete(appDescription.packageID);
    }

    windowToTopLayer = (alosWindow: ALOSWindow) => {

        // * window
        {
            const alosWindowList = Array.from(this.alosWindowMap.values()).filter(e => e.task.config.defaultZIndex == "window");
            if (alosWindow.task.config.defaultZIndex == "window") {
                alosWindow.zIndex = alosWindowList.length;
            }
            alosWindowList.sort((a, b) => a.zIndex - b.zIndex);
            alosWindowList.forEach((v, i) => {
                v.zIndex = i;
                console.log(alosWindowList.map(e => e.zIndex));
            });
        }

        // * layout fill 
        {
            const alosWindowList = Array.from(this.alosWindowMap.values()).filter(e => e.task.config.defaultZIndex == "layoutFill");
            alosWindowList.sort((a, b) => a.zIndex - b.zIndex);
            alosWindowList.forEach((v, i) => {
                v.zIndex = topFloorZIndex + 1 + i;
            });
        }
    }

    windowToFullScreen = (alosWindow: ALOSWindow) => {
        if (
            alosWindow.task.config.defaultZIndex == "window" &&
            (alosWindow.x != 0 ||
                alosWindow.y != 0 ||
                alosWindow.width != window.innerWidth ||
                alosWindow.height != window.innerHeight - 80)
        ) {
            alosWindow.oldALOSWindowPosition = alosWindow.copyPositionAttr();
            this.windowResizeAnimation(alosWindow, {
                x: 0,
                y: 0,
                width: window.innerWidth,
                height: window.innerHeight - 80,
                zIndex: defZindex
            });
        } else {
            if (alosWindow.oldALOSWindowPosition != undefined) {
                console.log(alosWindow.oldALOSWindowPosition);
                this.windowResizeAnimation(alosWindow, alosWindow.oldALOSWindowPosition);
                alosWindow.oldALOSWindowPosition = undefined;
            }
        }
    }


    private windowResizeAnimation = (alosWindow: ALOSWindow, windowConfig: ALOSWindowPositionAttr) => {
        const xSpeed = (alosWindow.x - windowConfig.x) / 12;
        const ySpeed = (alosWindow.y - windowConfig.y) / 12;
        const WidthSpeed = (windowConfig.width - alosWindow.width) / 12;
        const HeightSpeed = (windowConfig.height - alosWindow.height) / 12;
        interval(alosWindow.x, windowConfig.x, (a, b) => a + MathUtils.autoRange(-xSpeed, xSpeed, b - a), (v) => alosWindow.x = v, undefined, undefined, (a, b) => a == b);
        interval(alosWindow.y, windowConfig.y, (a, b) => a + MathUtils.autoRange(-ySpeed, ySpeed, b - a), (v) => alosWindow.y = v, undefined, undefined, (a, b) => a == b);
        interval(alosWindow.width, windowConfig.width, (a, b) => a + MathUtils.autoRange(-WidthSpeed, WidthSpeed, b - a), (v) => alosWindow.width = v, undefined, undefined, (a, b) => a == b);
        interval(alosWindow.height, windowConfig.height, (a, b) => a + MathUtils.autoRange(-HeightSpeed, HeightSpeed, b - a), (v) => alosWindow.height = v, undefined, undefined, (a, b) => a == b);
    }

    private onTaskManageEvent = (v: ListenerEvent<TaskManageEvent, Task>) => {
        if (v.data.type == TaskType.window) {
            const windowTask = v.data as WindowTask;
            switch (v.event) {
                case TaskManageEvent.add:
                    this.windowTasks.add(windowTask);
                    this.dockElemMap.set(windowTask.pid, this.rawCreateDockElem(windowTask));
                    this.alosWindowMap.set(windowTask.pid, new ALOSWindow(windowTask));
                    this.pushNotice({ event: WindowsManageEventType.add, data: windowTask });
                    break;
                case TaskManageEvent.delete:
                    this.windowTasks.delete(windowTask);
                    this.dockElemMap.delete(windowTask.pid);
                    this.alosWindowMap.delete(windowTask.pid);
                    this.pushNotice({ event: WindowsManageEventType.del, data: windowTask });
                    break;
            }
        }
    }

    private rawCreateDockElem = (task: Task) => {
        return {
            task: task,
            scale: 0,
        }
    }

}

export enum WindowsManageEventType {
    del = "del",
    add = "add"
}

export enum WindowMode {
    frame = "frame",
    component = "component",
}
export const windowsManage = new WindowsManage();
