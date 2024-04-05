 
import { Value } from "./Value";


export class TextValued extends Value {
    constructor(public id:number, public text:string){
        super(id, text);
    }
}
