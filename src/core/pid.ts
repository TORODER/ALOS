import { buildUUID } from "./utils/easy-uuid";

export function buildPID(appDescription: AppDescription) {
    return buildUUID(`${appDescription.packageID}_pid`);
}
