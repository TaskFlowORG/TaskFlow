import { AllArgsConstructor } from "@/utils";
import { SimpleUserGet } from "../user/SimpleUserGetDTO";
import { PermissionGet } from "@/models/project/permission/PermissionGetDTO";

@AllArgsConstructor
export class GroupPut {
    id!: number;
    name?: string;
    description?: string;
    permissions!: PermissionGet[];
    users!: SimpleUserGet[];

    constructor(
        id: number,
        name: string,
        description: string,
        permissions: PermissionGet[],
        users: SimpleUserGet[],
    ) { }

    equals = (obj: any) => {
        return obj instanceof GroupPut && obj.id === this.id;
    }
}