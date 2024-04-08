 
import { Project } from "../project/Project";
import { TypePermission } from "@/models/enums/TypePermission";

export class Permission {
    

    constructor(
        public id: number, 
        public name: string, 
        public permission: TypePermission,
        public project: Project) {}

    equals = (obj: any) => {
        return obj instanceof Permission && obj.id === this.id;
    }
}