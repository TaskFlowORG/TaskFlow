import { TypePermission } from "@/model/enums/TypePermission";
import { AllArgsConstructor } from "@/utils";

@AllArgsConstructor
export class PermissionPut {
    id!: number;
    name?: string;
    permission!: TypePermission;

    constructor(id: number, name: string, permission: TypePermission) {}

    equals = (obj: any) => {
        return obj instanceof PermissionPut && obj.id === this.id;
    }
}
