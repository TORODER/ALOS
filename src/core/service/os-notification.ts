import { reactive, Ref, ref } from "vue";
import { buildUUID } from "../easy-uuid";

class OSNotificationManage {

    notifications: Array<OSNotification>;

    constructor() {
        this.notifications = reactive([]);
    }

    pushNewOSNotification = (newOSNotification: OSNotificationBuildConfig) => {
        this.notifications.unshift({ ...newOSNotification, "date": Date.now(), "nid": buildUUID("nid") });
    }

    removeNotification = (osNotification: OSNotification) => {
        const removeIndex = this.notifications.findIndex((v) => v == osNotification);
        if (removeIndex != -1) {
            this.notifications.splice(removeIndex, 1);
        }
    }

}

export const osNotificationManage = new OSNotificationManage();