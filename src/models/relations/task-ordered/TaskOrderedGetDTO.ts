import { AllArgsConstructor } from "@/utils";
import { TaskPageGet } from "../task-page/TaskPageGetDTO";
import { TaskGet } from "@/model/task/task/TaskGetDTO";

@AllArgsConstructor
export class TaskOrderedGet extends TaskPageGet {
    indexAtColumn!: number;

    constructor( id: number,task: TaskGet,indexAtColumn: number) {
        super(id, task);
    }

    equals(obj: any): boolean {
        if (obj instanceof TaskOrderedGet) {
            return this.id === obj.id;
        }
        return false;
    }
}
