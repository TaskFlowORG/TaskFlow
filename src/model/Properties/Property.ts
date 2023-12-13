import { Project } from "../Project";
import { TypeOfProperty } from "../enums/TypeOfProperty";
import { Page } from "../pages/Page";

export class Property {

    id:number;
    name:string;
    visible:boolean;
    obligatory:boolean;
    type:TypeOfProperty;
    pages:Array<Page>;
    project:Project;



    constructor(id:number,name:string,visible:boolean,obligatory:boolean,type:TypeOfProperty,pages:Array<Page>,project:Project){
        this.id=id;
        this.name=name;
        this.visible=visible;
        this.obligatory=obligatory;
        this.type=type;
        this.pages=pages;
        this.project=project;
    }

}

