import { WarnAppPackage } from "../debug/warn";
import { osPackageDescription } from "../package/os.package";

class OSPackageManage {
    private packageMap: Map<PackageID, AppDescription>;
    constructor() {
        this.packageMap = new Map();
    }
    register = (appDescription: AppDescription) => {
        if (!this.packageMap.has(appDescription.packageID)) {
            this.packageMap.set(appDescription.packageID, appDescription);
        } else {
            WarnAppPackage.taskPackageIDReWrite();
        }
    }

    getAppDescription = (packageID: PackageID): AppDescription | undefined => {
        return this.packageMap.get(packageID);
    }
    
}

export const osPackageManage = new OSPackageManage();

osPackageManage.register(osPackageDescription)
