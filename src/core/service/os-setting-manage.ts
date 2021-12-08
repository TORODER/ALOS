import { ref, Ref } from "vue";
import { imagePath } from "../../public";

class OSSettingManage {

    desktopBackground: Ref<string>;

    constructor() {
        this.desktopBackground = ref(`${imagePath}background.jpg`);
    }

}


export const osSettingManage=new OSSettingManage();