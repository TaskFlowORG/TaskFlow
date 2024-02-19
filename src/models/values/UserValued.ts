import { AllArgsConstructor } from "@/utils";
import { Value } from "./Value";
import { SimpleUserGet } from "@/models/user/user/SimpleUserGetDTO";

@AllArgsConstructor
export class UserValued extends Value{

    value!: SimpleUserGet[];

    constructor(id:number, users: SimpleUserGet[]){
        super(id);
    }

    override getValue(): any{
        return this.value;
    }

    override setValue(value:any):void{this.value = (value as SimpleUserGet[]);}
}
