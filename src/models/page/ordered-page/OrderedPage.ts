 
import { Property } from "@/models";
import { Page } from "../page/Page";
import { TypeOfPage } from "@/models/enums/TypeOfPage";
import { TaskPage } from "@/models/relations/task-page/TaskPage";


export class OrderedPage extends Page {
    constructor(
        public id: number,
        public name: string,
        public type: TypeOfPage,
        public properties: Property[],
        public tasks: TaskPage[],
        public propertyOrdering: Property
    ) {
        super(id, name, type, properties, tasks);
    }
    equals(obj: any): boolean {
        if (obj instanceof OrderedPage) {
            return obj.id === this.id;
        }
        return false;
    }
}