import { Property } from './../Properties/Property';
import { Project } from './../Project';
import { TypeOfPage } from './../enums/TypeOfPage';
import { Page } from "./Page";
import { TaskCanvas } from "../relations/TaskCanvas";
import { Archive } from '../Archive';

export class Canvas extends Page {
  draw: Archive;

  constructor(id: number, name: string, type: TypeOfPage, project: Project, properties: Array<Property>, tasks:Array<TaskCanvas>, draw: Archive) {
    super(id, name, type, project, properties, tasks)
    this.draw = draw;
  }
}
