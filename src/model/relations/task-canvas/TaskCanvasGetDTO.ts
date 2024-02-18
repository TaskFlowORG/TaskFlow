
import { AllArgsConstructor } from '@/utils';
import { TaskPageGet } from '../task-page/TaskPageGetDTO';
import { TaskGet } from '@/model/task/task/TaskGetDTO';

@AllArgsConstructor
export class TaskCanvasGet extends TaskPageGet {
    x!: number;
    y!: number;

    constructor( id: number, task: TaskGet, x: number, y: number) {
        super(id, task);
    }

    equals(obj: any): boolean {
        if (obj instanceof TaskCanvasGet) {
            return obj.id === this.id;
        }
        return false;
    }
}
