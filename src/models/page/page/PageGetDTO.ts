
import { TypeOfPage } from "@/models/enums/TypeOfPage";
import { PropertyGet } from "@/models/property/property/PropertyGetDTO";
import { TaskPageGet } from "@/models/relations/task-page/TaskPageGetDTO";
import { AllArgsConstructor } from "@/utils";

@AllArgsConstructor
export class PageGet {
    id!: number;
    name!: string;
    type!: TypeOfPage;
    properties!: PropertyGet[];
    tasks!: TaskPageGet[];

    constructor(id: number, name: string, type: TypeOfPage, properties: PropertyGet[], tasks: TaskPageGet[]) {}

    equals(obj: any): boolean {
        if (obj instanceof PageGet) {
            return this.id === obj.id;
        }
        return false;
    }
}
