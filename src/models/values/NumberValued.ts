import { AllArgsConstructor } from "@/utils";
import { Value } from "./Value";


@AllArgsConstructor
export class NumberValued extends Value{
    value!:number

    constructor(id:number, number:number){
        super(id);
    }

    override setValue( value:any):void{this.value = (value as number);}
    override getValue():any{
        return this.value;
    }
}