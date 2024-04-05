"use client";

import { Permission, User, UserPost, UserPut } from "@/models";
import { Api } from "../axios";
import { OtherUser } from "@/models";
import { UserDetails } from "@/models/user/user/UserDetails";
import { deserialize } from "v8";

class UserService {

    async insert(user:UserPost):Promise<User>{
        const response = await Api.post<User>("user", user, {withCredentials: true});
        return response.data;
    }
    async update(user:User):Promise<User>{
        const userPut = new UserPut(user.id, user.name, user.surname,user.address, user.mail, user.phone, user.description, user.configuration, user.permissions);
        const response = await Api.put<User>("user", userPut, {withCredentials: true});
        return response.data;
    }

    async patch(user:User):Promise<User>{
        const userPut = new UserPut(user.id, user.name, user.surname, user.address, user.mail, user.phone, user.description, user.configuration, user.permissions);
        const response = await Api.patch<User>("user", userPut, {withCredentials: true});
        return response.data;
    }

    async findByUsername(username:string):Promise<OtherUser>{
        return (await Api.get<OtherUser>(`user/${username}`, {withCredentials: true})).data;
    }

    async findLogged():Promise<User>{
        return (await Api.get<User>(`user/logged`, {withCredentials: true})).data;
    }


    async upDatePicture(picture:File, username:string):Promise<User>{
        const formData = new FormData();
        formData.append('picture', picture);
        const response = await Api.patch<User>(`user/picture/${username}`, formData, {withCredentials: true});
        return response.data;
    }

    async upDatePassword( username:string,  password:string):Promise<User> {
        const response = await Api.patch<User>(`user/password/${username}`, password, {withCredentials: true});
        return response.data;
    }

    async delete(username:string):Promise<User>{
        const response = await Api.delete<User>(`user/${username}`, {withCredentials: true});
        return response.data;
    }

    async updatePassword(username: string, password: string): Promise<User> {
        const response = await Api.patch<User>(`password/${username}`, password, {withCredentials: true});
        return response.data;
    }

    async findAll(): Promise<OtherUser[]> {
        return (await Api.get<OtherUser[]>(`user`)).data;
    }

    async updatePermission(username: string, permission: Permission): Promise<Permission> {
        const response = await Api.patch<Permission>(`${username}/update-permission/project/${permission.project.id}`, permission, {withCredentials: true});
        return response.data;
    }
}


export const userService = new UserService();
