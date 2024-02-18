
import { TaskGet } from '@/models/task/task/TaskGetDTO';
import { AllArgsConstructor } from '@/utils';

@AllArgsConstructor
export class TaskPageGet {
    id!: number;
    task!: TaskGet;

    constructor(id: number, task: TaskGet) {}
    

    equals(obj: any): boolean {
        if (obj instanceof TaskPageGet) {
            return obj.constructor === this.constructor && obj.id === this.id;
        }
        return false;
    }
}