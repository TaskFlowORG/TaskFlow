import { AllArgsConstructor } from "@/utils";
import { Value } from "./Value";

@AllArgsConstructor
export class DateValued extends Value{

    value!:Date;
    constructor(id:number, dateTime:Date){
        super(id);
    }



}
