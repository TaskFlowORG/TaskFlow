import { Option } from "../Properties/Option";
import { Value } from "./Value";

export class MultiOptionValued extends Value{
    multiOptions: Option[];

    constructor(id: number, value:Option[]){
        super(id, value);
        this.multiOptions = value;
    }

    getValue(): any {
        return this.multiOptions;
    }

}