import { reactive } from "vue";
import { Listener, ListenerEvent } from "../listener";
import { late } from "../utils/async";
import { osTaskManage, TaskManageEvent, TaskType } from "./os-task-manage";

interface DockElem {
    task: Task,
    scale: number,
};

export const defZindex = 2;
export class ALOSWindow {
    task: WindowTask;
    x: number;
    y: number;
    width: number;
    height: number;
    zIndex: number;
    constructor(task: WindowTask, x?: number, y?: number, width?: number, height?: number) {
        this.x = 100;
        this.y = 100
        this.width = 100;
        this.height = 100;
        this.task = task
        this.zIndex = 2;
    }
}

/**
 * * 窗口管理器
 */
class WindowsManage extends Listener<undefined> {
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

    private onTaskManageEvent = (v: ListenerEvent<TaskManageEvent, Task>) => {
        console.log(v, this);
        if (v.data.type == TaskType.window) {
            const windowTask = v.data as WindowTask;
            switch (v.event) {
                case TaskManageEvent.add:
                    this.windowTasks.add(windowTask);
                    this.dockElemMap.set(windowTask.pid, this.rawCreateDockElem(windowTask));
                    this.alosWindowMap.set(windowTask.pid, new ALOSWindow(windowTask));
                    this.pushNotice(undefined);
                    break;
                case TaskManageEvent.delete:
                    this.windowTasks.delete(windowTask);
                    this.dockElemMap.delete(windowTask.pid);
                    this.alosWindowMap.delete(windowTask.pid);
                    this.pushNotice(undefined);
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


export enum WindowMode {
    frame = "frame",
    component = "component",
}

export const windowsManage = new WindowsManage();
