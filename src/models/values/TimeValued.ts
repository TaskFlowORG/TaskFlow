 
import { Value } from "./Value";
import { Interval } from "./Interval";

type Duration = {
    hours: number;
    minutes: number;
    seconds: number;
}


export class TimeValued extends Value {
    constructor(public value: Interval, public id?: number) {
        super(value, id);
        this.value = value;
    }

}
