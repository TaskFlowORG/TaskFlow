import { TypePermission } from "@/model/enums/TypePermission";
import { AllArgsConstructor } from "@/utils";
import { ProjectGet } from "../project/ProjectGetDTO";

@AllArgsConstructor
export class PermissionPost {
    name?: string;
    permission!: TypePermission;
    project!: ProjectGet;

    constructor(name: string, permission: TypePermission, project: ProjectGet) {}
}
