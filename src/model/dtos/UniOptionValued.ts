import { AllArgsConstructor } from "@/utils";
import { Option } from "../Properties/Option";
import { Value } from "./Value";

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
