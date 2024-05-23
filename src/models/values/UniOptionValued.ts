 
import { Value } from "./Value";
import { Option } from "./Option";


export class UniOptionValued extends Value{

     constructor( public uniOption: Option | null,public id?:number){
        super(uniOption,id);
;    }




}
