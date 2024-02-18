import { AllArgsConstructor } from "@/utils";
import { PageGet } from "../page/PageGetDTO";
import { PropertyGet } from "@/model/property/property/PropertyGetDTO";
import { TypeOfPage } from "@/model/enums/TypeOfPage";
import { ProjectGet } from "@/model/project/project/ProjectGetDTO";
import { TaskPageGet } from "@/model/relations/task-page/TaskPageGetDTO";


@AllArgsConstructor
export class OrderedPageGet extends PageGet {
    propertyOrdering!: PropertyGet;

    constructor(id: number, name: string, type: TypeOfPage, properties: PropertyGet[], tasks: TaskPageGet[], propertyOrdering: PropertyGet) {
        super(id, name, type, properties, tasks);
    }
    equals(obj: any): boolean {
        if (obj instanceof OrderedPageGet) {
            return obj.id === this.id;
        }
        return false;
    }
}