import {api} from "./axiosConfig";

export class Api {
    get = async (url) => {
     try{
        const response = await api.get(url);
        return response.data;
     }catch(error){
         console.log(error);
     }  
    }

    getById = async (url, id) => {
        try{
            const response = await api.get(url + id);
            return response.data;
        }catch(error){
            console.log(error);
        }
    }

    post = async (url, data) => {
        try{
            const response = await api.post(url, data);
            return response.data;
        }catch(error){
            console.log(error);
        }
    }

    put = async (url, data) => {
        try{
            const response = await api.put(url, data);
            return response.data;
        }catch(error){
            console.log(error);
        }
    }

    delete = async (url) => {
        try{
            const response = await api.delete(url);
            return response.data;
        }catch(error){
            console.log(error);
        }
    }


}