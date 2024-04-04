import NextAuth from "next-auth/next";
import { Awaitable, NextAuthOptions } from "next-auth";
import  CredentialProvider  from "next-auth/providers/credentials";
import {authentication} from "@/services/services/Authentication"
import { UserLogin } from "@/models/user/user/UserLogin";
import Cookies from "js-cookie";

export const OPTIONS: NextAuthOptions = {
providers: [
    CredentialProvider({
        name: "Credentials",
        credentials: {
            username: { label: "username", type: "text" },
            password: { label: "password", type: "password" }
        },
        async authorize(credentials):Promise<any>{
            return await authentication.login(new UserLogin(credentials!.username, credentials!.password)).then((response) => {
                console.log("header2: "+response.headers)
                if (response.headers && response.headers["set-cookie"]) {
                    const jwtCookie = response.headers["set-cookie"];
                    // Defina o cookie no cliente
                    Cookies.set("JWT", jwtCookie);
                  }
                return response.data;
            })
        } , 
        
        
    })
],pages: {
    signIn: '/login',
    error : '/login'
},
}

const handler = NextAuth(OPTIONS);
export {handler as GET , handler as POST}