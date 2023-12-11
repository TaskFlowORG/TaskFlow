import { Value } from "./Value";

export class DateValued extends Value{
    value: Date;

    constructor(id: number, value: Date){
        super(id);
        this.value = value;
    }

    getValue(): any {
        return this.value;
    }

}