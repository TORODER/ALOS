import axios, { AxiosRequestConfig } from 'axios';

axios.defaults.withCredentials = true

interface axiosInstance {
    email: string,
}

interface repInstance<T> {
    code: string,
    data: T
}


export default async (email:string) => {
    let config: AxiosRequestConfig<axiosInstance> =  {
        method: 'post',
        url: 'http://127.0.0.1:9091/testcode/send/',
        headers: { 
            'Content-Type': 'application/json', 
        },
    };
    config.data={
        email,
    }; 

    const data=(await axios(config)).data as repInstance<string>;

};





