export namespace WarnTask {

    /**
     * ! 尝试对不存在的任务进行删除
     */
    export function deleteNoTExisTask() {
        console.warn("尝试对不存在的任务进行删除");
    }

    /**
     * ! 发生Task PID覆盖
     */
    export function taskPIDReWrite() {
        console.warn("发生Task PID覆盖");
    }

}

export namespace WarnAppPackage {

    /**
     * ! 尝试对不存在的任务进行删除
     */
    export function deleteNoTExisTask() {
        console.warn("尝试对不存在的任务进行删除");
    }

    /**
     * ! 发生Package ID 覆盖
     */
    export function taskPackageIDReWrite() {
        console.warn("发生 PackageID 覆盖");
    }

}