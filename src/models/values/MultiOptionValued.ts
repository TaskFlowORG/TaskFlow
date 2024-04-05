 
import { Value } from "./Value";
import { Option } from "./Option";


export class MultiOptionValued extends Value{
    constructor(public id:number, public option:Option[]){
        super(id, option);
    }

}
