import axios from 'axios';


const urls =[
    'http://localhost:9999/',
    "http://10.4.96.36:9999/"
]

export const Api = axios.create({
    baseURL: 'http://localhost:9999/',
    withCredentials: true
});


