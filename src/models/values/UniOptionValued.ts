 
import { Value } from "./Value";
import { Option } from "./Option";

@AllArgsConstructor
export class UniOptionValued extends Value{

    value!: Option;

     constructor(id:number, uniOption: Option){
        super(id);
;    }




}
