 
import { Value } from "./Value";



export class NumberValued extends Value{
    constructor( public number?:number | null,public id?:number){
        super(number,id);
    }

}
