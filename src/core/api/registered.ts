import axios, { AxiosRequestConfig } from 'axios';
import { apiConfig } from './config';
import { loginData } from './login'

axios.defaults.withCredentials = true

interface axiosInstance {
    email: string,
    passwd: string,
    testCode: string
}

export default async (email: string, passwd: string, testCode: string) => {
    let config: AxiosRequestConfig<axiosInstance> = {
        method: 'post',
        url: `${apiConfig.host}/user/signup`,
        headers: {
            'Content-Type': 'application/json',
        },
    };
    config.data = {
        email,
        passwd,
        testCode
    };
    const data = (await axios(config)).data as repInstance<loginData>;
    return data
};





