import { AllArgsConstructor } from "@/utils";
import { Value } from "./Value";

@AllArgsConstructor
export class TextValued extends Value {
    value!:string

    constructor(id:number, text:string){
        super(id);
    }
    
    override getValue():any{
        return this.value;
    }

   override setValue(value:any):void{this.value = (value as string);}

}
