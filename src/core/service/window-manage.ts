import { reactive } from "vue";
import { ListenerEvent } from "../listener";
import { osTaskManage, TaskManageEvent, TaskType } from "./os-task-manage";

interface DockElem {
    task: Task,
    scale: number,
};


class ALOSWindow {
    task: WindowTask;
    x: number;
    y: number;
    width: number;
    height: number;
    constructor(task: WindowTask, x?: number, y?: number, width?: number, height?: number) {
        this.x = 100;
        this.y = 100
        this.width = 100;
        this.height = 100;
        this.task = task
    }
}

/**
 * * 窗口管理器
 */
class WindowsManage {
    windowTasks: Set<Task>;
    dockElemMap: PIDMap<DockElem>;
    alosWindowMap: PIDMap<ALOSWindow>;

    constructor() {
        this.windowTasks = reactive(new Set());
        this.dockElemMap = reactive(new Map());
        this.alosWindowMap = reactive(new Map());
        osTaskManage.addListener(this.onTaskManageEvent);
    }

    onTaskManageEvent = (v: ListenerEvent<TaskManageEvent, Task>) => {
        console.log(v, this);
        if (v.data.type == TaskType.window) {
            const windowTask = v.data as WindowTask;
            switch (v.event) {
                case TaskManageEvent.add:
                    this.windowTasks.add(windowTask);
                    this.dockElemMap.set(windowTask.pid, this.rawCreateDockElem(windowTask));
                    this.alosWindowMap.set(windowTask.pid, new ALOSWindow(windowTask));
                    break;
                case TaskManageEvent.delete:
                    this.windowTasks.delete(windowTask);
                    this.dockElemMap.delete(windowTask.pid);
                    this.alosWindowMap.delete(windowTask.pid);
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
