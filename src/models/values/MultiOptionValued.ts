import { AllArgsConstructor } from "@/utils";
import { Value } from "./Value";
import { Option } from "./Option";

@AllArgsConstructor
export class MultiOptionValued extends Value{
    value!:Option[]

    constructor(id:number, option:Option[]){
        super(id);
    }

}
