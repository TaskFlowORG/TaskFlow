 
import { Value } from "./Value";
import { Option } from "./Option";


export class UniOptionValued extends Value{

     constructor(public id:number, public uniOption: Option){
        super(id, uniOption);
;    }




}
