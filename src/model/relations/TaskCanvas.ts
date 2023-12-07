import { Page } from "../pages/Page";
import { Task } from "../tasks/Task";

export class TaskCanvas {
    id?:null | Number; 
    task?:null | Task;
    x:number;
    y:number;

    constructor(id:null |number,  task:null | Task, page:null | Page, x: number, y: number) {
        this.id = id;
        this.task = task;
        this.x = x;
        this.y = y;
    }

}