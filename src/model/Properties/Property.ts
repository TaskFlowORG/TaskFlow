import { Project } from "../Project";
import { TypeOfProperty } from "../enums/TypeOfProperty";
import { Page } from "../pages/Page";

export class Property {

    id:Number;
    name:String;
    visible:Boolean;
    obligatory:Boolean;
    type:TypeOfProperty;
    pages:Array<Page>;
    project:Project;



    constructor(id:Number,name:String,visible:Boolean,obligatory:Boolean,type:TypeOfProperty,pages:Array<Page>,project:Project){
        this.id=id;
        this.name=name;
        this.visible=visible;
        this.obligatory=obligatory;
        this.type=type;
        this.pages=pages;
        this.project=project;
    }

}

