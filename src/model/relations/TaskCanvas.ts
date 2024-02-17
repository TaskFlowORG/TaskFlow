import { Page } from "../pages/Page";
import { Task } from "../tasks/Task";

export class TaskCanvas {

    id?:null | number; 
    task: Task;
    x:number;
    y:number;
    indexAtColumn:number;

    constructor(id:null |number,  task:Task, page:null | Page, x: number, y: number, index:number) {

        this.id = id;
        this.task = task;
        this.x = x;
        this.y = y;
        this.indexAtColumn = index
    }

}