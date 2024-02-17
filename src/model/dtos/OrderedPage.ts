import { AllArgsConstructor } from "@/utils";
import { Page } from "./Page";
import { Property } from "../properties/Property";
import { TypeOfPage } from "../enums/TypeOfPage";
import { Project } from "../Project";
import { TaskPage } from "../relations/TaskPage";

@AllArgsConstructor
class OrderedPage extends Page {
    propertyOrdering?: Property;

    constructor(id: number, name: string, type: TypeOfPage, properties: Property[], project: Project, tasks: TaskPage[], propertyOrdering: Property) {
        super(id, name, type, properties, project, tasks);
    }
    equals(obj: any): boolean {
        if (obj instanceof OrderedPage) {
            return obj.id === this.id;
        }
        return false;
    }
}
