import { HttpPackageCode } from "../core/api/config";
declare global {
    interface repInstance<T> {
        code: HttpPackageCode,
        data: T,
        describe: string
    }
}