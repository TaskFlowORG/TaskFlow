import { Project } from "../Project";
import { TypeOfPage } from "../enums/TypeOfPage";
import { Property } from "../Properties/Property";
import { TaskCanvas } from "../relations/TaskCanvas";

export class Page {

    id: number;
    name: string;
    type: TypeOfPage;
    project: Project;
    properties: Array<Property>;
    tasks:Array<TaskCanvas>;


    constructor(id: number, name: string, type: TypeOfPage, project: Project, properties: Array<Property>, tasks:Array<TaskCanvas>) {

        this.id = id;
        this.name = name;
        this.type = type;
        this.project = project;
        this.properties = properties;
        this.tasks = tasks

    }

}