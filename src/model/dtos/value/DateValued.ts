import { AllArgsConstructor } from "@/utils";
import { Value } from "./Value";

@AllArgsConstructor
export class DateValued extends Value{

    value!:Date;
    constructor(id:number, dateTime:Date){
        super(id);
    }


    override setValue(value:any):void{this.value =(value as Date);}
    override getValue():any{
        return this.value;
    }
}
