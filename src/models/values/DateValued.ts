 
import { Value } from "./Value";


export class DateValued extends Value{

    value!:Date;
    constructor(public dateTime:Date | null, public id?:number,){
        super(dateTime,id);
    }

}
