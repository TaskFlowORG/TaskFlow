import { AllArgsConstructor } from "@/utils";
import { UserGet } from "../user/UserGetDTO";
import { PermissionGet } from "@/models/project/permission/PermissionGetDTO";

@AllArgsConstructor
export class GroupPost {
    name?: string;                             
    description?: string;                    
    permissions?: PermissionGet[] | null;                   
    owner!: UserGet;                    
    users?: UserGet[];                

    constructor(
        name: string,
        description: string,
        permissions: PermissionGet[] | null,
        owner: UserGet,
        users: UserGet[],
    ) { }
}