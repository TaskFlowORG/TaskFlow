 
import { TaskPage } from "../task-page/TaskPage";
import { Task } from "@/models/task/task/Task";

export class TaskOrdered extends TaskPage {

    constructor(
        public id: number,
        public indexAtColumn: number,
        public tasks: Task,
    ) {
        super(id, tasks);
    }

    equals(obj: any): boolean {
        if (obj instanceof TaskOrdered) {
            return this.id === obj.id;
        }
        return false;
    }
}
