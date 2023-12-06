import { Page } from "../pages/Page";
import { Task } from "../tasks/Task";

export class TaskCanvas {
    id: Number; 
    task: Task;
    x: Number;
    y: Number;

    constructor(id:Number,  taskId: Number, pageId: Number, task: Task, page: Page, x: Number, y: Number) {
        this.id = id;
        this.task = task;
        this.x = x;
        this.y = y;
    }

}