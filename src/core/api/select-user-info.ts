import axios from 'axios';
import { apiConfig } from './config';


interface userInfo {
    email: string,
    username: string,
    uuid: UserUUID,
    headPortrait: string,
}

export default async (uuid: UserUUID): Promise<repInstance<userInfo>> => {
    const res = (await axios({
        method: 'get',
        url: `${apiConfig.host}/userdata/selectone/`,
        params: {
            uuid: uuid
        }
    })).data;
    return res as repInstance<userInfo>;
}
