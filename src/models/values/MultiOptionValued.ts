 
import { Value } from "./Value";
import { Option } from "./Option";


export class MultiOptionValued extends Value{
    constructor(public option:Option[],public id?:number){
        super( option, id);
    }

}
