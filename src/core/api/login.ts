import axios, { AxiosRequestConfig } from 'axios';
axios.defaults.withCredentials=true

interface axiosInstance {
    email: string,
    passwd: string,
}


export interface loginData{
    email:string,
    uuid:string
}
export interface repInstance<T>{
    code:number,
    data:T,
    describe: string
}


export default async (email: string, passwd: string):Promise<repInstance<loginData>> => {
    let config: AxiosRequestConfig<axiosInstance> = {
        method: 'post',
        url: '/api/user/signin',
        headers: {
            'Content-Type': 'application/json',
        },
    };
    config.data={
        email,
        passwd
    };  
    const data=(await axios(config)).data as repInstance<loginData>;
    return data;
};




