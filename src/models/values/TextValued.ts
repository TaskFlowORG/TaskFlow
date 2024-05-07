 
import { Value } from "./Value";


export class TextValued extends Value {
    constructor(public text:string | null,public id?:number){
        super( text, id);
    }
}
