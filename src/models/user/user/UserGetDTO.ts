import { Archive } from "@/models/others/Archive";
import { Configuration } from "@/models/others/Configuration";
import { PermissionGet } from "@/models/project/permission/PermissionGetDTO";
import { AllArgsConstructor } from "@/utils";



@AllArgsConstructor
export class UserGet {

    username!: string;
    name!: string;
    surname!: string;
    address?: string;
    picture?: Archive;
    mail!: string;
    phone?: string;
    description?: string;
    points!: number;
    configuration!: Configuration;
    permissions!: PermissionGet[];

    constructor(username: string, name: string, surname: string, address: string, picture: Archive, mail: string, phone: string,
        description: string, points: number,
        configuration: Configuration, permissions: PermissionGet[]) { }
    equals = (obj: any) => {
        return obj instanceof UserGet && obj.username === this.username;
    }
}
