import { AllArgsConstructor } from "@/utils";
import { Archive } from "../Archive";
import { Value } from "./Value";

@AllArgsConstructor
export class ArchiveValued extends Value{
    value!: Archive

    constructor(id:number, archive:Archive){
        super(id);
    }


    override setValue(value:any):void{this.value =  (value as Archive);}

    override getValue():any{
        return this.value;
    }
}
