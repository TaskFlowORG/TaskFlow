import { Value } from "./Value";

export class TimeValued extends Value{
    value: TimeRanges;

    constructor(id: number, value: TimeRanges){
        super(id);
        this.value = value;
    }

    getValue(): any {
        return this.value;
    }

}