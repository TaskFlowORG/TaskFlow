import axios from "axios";


export const Api = axios.create({
    // baseURL: 'http://10.4.96.33:9999/'
    baseURL: 'http://localhost:9999/'

});