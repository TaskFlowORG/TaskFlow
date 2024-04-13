import { Group, GroupPost, GroupPut, Permission, User } from "@/models";
import { Api } from "../axios";

class GroupService {

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

    async findGroupsByUser(): Promise<Group[]> {
        const response = await Api.get<Group[]>("group", { withCredentials: true });
        return response.data;
    }

    async findGroupsByAProject(projectId: number): Promise<Group[]> {
        const response = await Api.get<Group[]>(`group/project/${projectId}`, { withCredentials: true });
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

    async updateOwner(newOwner: User, groupId: number): Promise<Group> {
        const response = await Api.patch<Group>(`group/${groupId}/change-owner`, newOwner, { withCredentials: true });
        return response.data;
    }
}

export const groupService = new GroupService();
