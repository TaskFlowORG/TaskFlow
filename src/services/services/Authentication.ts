
import { UserLogin } from "@/models/user/user/UserLogin";
import { Api } from "../axios";
import { User } from "@/models";
import { AxiosResponse } from "axios";
import Cookies from "js-cookie";
class Authentication {

    async login(userlogin : UserLogin): Promise<AxiosResponse<User>>{
        return await Api.post<User>("login", userlogin);
    }
    
    async logout(): Promise<void> {
        await Api.post<void>("logout", {}, {withCredentials: true});
    }

}

export const authentication = new Authentication();