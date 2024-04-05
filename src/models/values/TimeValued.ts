 
import { Value } from "./Value";
import { Interval } from "./Interval";

type Duration = {
    hours: number;
    minutes: number;
    seconds: number;
}


export class TimeValued extends Value {
    constructor(public id: number, public value: Interval) {
        super(id, value);
        this.value = value;
    }

}
