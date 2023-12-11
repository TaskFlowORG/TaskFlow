import { Project } from "../Project";
import { TypeOfProperty } from "../enums/TypeOfProperty";
import { Page } from "../pages/Page";
import { Property } from "./Property";
import {Option} from "./Option";
export class Select extends Property{

     options : Array <Option>;


    constructor( options : Array <Option>, id:Number,name:String,visible:Boolean,obligatory:Boolean,type:TypeOfProperty,pages:Array<Page>,project:Project){
        super(id,name,visible,obligatory,type,pages,project);
        this.options=options;
    }
}
