import { TypePermission } from "@/models/enums/TypePermission";
import { Project } from "../project/Project";
import { ProjectSimple } from "../project/ProjectSimple";

export class PermissionPost {

    constructor(
        public name: string,
        public permission: TypePermission, 
        public isDefault: boolean,
        public project: Project | ProjectSimple) {}
}
