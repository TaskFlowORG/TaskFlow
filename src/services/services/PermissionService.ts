import { Permission, PermissionPost, PermissionPut } from "@/models";
import { Api } from "../axios";

class PermissionService {

    async insert(permission: PermissionPost): Promise<void> {
        await Api.post("permission", permission);
    }

    async upDate(permission: Permission): Promise<void> {
        const permissionPut = new PermissionPut(permission.id, permission.name ?? "", permission.permission)
        await Api.put("permission", permissionPut);
    }

    async patch(permission: Permission): Promise<void> {
        const permissionPut = new PermissionPut(permission.id, permission.name ?? "", permission.permission)
        await Api.patch("permission", permissionPut);
    }

    async findOne(id: number): Promise<Permission> {
        const response = await Api.get<Permission>(`permission/${id}`);
        return response.data;
    }

    async findAll(): Promise<Permission[]> {
        const response = await Api.get<Permission[]>("permission");
        return response.data;
    }

    async delete(id: number): Promise<void> {
        await Api.delete(`permission/${id}`);
    }
}

export const permissionService = new PermissionService();