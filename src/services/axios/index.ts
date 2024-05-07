import axios from "axios";


const API = axios.create({
    baseURL: 'http://localhost:9999/',
    withCredentials: true
});


API.interceptors.response.use(undefined, function (err) {
   //throw error when 403
    if (err.response.status === 403) {
        throw  console.error("403 error");
    }
    return Promise.reject(err);
})

export const Api = API;