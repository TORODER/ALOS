import { isObject } from "@vue/shared";
import { reactive } from "vue";
import { Listener, ListenerEvent } from "../listener";
import { late } from "../utils/async";
import { osTaskManage, TaskManageEvent, TaskType } from "./os-task-manage";

interface DockElem {
    task: Task,
    scale: number,
};

export const defZindex = 2;

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
    width: number;
    height: number;
    zIndex: number;
    constructor(x?: number, y?: number, width?: number, height?: number, index?: number) {
        this.x = x ?? 100;
        this.y = y ?? 100
        this.width = width ?? 100;
        this.height = height ?? 100;
        this.zIndex = index ?? 2;
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
        super(x, y, width, height);
        this.task = task
    }

}

/**
 * * 窗口管理器
 */
class WindowsManage extends Listener<ListenerEvent<WindowsManageEventType, Task>> {
    windowTasks: Set<Task>;
    dockElemMap: PIDMap<DockElem>;
    alosWindowMap: PIDMap<ALOSWindow>;

    constructor() {
        super();
        this.windowTasks = reactive(new Set());
        this.dockElemMap = reactive(new Map());
        this.alosWindowMap = reactive(new Map());
        osTaskManage.addListener(this.onTaskManageEvent);
    }

    windowToTopLayer = (alosWindow: ALOSWindow) => {
        const alosWindowList = Array.from(this.alosWindowMap.values());
        alosWindow.zIndex = alosWindowList.length;
        alosWindowList.sort((a, b) => a.zIndex - b.zIndex);
        alosWindowList.forEach((v, i) => {
            v.zIndex = i;
        })
    }
    windowToFullScreen = (alosWindow: ALOSWindow) => {
        if (
            alosWindow.x != 0 ||
            alosWindow.y != 0 ||
            alosWindow.width != window.innerWidth ||
            alosWindow.height != window.innerHeight
        ) {
            alosWindow.oldALOSWindowPosition = alosWindow.copyPositionAttr();
            alosWindow.x = 0;
            alosWindow.y = 0;
            alosWindow.width = window.innerWidth;
            alosWindow.height = window.innerHeight;
        } else {
            if (alosWindow.oldALOSWindowPosition != undefined) {
                alosWindow.setPositionAttr(alosWindow.oldALOSWindowPosition);
                alosWindow.oldALOSWindowPosition = undefined;
            }
        }
    }

    private onTaskManageEvent = (v: ListenerEvent<TaskManageEvent, Task>) => {
        console.log(v, this);
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
