import { AllArgsConstructor } from "@/utils";
import { Project } from "./Project";
import { TypePermission } from "./enums/TypePermission";

@AllArgsConstructor
export class Permission {
    id!: number;
    name?: string;
    permission!: TypePermission;
    project!: Project;

    constructor(id: number, name: string, permission: TypePermission, project: Project) {}

    equals = (obj: any) => {
        return obj instanceof Permission && obj.id === this.id;
    }
}

