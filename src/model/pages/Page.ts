import { Project } from "../Project";
import { TypeOfPage } from "../enums/TypeOfPage";

export class Page {

    id: Number;
    name: String;
    type: TypeOfPage;
    project: Project;
    tasks: Array<TaskPage>;
    properties: Array<Property>;
    propertyOrdering: Property;

    constructor(id: Number, name: String, type: TypeOfPage, project: Project, tasks: Array<TaskPage>, properties: Array<Property>, propertyOrdering: Property) {

        this.id = id;
        this.name = name;
        this.type = type;
        this.project = project;
        this.tasks = tasks;
        this.properties = properties;
        this.propertyOrdering = propertyOrdering;
    }

}