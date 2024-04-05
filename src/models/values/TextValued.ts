 
import { Value } from "./Value";

@AllArgsConstructor
export class TextValued extends Value {
    value!:string

    constructor(id:number, text:string){
        super(id);
    }
}
