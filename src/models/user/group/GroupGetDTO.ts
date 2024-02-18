import { AllArgsConstructor } from "@/utils";
import { UserGet } from "../user/UserGetDTO";
import { SimpleUserGet } from "../user/SimpleUserGetDTO";
import { Archive } from "@/model/others/Archive";
import { PermissionGet } from "@/model/project/permission/PermissionGetDTO";

@AllArgsConstructor
export class GroupGet {
    id!: number;               
    name?: string;             
    picture?: Archive;         
    description?: string;      
    permissions!: PermissionGet[];
    owner!: SimpleUserGet;           
    users!: SimpleUserGet[];         

    constructor(
        id: number,
        name: string,
        picture: Archive,
        description: string,
        permissions: PermissionGet,
        owner: SimpleUserGet,
        users: SimpleUserGet[]
    ) { }

    equals = (obj: any) => {
        return obj instanceof GroupGet && obj.id === this.id;
    }

}