import { Project } from "../Project";
import { TypeOfPage } from "../enums/TypeOfPage";
import { Property } from "../Properties/Property";

export class Page {

    id: Number;
    name: String;
    type: TypeOfPage;
    project: Project;
    properties: Array<Property>;

    constructor(id: Number, name: String, type: TypeOfPage, project: Project, properties: Array<Property>) {

        this.id = id;
        this.name = name;
        this.type = type;
        this.project = project;
        this.properties = properties;

    }

}