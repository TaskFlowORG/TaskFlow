import { Option } from "../Properties/Option";
import { Value } from "./Value";

export class UniOptionValued extends Value{
    uniOption: Option;

    constructor(id: number, value: Option){
        super(id, value );
        this.uniOption = value;
    }

    getValue(): any {
        return this.uniOption;
    }

}