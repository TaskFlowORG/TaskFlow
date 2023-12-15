import { Value } from "./Value";

export class NumberValued extends Value{
    number: number;

    constructor(id: number, value: number){
        super(id, value);
        this.number = value;
    }

    getValue(): any {
        return this.value;
    }

}