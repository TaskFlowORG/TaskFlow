import { AllArgsConstructor } from '@/utils';
import { Task } from '../tasks/Task';

@AllArgsConstructor
export class TaskPage {
    id!: number;
    task!: Task;

    constructor(id: number, task: Task) {}
    

    equals(obj: any): boolean {
        if (obj instanceof TaskPage) {
            return obj.constructor === this.constructor && obj.id === this.id;
        }
        return false;
    }
}