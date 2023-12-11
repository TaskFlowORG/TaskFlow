import { TypeOfProperty } from "../enums/TypeOfProperty";
import { Page } from "../pages/Page";
import { Project } from "../Project";
import { Property } from "./Property";

export class Date extends Property{

    canBePass:Boolean;
    includesHours:Boolean;
    term:Boolean;
    scheduling:Boolean;
    
    constructor(id:Number,name:String,visible:Boolean,obligatory:Boolean,type:TypeOfProperty,pages:Array<Page>,project:Project, canBePass:Boolean,includesHours:Boolean,term:Boolean,scheduling:Boolean){
        super(id,name,visible,obligatory,type,pages,project)
        this.canBePass=canBePass;
        this.includesHours=includesHours;
        this.term=term;
        this.scheduling=scheduling;
    }

}
