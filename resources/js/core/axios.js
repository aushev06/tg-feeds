/* eslint-disable no-param-reassign */
import Axios from "axios";

const axios = Axios.create({
    withCredentials: true,
});

axios.interceptors.request.use((config) => {
    if (typeof window !== "undefined") {
        if (config.headers) {
            config.headers.Authorization = `Bearer ${window.localStorage.getItem('token')?.replace('%7C', '|')}`;
        }
    }
    return config;
});

export {axios};
