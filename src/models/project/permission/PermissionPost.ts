import { TypePermission } from "@/models/enums/TypePermission";
import { Project } from "../project/Project";

export class PermissionPost {

    constructor(
        name: string,
         permission: TypePermission, 
         project: Project) {}
}
