import { Api } from "..";

const api = new Api();

export class autheticate {
    login = async (data:any) => {
        try{
            const response = await api.post("/login", data);
            return response.data;
        }catch(error){
            console.log(error);
        }
    }

    register = async (data:any) => {
        try{
            const response = await api.post("/register", data);
            return response.data;
        }catch(error){
            console.log(error);
        }
    }   
}