 
import { Value } from "./Value";


export class DateValued extends Value{

    value!:Date;
    constructor(public id:number, public dateTime:Date){
        super(id, dateTime);
    }

}
