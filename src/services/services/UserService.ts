"use client";

import { Permission, User, UserPost, UserPut } from "@/models";
import { Api } from "../axios";
import { OtherUser } from "@/models";
import { UserDetails } from "@/models/user/user/UserDetails";
import { deserialize } from "v8";

class UserService {

    async insert(user:UserPost):Promise<User>{
        const response = await Api.post<User>("user", user);
        return response.data;
    }
    async update(user:User):Promise<User>{
        const userPut = new UserPut(user.id, user.name, user.surname,user.address, user.mail, user.phone, user.description, user.configuration, user.permissions);
        const response = await Api.put<User>("user", userPut);
        return response.data;
    }

    async patch(user:User):Promise<User>{
        const userPut = new UserPut(user.id, user.name, user.surname, user.address, user.mail, user.phone, user.description, user.configuration, user.permissions);
        const response = await Api.patch<User>("user", userPut);
        return response.data;
    }

    async findByUsername(username:string):Promise<OtherUser>{
        return (await Api.get<OtherUser>(`user/${username}`)).data;
    }

    async findLogged():Promise<User>{
        return (await Api.get<User>(`user/logged`)).data;
    }


    async upDatePicture(picture:File, username:string):Promise<User>{
        const formData = new FormData();
        formData.append('picture', picture);
        const response = await Api.patch<User>(`user/picture/${username}`, formData);
        return response.data;
    }

    async upDatePassword( username:string,  password:string):Promise<User> {
        const response = await Api.patch<User>(`user/password/${username}`, password);
        return response.data;
    }

    async delete(username:string):Promise<User>{
        const response = await Api.delete<User>(`user/${username}`);
        return response.data;
    }

    async updatePassword(username: string, password: string): Promise<User> {
        const response = await Api.patch<User>(`password/${username}`, password);
        return response.data;
    }

    async findAll(): Promise<OtherUser[]> {
        return (await Api.get<OtherUser[]>(`user`)).data;
    }

    async updatePermission(username: string, permission: Permission): Promise<Permission> {
        const response = await Api.patch<Permission>(`${username}/update-permission/project/${permission.project.id}`, permission);
        return response.data;
    }

    deserializeCookies = (headers: any) => {
        const cookies = headers['set-cookie'];
        if (cookies) {
            cookies.forEach((cookie: string) => {
                console.log("lskjdfkj")
                const [name, value] = cookie.split(';')[0].split('=');
                document.cookie = `${name}=${value}; path=/`;
                const [expires, maxAge] = cookie.split(';');
                if (expires) {
                    document.cookie = `${name}=${value}; expires=${expires.split('=')[1]}; path=/`;
                }
            });
        }
    }
}


export const userService = new UserService();
