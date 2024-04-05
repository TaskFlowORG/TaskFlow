import { UserLogin } from "@/models/user/user/UserLogin";
import { Api } from "../axios";
import { cookies } from 'next/headers'
import { User } from "@/models";
import { AxiosResponse } from "axios";
import Cookies from "js-cookie";

class Authentication {

    async login(userlogin : UserLogin): Promise<AxiosResponse<User>>{
        return Api.post<User>("login", userlogin).then((response) => {
            const jwtCookie = response.headers["set-cookie"];
            if(jwtCookie) {
                const value = jwtCookie[0].split(';')[0].split('=')[1];
                const maxAge = jwtCookie[0].split(';')[1].split('=')[1];
                const path = "/";
                cookies().set("JWT", value, {maxAge: parseInt(maxAge), path: path})
            }
            console.log(jwtCookie)
            return response;
        })
    }


}

export const authentication = new Authentication();