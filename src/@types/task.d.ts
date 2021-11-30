import { TaskType } from "../core/service/task";


type PID = string;
type PIDMap<T> = Map<PID, T>;
type PIDTaskMap = PIDMap<Task>;
interface Task {
    // * 程序 ID
    pid: PID,
    // * APP 包名
    // * [AppDescription.packageID]
    packageID: PackageID,
    // * Task 类型
    type: TaskType
}