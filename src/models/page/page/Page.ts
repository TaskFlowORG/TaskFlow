
import { TypeOfPage } from "@/models/enums/TypeOfPage";
import { TaskPage } from "@/models/relations/task-page/TaskPage";
import { Property } from "@/models";
 

export class Page {

    constructor(
        public id: number,
        public name: string,
        public type: TypeOfPage,
        public properties: Property[],
        public tasks: TaskPage[]) { }

    equals(obj: any): boolean {
        if (obj instanceof Page) {
            return this.id === obj.id;
        }
        return false;
    }
}
