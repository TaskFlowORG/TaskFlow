import { AllArgsConstructor } from "@/utils";
import { TaskPage } from "./TaskPage";
import { Task } from "../tasks/Task";

@AllArgsConstructor
export class TaskOrdered extends TaskPage {
    indexAtColumn!: number;

    constructor( id: number,task: Task,indexAtColumn: number) {
        super(id, task);
    }

    equals(obj: any): boolean {
        if (obj instanceof TaskOrdered) {
            return this.id === obj.id;
        }
        return false;
    }
}
