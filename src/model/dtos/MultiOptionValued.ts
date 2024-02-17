import { AllArgsConstructor } from "@/utils";
import { Option } from "../Properties/Option";
import { Value } from "./Value";

@AllArgsConstructor
export class MultiOptionValued extends Value{
    value!:Option[]

    constructor(id:number, archive:Option[]){
        super(id);
    }
    override setValue(value:any):void{this.value = (value as Option[]);}
    override getValue():any{
        return this.value;
    }
}
