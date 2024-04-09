
import { TaskPage } from '../task-page/TaskPage';
import { Task } from '@/models/task/task/Task';

export class TaskCanvas extends TaskPage {

    constructor(
        public id: number,
        public x: number,
        public y: number,
        public tasks: Task,
    ) {
        super(id, tasks);
    }


    equals(obj: any): boolean {
        if (obj instanceof TaskCanvas) {
            return obj.id === this.id;
        }
        return false;
    }
}
