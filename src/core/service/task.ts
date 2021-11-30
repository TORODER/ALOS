import { reactive } from "vue";
import { PIDTaskMap, Task } from "../../@types/task";
import { WarnTask } from "../debug/warn";
import { Listener, ListenerEvent } from "../listener";
import { buildPID } from "../pid";

class OSTaskTypeManage {

    taskTypeMap: Map<TaskType, PIDTaskMap>;

    constructor() {
        this.taskTypeMap = new Map();
    }

    private rawSelect = (taskType: TaskType): PIDTaskMap => {
        if (!this.taskTypeMap.has(taskType)) {
            this.taskTypeMap.set(taskType, new Map());
        }
        return this.taskTypeMap.get(taskType)!;
    }

    remove = (task: Task) => {
        const taskMap = this.taskTypeMap.get(task.type);
        if (taskMap != undefined && taskMap!.has(task.pid)) {
            taskMap!.delete(task.pid);
        } else {
            WarnTask.deleteNoTExisTask();
        }
    }

    add = (task: Task) => {
        const taskMap = this.rawSelect(task.type);
        if (!taskMap.has(task.pid)) {
            taskMap.set(task.pid, task);
        } else {
            WarnTask.taskPIDReWrite();
        }
    }

    select = (taskType: TaskType): PIDTaskMap => {
        return this.rawSelect(taskType);
    }

}

class OSTaskManage extends Listener<ListenerEvent<TaskManageEvent, Task>> {
    taskMap: PIDTaskMap;

    constructor() {
        super();
        this.taskMap = new Map();
    }

    private rawAddTask = (task: Task) => {
        if (!this.taskMap.has(task.pid)) {
            this.taskMap.set(task.pid, task);
            osTaskTypeManage.add(task);
            this.pushNotice(new ListenerEvent(TaskManageEvent.add, task));
        } else {
            WarnTask.taskPIDReWrite();
        }
    }

    create = (appDescription: AppDescription, type: TaskType): Task => {
        const newT: Task = reactive({
            "packageID": appDescription.packageID,
            "pid": buildPID(appDescription),
            "type": type
        });
        this.rawAddTask(newT);
        return this.taskMap.get(newT.pid)!;
    }

    remove = (pid: string) => {
        const task = this.taskMap.get(pid);
        if (task != undefined) {
            this.taskMap.delete(task.pid)
            osTaskTypeManage.remove(task);
            this.pushNotice(new ListenerEvent(TaskManageEvent.delete, task));
        } else {
            WarnTask.deleteNoTExisTask();
        }
    }

    selectTasksFromTaskType = (taskType: TaskType): PIDTaskMap => {
        return osTaskTypeManage.select(taskType);
    }

}

const osTaskTypeManage = new OSTaskTypeManage();

export enum TaskManageEvent { add, delete };
export enum TaskType { window, background };
export const osTaskManage = new OSTaskManage();
