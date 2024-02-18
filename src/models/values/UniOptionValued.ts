import { AllArgsConstructor } from "@/utils";
import { Value } from "./Value";
import { Option } from "./Option";

@AllArgsConstructor
export class UniOptionValued extends Value{

    value!: Option;

     constructor(id:number, uniOption: Option){
        super(id);
;    }


    override setValue(value:any):void{this.value = (value as Option);}

    override getValue():any{
        return this.value;
    }

}
