 
import { Value } from "./Value";

export class DateWithGoogle {
    constructor(public dateTime:Date | null,  public idGoogle:string, public id?:number | null){
    }

}

export class DateValued extends Value{

    value!:Date;
    constructor(public date:DateWithGoogle, public id?:number,){
        super(date,id);
    }

}