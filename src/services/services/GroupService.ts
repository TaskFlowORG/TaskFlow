import { Group, GroupPost, GroupPut, Permission, User } from "@/models";
import { Api } from "../axios";

class GroupService {

    async insert(group: GroupPost): Promise<void> {
        await Api.post("group", group);
    }

    async update(group: Group): Promise<void> {
        const groupPut = new GroupPut(group.id, group.name ?? "", group.description ?? "", group.permissions, group.users)
        await Api.put("group", groupPut);
    }

    async patch(group: Group): Promise<void> {
        const groupPut = new GroupPut(group.id, group.name ?? "", group.description ?? "", group.permissions, group.users)
        await Api.patch("group", groupPut);
    }

    async updateUser(user: User, groupId: number): Promise<void> {
        await Api.put(`group/user/${groupId}`, user);
    }

    async findOne(id: number): Promise<Group> {
        return (await Api.get<Group>(`group/${id}`)).data;
    }

    async findAll(): Promise<Group[]> {
        return (await Api.get<Group[]> ("group")).data;
    }

    async findGroupsByUser(userId: string): Promise<Group[]> {
        return (await Api.get<Group[]>(`group/user/${userId}`)).data;
    }

    async findGroupsOfAProject(projectId: number): Promise<Group[]> {
        return( await Api.get<Group[]>(`group/project/${projectId}`)).data;
    }

    async findPermissionOfAGroupInAProject(groupId: number, projectId: number): Promise<Permission> {
        return (await Api.get<Permission>(`group/${groupId}/${projectId}`)).data;
    }

    async findAllPermissionsOfAGroupInAProject(groupId: number, projectId: number): Promise<Permission[]> {
        return (await Api.get<Permission[]>(`group/${groupId}/permissions/${projectId}`)).data;
    }

    async delete(id: number): Promise<void> {
        await Api.delete(`group/${id}`);
    }

    async updatePicture(picture: File, id: number): Promise<void> {
        const formData = new FormData();
        formData.append("picture", picture);
        await Api.patch(`group/picture/${id}`, formData);
    }

    async updateOwner(newOwner: User, projectId: number): Promise<void> {
        await Api.patch(`group/change-owner/${projectId}`, newOwner);
    }
}

export const groupService = new GroupService();