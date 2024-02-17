import { TypeOfProperty } from "../enums/TypeOfProperty";
import { Page } from "../pages/Page";
import { Project } from "../Project";
import { Property } from "./Property";

export class Date extends Property{

    canBePass:boolean;
    includesHours:boolean;
    term:boolean;
    scheduling:boolean;
    
    constructor(id:number,name:string,visible:boolean,obligatory:boolean,type:TypeOfProperty,pages:Array<Page>,project:Project, canBePass:boolean,includesHours:boolean,term:boolean,scheduling:boolean){
        super(id,name,visible,obligatory,type,pages,project)
        this.canBePass=canBePass;
        this.includesHours=includesHours;
        this.term=term;
        this.scheduling=scheduling;
    }

}
