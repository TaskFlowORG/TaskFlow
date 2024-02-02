import { Property } from './../Properties/Property';
import { Project } from './../Project';
import { TypeOfPage } from './../enums/TypeOfPage';
import { Page } from "./Page";
import { TaskCanvas } from "../relations/TaskCanvas";

export class Canvas extends Page {
  draw: string;

  constructor(id: number, name: string, type: TypeOfPage, project: Project, properties: Array<Property>, tasks:Array<TaskCanvas>, draw: string) {
    super(id, name, type, project, properties, tasks)
    this.draw = draw;
  }
}
