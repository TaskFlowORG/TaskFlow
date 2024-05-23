import { TypePermission } from "@/models/enums/TypePermission";
 

export class PermissionPut {
    constructor(
        public id: number, 
        public name: string, 
        public permission: TypePermission,
        public isDefault: boolean
    
    ) {}

    equals = (obj: any) => {
        return obj instanceof PermissionPut && obj.id === this.id;
    }
}
