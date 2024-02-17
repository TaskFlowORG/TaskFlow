
import { AllArgsConstructor } from '@/utils';
import { TaskPage } from './TaskPage';
import { Task } from '../tasks/Task';

@AllArgsConstructor
export class TaskCanvas extends TaskPage {
    x!: number;
    y!: number;

    constructor( id: number, task: Task, x: number, y: number) {
        super(id, task);
    }

    equals(obj: any): boolean {
        if (obj instanceof TaskCanvas) {
            return obj.id === this.id;
        }
        return false;
    }
}
