import { Option } from "../Properties/Option";
import { Value } from "./Value";

export class MultiOptionValued extends Value{
    value: Array<Option>;

    constructor(id: number, value: Array<Option>){
        super(id);
        this.value = value;
    }

    getValue(): any {
        return this.value;
    }

}