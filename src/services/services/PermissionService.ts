import { Permission, PermissionPost, PermissionPut } from "@/models";
import { Api } from "../axios";

class PermissionService {

    async insert(permission: PermissionPost, projectId:number): Promise<Permission> {
       return (await Api.post<Permission>("permission/project/"+projectId, permission, {withCredentials: true})).data;
    }

    async upDate(permission: Permission): Promise<Permission> {
        const permissionPut = new PermissionPut(permission.id, permission.name ?? "", permission.permission)
       return (await Api.put<Permission>("permission/project/"+permission.project.id, permissionPut, {withCredentials: true})).data;
    }

    async patch(permission: Permission): Promise<Permission> {
        const permissionPut = new PermissionPut(permission.id, permission.name ?? "", permission.permission)
       return (await Api.patch<Permission>("permission/project/"+permission.project.id, permissionPut, {withCredentials: true})).data;
    }

    async findAll(projectId:number): Promise<Permission[]> {
        const response = await Api.get<Permission[]>("permission/project/"+projectId, {withCredentials: true});
        return response.data;
    }

    async delete(id: number, projectId:number): Promise<void> {
        await Api.delete(`permission/${id}/project/${projectId}`, {withCredentials: true});
   }
}

export const permissionService = new PermissionService();