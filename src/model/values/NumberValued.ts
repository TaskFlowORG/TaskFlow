import { Value } from "./Value";

export class NumberValued extends Value{
    value: Number;

    constructor(id: number, value: Number){
        super(id);
        this.value = value;
    }

    getValue(): any {
        return this.value;
    }

}