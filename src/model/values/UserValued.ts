import { User } from "../User";
import { Value } from "./Value";

export class UserValued extends Value{
    value: User;

    constructor(id: number, value: User){
        super(id, value);
        this.value = value;
    }

    getValue(): any {
        return this.value;
    }

}