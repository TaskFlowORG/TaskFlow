import { Project } from "../Project";
import { TypeOfPage } from "../enums/TypeOfPage";

export class PagePostDTO {

    name: String;
    type: TypeOfPage;
    project: Project;

    constructor(name: String, type: TypeOfPage, project: Project) {

        this.name = name;
        this.type = type;
        this.project = project;
    }
}