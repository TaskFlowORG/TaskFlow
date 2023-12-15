import { Project } from "../Project";
import { TypeOfPage } from "../enums/TypeOfPage";
import { Property } from "../Properties/Property";
import { Page } from "./Page";
import { Task } from "../tasks/Task";
import { TaskCanvas } from "../relations/TaskCanvas";

export class CommonPage extends Page {
    propertyOrdering: Property;

    constructor(id: number, name: string, type: TypeOfPage, project: Project, properties: Array<Property>, propertyOrdering: Property, tasks:Array<TaskCanvas>) {
        super(id, name, type, project, properties, tasks)
        this.propertyOrdering = propertyOrdering;
    }
}