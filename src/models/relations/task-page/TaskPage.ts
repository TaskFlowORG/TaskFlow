
import { Task } from '@/models/task/task/Task';

export class TaskPage {

    constructor(
        public id: number,
        public task: Task,
    ) { }
    

    equals(obj: any): boolean {
        if (obj instanceof TaskPage) {
            return obj.constructor === this.constructor && obj.id === this.id;
        }
        return false;
    }
}