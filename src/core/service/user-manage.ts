import { apiCodeDescribe, HttpPackageCode } from "../api/config";
import loginAPI from "../api/login";
import { requestPackageOk } from "../api/utils/api";
import selectOneUserInfo from "../api/select-user-info";
import { ref, Ref } from "vue";
import { toDesktop } from "../../router";
import { getLocalLanguage } from "../language";
import { osNotificationManage } from "./os-notification-manage";
import { osPackageDescription } from "../package/os.package";


export interface signInOption {
    notification?: boolean, toDesktop?: boolean
}


export class UserManage {
    loginUser: Ref<User | undefined>;

    constructor() {
        this.loginUser = ref(undefined);
    }

    private login = async (email: string, passwd: string) => {
        const loginPackage = await loginAPI(email, passwd);
        if (requestPackageOk(loginPackage)) {
            const userInfoPackage = await selectOneUserInfo(loginPackage.data.uuid);
            this.loginUser.value = userInfoPackage.data;
            return userInfoPackage;
        } else {
            return loginPackage;
        }
    }

    signIn = async (account: string, passwd: string, options?: signInOption) => {
        const data = await userManage.login(account, passwd);
        const { notification: openNotification, toDesktop: openToDesktop } = Object.assign<Required<signInOption>, signInOption | undefined>({ notification: true, toDesktop: true }, options);
        if (requestPackageOk(data)) {
            if (openToDesktop) {
                toDesktop()
            }
        } else {
            if (openNotification) {
                const err = getLocalLanguage(apiCodeDescribe(data.code));
                osNotificationManage.pushNewOSNotification({
                    "title": "登录失败",
                    "content": err,
                    "packageID": osPackageDescription.packageID
                })
            }
        }
    }

}

export const userManage = new UserManage();
