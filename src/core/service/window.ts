import { reactive } from "vue";
import { PIDMap, Task } from "../../@types/task";
import { ListenerEvent } from "../listener";

import { osTaskManage, TaskManageEvent, TaskType } from "./task";

interface DockElem {
    task: Task,
    scale: number,
};
/**
 * 窗口管理器
 */
class WindowsManage {
    windowTasks: Set<Task>;
    dockElemMap: PIDMap<DockElem>;

    constructor() {
        this.windowTasks = reactive(new Set());
        this.dockElemMap = reactive(new Map());
        osTaskManage.addListener(this.onTaskManageEvent);
    }

    onTaskManageEvent = (v: ListenerEvent<TaskManageEvent, Task>) => {
        console.log(v, this);
        if (v.data.type == TaskType.window) {
            switch (v.event) {
                case TaskManageEvent.add:
                    this.windowTasks.add(v.data);
                    this.dockElemMap.set(v.data.pid, this.rawCreateDockElem(v.data));
                    break;
                case TaskManageEvent.delete:
                    this.windowTasks.delete(v.data);
                    this.dockElemMap.delete(v.data.pid);
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

export const windowsManage = new WindowsManage();