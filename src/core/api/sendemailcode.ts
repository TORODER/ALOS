import axios, { AxiosRequestConfig } from 'axios';
import { apiConfig } from './config';
import { loginData } from './login'

interface axiosInstance {
    email: string,
}

export default async (email: string) => {
    let config: AxiosRequestConfig<axiosInstance> = {
        method: 'post',
        url: `${apiConfig.host}/testcode/send`,
        headers: {
            'Content-Type': 'application/json',
        },
    };
    config.data = {
        email,
    };

    const data = (await axios(config)).data as repInstance<loginData>;
    return data
};





