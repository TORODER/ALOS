import { HttpPackageCode } from "../config";

export function requestPackageOk(r: repInstance<any>): boolean {
    return r.code == HttpPackageCode.OK;
}