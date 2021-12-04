import { apiCodeDescribe, HttpPackageCode } from "../../api/config";

export function requestPackageOk(requestPackage: repInstance<any>) {
    return requestPackage.code == HttpPackageCode.OK;
}