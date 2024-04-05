 
import { Property } from "@/models";
import { Page } from "../page/Page";
import { TypeOfPage } from "@/models/enums/TypeOfPage";
import { Archive } from "@/models/others/Archive";
import { TaskCanvas } from "@/models/relations/task-canvas/TaskCanvas";

export class CanvasPage extends Page {

    constructor(
        public id: number,
        public name: string,
        public type: TypeOfPage,
        public properties: Property[],
        public tasks: TaskCanvas[],
        public draw: Archive
    ) {
        super(id, name, type, properties, tasks);
    }
    equals = (obj:any) => {
        if(obj instanceof CanvasPage){
            return obj.id === this.id;
        }
        return false;
    }
}
