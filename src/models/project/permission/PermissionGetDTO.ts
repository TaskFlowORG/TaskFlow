import { AllArgsConstructor } from "@/utils";
import { Project } from "next/dist/build/swc";
import { ProjectGet } from "../project/ProjectGetDTO";
import { TypePermission } from "@/model/enums/TypePermission";

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