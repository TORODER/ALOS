let pidAcc = 0;

export function buildPID(appDescription: AppDescription) {
    return `${appDescription.packageID}-${pidAcc++}`;
}
