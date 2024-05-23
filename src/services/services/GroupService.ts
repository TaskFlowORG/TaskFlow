import { Group, GroupPost, GroupPut, OtherUser, Permission, User } from "@/models";
import { Api } from "../axios";
import { SimpleGroup } from "@/models/user/group/SimpleGroup";


class GroupService {
    async removeOfPoject(groupId: number, pojectId: number | undefined):Promise<Group|undefined> {
        
        if(pojectId){
            const response = await Api.patch<Group>("group/remove/"+groupId+"/from/"+pojectId, { withCredentials: true });
            return response.data;
        }
    }

    async insert(group: GroupPost): Promise<Group> {
        const response = await Api.post<Group>("group", group, { withCredentials: true });
        return response.data;
    }

    async update(group: GroupPut, groupId: number): Promise<Group> {
        const response = await Api.put<Group>(`group/${groupId}`, group, { withCredentials: true });
        return response.data;
    }

    async patch(group: GroupPut, groupId: number): Promise<Group> {
        const response = await Api.patch<Group>(`group/${groupId}`, group, { withCredentials: true });
        return response.data;
    }

    async findOne(groupId: number): Promise<Group> {
        const response = await Api.get<Group>(`group/${groupId}`, { withCredentials: true });
        return response.data;
    }

    async findGroupsByUser(): Promise<SimpleGroup[]> {
        const response = await Api.get<SimpleGroup[]>("group/my", { withCredentials: true });
        return response.data;
    }
    async findAll(): Promise<SimpleGroup[]> {
        const response = await Api.get<SimpleGroup[]>("group", { withCredentials: true });
        return response.data;
    }

    async findGroupsByAProject(projectId: number): Promise<SimpleGroup[]> {
        const response = await Api.get<SimpleGroup[]>(`group/project/${projectId}`, { withCredentials: true });
        return response.data;
    }

    async delete(groupId: number): Promise<void> {
        await Api.delete(`group/${groupId}`, { withCredentials: true });
    }

    async updatePicture(picture: File, groupId: number): Promise<Group> {
        const formData = new FormData();
        formData.append("picture", picture);
        const response = await Api.patch<Group>(`group/${groupId}/picture`, formData, { withCredentials: true });
        return response.data;
    }

    async updateOwner(newOwner: OtherUser, groupId: number): Promise<Group> {
        const response = await Api.patch<Group>(`group/${groupId}/change-owner`, newOwner, { withCredentials: true });
        return response.data;
    }

    async inviteUser(groupId: number, userId: number): Promise<void> {
         await Api.post<Group>(`group/${groupId}/add-user/${userId}`, {}, {withCredentials: true});
    }

}

export const groupService = new GroupService();
