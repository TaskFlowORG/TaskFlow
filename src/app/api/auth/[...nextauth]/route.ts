import NextAuth from "next-auth/next";
import CredentialProvider from "next-auth/providers/credentials";
import { authentication } from "@/services/services/Authentication"
import { UserLogin } from "@/models/user/user/UserLogin";
import Cookies from "js-cookie";
import { AuthOptions, NextAuthOptions } from "next-auth";
import { JWTDecodeParams } from "next-auth/jwt";

export const OPTIONS: NextAuthOptions = {
   
    providers: [
        CredentialProvider({
            name: "Credentials",
            credentials: {
                username: { label: "username", type: "text" },
                password: { label: "password", type: "password" }
            },

            async authorize(credentials): Promise<any> {
                return await authentication.login(new UserLogin(credentials!.username, credentials!.password)).then((response) => {
                    return response.data;
                })
            },
        })
    ], pages: {
        signIn: '/login',
        signOut: '/login',
        error: '/login',
        verifyRequest: '/login',
        newUser: '/register'
                
    },
}

const handler = NextAuth(OPTIONS);
export { handler as GET, handler as POST }