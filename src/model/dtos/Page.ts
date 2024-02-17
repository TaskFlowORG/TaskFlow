import { AllArgsConstructor } from "@/utils";
import { TypeOfPage } from "../enums/TypeOfPage";
import { Property } from "../properties/Property";
import { Project } from "../Project";
import { TaskPage } from "../relations/TaskPage";

@AllArgsConstructor
export class Page {
    id!: number;
    name!: string;
    type!: TypeOfPage;
    properties!: Property[];
    project?: Project;
    tasks!: TaskPage[];

    constructor(id: number, name: string, type: TypeOfPage, properties: Property[], project: Project, tasks: TaskPage[]) {}

    equals(obj: any): boolean {
        if (obj instanceof Page) {
            return this.id === obj.id;
        }
        return false;
    }
}
