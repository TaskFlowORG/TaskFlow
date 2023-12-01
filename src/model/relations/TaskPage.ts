import { Page } from "../pages/Page";
import { Task } from "../tasks/Task";

export class TaskPage {
    taskId: Number;
    pageId: Number;
    task: Task;
    page: Page;
    x: Number;
    y: Number;

    constructor(taskId: Number, pageId: Number, task: Task, page: Page, x: Number, y: Number) {
        this.taskId = taskId;
        this.pageId = pageId;
        this.task = task;
        this.page = page;
        this.x = x;
        this.y = y;
    }

}