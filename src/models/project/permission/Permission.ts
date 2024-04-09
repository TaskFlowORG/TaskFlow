 
import { Project } from "../project/Project";
import { TypePermission } from "@/models/enums/TypePermission";
import { ProjectSimple } from "../project/ProjectSimple";

export class Permission {
    

    constructor(
        public id: number, 
        public name: string, 
        public permission: TypePermission,
        public project: ProjectSimple) {}

    equals = (obj: any) => {
        return obj instanceof Permission && obj.id === this.id;
    }
}