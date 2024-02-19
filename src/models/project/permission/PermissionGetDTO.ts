import { AllArgsConstructor } from "@/utils";
import { ProjectGet } from "../project/ProjectGetDTO";
import { TypePermission } from "@/models/enums/TypePermission";

@AllArgsConstructor
export class PermissionGet {
    id!: number;
    name?: string;
    permission!: TypePermission;
    project!: ProjectGet;

    constructor(id: number, name: string, permission: TypePermission, project: ProjectGet) {}

    equals = (obj: any) => {
        return obj instanceof PermissionGet && obj.id === this.id;
    }
}