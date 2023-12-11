import { Project } from "../Project";
import { TypeOfPage } from "../enums/TypeOfPage";
import { Property } from "../Properties/Property";
import { Page } from "./Page";
import { Task } from "../tasks/Task";

export class CommonPage extends Page {
    tasks: Array<Task>;
    propertyOrdering: Property;

    constructor(id: Number, name: String, type: TypeOfPage, project: Project, tasks: Array<Task>, properties: Array<Property>, propertyOrdering: Property) {
        super(id, name, type, project, properties)
        this.tasks = tasks;
        this.propertyOrdering = propertyOrdering;
    }
}