import axios from 'axios';


const urls =[
    'http://localhost:9999/',
    "http://10.4.96.36:9999/"
]

export const Api = axios.create({
    // baseURL: 'http://10.4.96.33:9999/'
    baseURL: urls[0]

});



