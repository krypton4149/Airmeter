import axios from 'axios';
import { useUserDetails } from '../context/userContext';

const useAPI = () => {
    //... TODO Get access token from user login details
    const { accessToken } = useUserDetails();

    //... Axios instance for the secured API calls.
    const secureAPI = axios.create({
        baseURL: 'https://builtdemo.info/airmeter-backend/public/api',
    });


    //... Axios instance for the public/open API calls.
    const publicAPI = axios.create({
        baseURL: 'https://builtdemo.info/airmeter-backend/public/api',
    });

    //... Include authorization header with the JWT bearer token.
    secureAPI.interceptors.request.use(
        config => {
            config.headers['authorization'] = `Bearer ${accessToken}`;
            return config;
        },
        error => {
            console.log("Error:", error);
            return Promise.reject(error);
        },
    );

    return { secureAPI, publicAPI };
}

export default useAPI;