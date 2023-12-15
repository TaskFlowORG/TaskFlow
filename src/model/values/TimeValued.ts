import { Value } from "./Value";

export class TimeValued extends Value{
    time: TimeRanges;

    constructor(id: number, value: TimeRanges){
        super(id, value);
        this.time = value;
    }

    getValue(): any {
        return this.value;
    }

}