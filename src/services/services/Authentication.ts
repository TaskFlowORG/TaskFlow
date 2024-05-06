
import { UserLogin } from "@/models/user/user/UserLogin";
import { Api } from "../axios";
import { User } from "@/models";
import { AxiosResponse } from "axios";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
class Authentication {

    async login(userlogin : UserLogin, cookies:() => ReadonlyRequestCookies): Promise<AxiosResponse<User>>{
        return Api.post<User>("login", userlogin).then((response) => {
            const jwtCookie = response.headers["set-cookie"];
             if(jwtCookie) {
                 const value = jwtCookie[0].split(';')[0].split('=')[1];
                 const maxAge = jwtCookie[0].split(';')[1].split('=')[1];
                 const path = "/";
                 console.log("Entrou")
                 cookies().set("JWT", value, {maxAge: parseInt(maxAge), path: path})
             }
            console.log(jwtCookie)
            return response;

        }).catch((error) => {
            console.log(error)
            return error.response;
        })
    }
    
    async logout(): Promise<void> {
        await Api.post<void>("logout", {}, {withCredentials: true});
    }


}

export const authentication = new Authentication();