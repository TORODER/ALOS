import axios, { AxiosRequestConfig } from 'axios';
import { loginData } from './login'

axios.defaults.withCredentials = true

interface axiosInstance {
    email: string,
    passwd: string,
    testCode: string
}

interface repInstance<T> {
    code: number,
    data: T,
    describe: string
}


export default async (email:string,passwd:string,testCode:string) => {
    let config: AxiosRequestConfig<axiosInstance> =  {
        method: 'post',
        url: '/api/user/signup',
        headers: { 
            'Content-Type': 'application/json', 
        },
    };
    config.data={
        email,
        passwd,
        testCode
    }; 

    const data=(await axios(config)).data as repInstance<loginData>;
    return data
};





