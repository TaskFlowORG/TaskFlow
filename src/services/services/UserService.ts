"use client";

import { Permission, User, UserPost, UserPut } from "@/models";
import { Api } from "../axios";
import { OtherUser } from "@/models";
import { UserChangeUsername } from "@/models/user/user/UserChangeUsername";
import { UserChangePassword } from "@/models/user/user/UserChangePassword";
class UserService {

    async insert(user: UserPost): Promise<User> {
        const response = await Api.post<User>("user", user, { withCredentials: true });
        return response.data;
    }

    async update(user: User): Promise<User> {
        const userPut = new UserPut(user.id, user.name, user.surname, user.mail, user.phone, user.description, user.configuration, user.permissions, user.authenticate, user.notifications);
        const response = await Api.put<User>("user", userPut, { withCredentials: true });
        return response.data;
    }

    async changeUsername(user:UserChangeUsername): Promise<User> {
        const response = await Api.patch<User>("user/changeUsername", user, {withCredentials: true});
        return response.data;
    }
    
    async patch(user: User): Promise<User> {
        const userPut = new UserPut(user.id, user.name, user.surname, user.mail, user.phone, user.description, user.configuration, user.permissions, user.authenticate, user.notifications);
        const response = await Api.patch<User>("user",  userPut, { withCredentials: true });
        return response.data;
    }

    async findByUsername(username: string): Promise<OtherUser> {
        return (await Api.get<OtherUser>(`user/${username}`, { withCredentials: true })).data;
    }

    async findLogged(): Promise<User> {
        return (await Api.get<User>(`user/logged`, { withCredentials: true })).data;
    }
    async changePassword(user: UserChangePassword): Promise<User> {
        const response = await Api.patch<User>(`user/changePassword`, user, { withCredentials: true });
        return response.data;
    }

    async upDatePicture(picture: File): Promise<User> {
        const formData = new FormData();
        formData.append('picture', picture);
        const response = await Api.patch<User>(`user/picture`, formData, { withCredentials: true });
        return response.data;

    }

    async upDatePassword(username: string, password: string): Promise<User> {
        const formData = new FormData();
        formData.append('password', password);
        const response = await Api.patch<User>(`user/password/${username}`, formData, { withCredentials: true });
        return response.data;
    }

    async delete(username: string): Promise<User> {
        const response = await Api.delete<User>(`user/${username}`, { withCredentials: true });
        return response.data;
    }

    async updatePassword(username: string, password: string): Promise<User> {
        const response = await Api.patch<User>(`password/${username}`, password, { withCredentials: true });
        return response.data;
    }

    async findAll(): Promise<OtherUser[]> {
        return (await Api.get<OtherUser[]>(`user`, { withCredentials: true })).data;
    }

    async updatePermission(username: string, permission: Permission): Promise<Permission> {
        const response = await Api.patch<Permission>(`user/${username}/update-permission/project/${permission.project.id}`, permission, { withCredentials: true });
        return response.data;
    }
    async getOutOfAGroup(groupId : number): Promise<void> {
        // /exit/group/{groupId}
        const response = await Api.patch<User>(`user/exit/group/${groupId}`)
    }
}


export const userService = new UserService();
