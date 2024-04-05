 
import { Value } from "./Value";



export class NumberValued extends Value{
    constructor(public id:number, public number:number){
        super(id, number);
    }

}
