import { TypePermission } from "@/models/enums/TypePermission";
import { Project } from "../project/Project";
import { ProjectSimple } from "../project/ProjectSimple";

export class PermissionPost {

    constructor(
        name: string,
         permission: TypePermission, 
         isDefault: boolean,
         
         project: Project | ProjectSimple) {}
}
