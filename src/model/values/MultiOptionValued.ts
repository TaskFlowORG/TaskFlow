import { Option } from "../Properties/Option";
import { Value } from "./Value";

export class MultiOptionValued extends Value{
    multiOptions: Array<Option>;

    constructor(id: number, value: Array<Option>){
        super(id, value);
        this.multiOptions = value;
    }

    getValue(): any {
        return this.value;
    }

}