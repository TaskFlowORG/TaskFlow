import { TypePermission } from "@/models/enums/TypePermission";
 

export class PermissionPut {
    constructor(
        public id: number, 
        public name: string, 
        public isDefault: boolean,
        public permission: TypePermission) {}

    equals = (obj: any) => {
        return obj instanceof PermissionPut && obj.id === this.id;
    }
}
