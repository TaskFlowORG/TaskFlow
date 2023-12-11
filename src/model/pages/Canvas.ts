import { TaskCanvas } from "../relations/TaskCanvas";

export class Canvas {
      draw : String;
      tasks:Array<TaskCanvas>;

        constructor(draw:String, tasks:Array<TaskCanvas>){
            this.draw=draw;
            this.tasks = tasks;
        }
        
}