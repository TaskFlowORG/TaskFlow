import { TypeOfPage } from "@/model/enums/TypeOfPage";
import { PropertyGet } from "@/model/property/property/PropertyGetDTO";
import { TaskPageGet } from "@/model/relations/task-page/TaskPageGetDTO";
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
