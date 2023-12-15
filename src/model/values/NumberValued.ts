import { Value } from "./Value";

export class NumberValued extends Value{
    number: Number;

    constructor(id: number, value: Number){
        super(id, value);
        this.number = value;
    }

    getValue(): any {
        return this.value;
    }

}