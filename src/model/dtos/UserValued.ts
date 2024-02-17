import { AllArgsConstructor } from "@/utils";
import { User } from "../User";
import { Value } from "./Value";

@AllArgsConstructor
export class UserValued extends Value{

    value!: User[];

    constructor(id:number, users: User[]){
        super(id);
    }

    override getValue(): any{
        return this.value;
    }

    override setValue(value:any):void{this.value = (value as User[]);}
}
