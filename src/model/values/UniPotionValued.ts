import { Option } from "../Properties/Option";
import { Value } from "./Value";

export class UniOptionValued extends Value{
    value: Option;

    constructor(id: number, value: Option){
        super(id);
        this.value = value;
    }

    getValue(): any {
        return this.value;
    }

}