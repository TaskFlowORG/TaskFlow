import { Configuration } from "@/model/others/Configuration";
import { PermissionGet } from "@/model/project/permission/PermissionGetDTO";
import { AllArgsConstructor } from "@/utils";

@AllArgsConstructor
export class UserPut {

    username!: string;
    name!: string;
    surname!: string;
    address?: string;
    mail!: string;
    phone?: string;
    description?: string;
    configuration!: Configuration ; 
    permissions!: PermissionGet[];

    constructor(username: string, name: string, surname: string, address: string,
         mail: string, phone: string, description: string, configuration: Configuration, 
         permissions: PermissionGet[]) {}

    equals = (obj: any) => {
        return obj instanceof UserPut && obj.username === this.username;
    }
}
