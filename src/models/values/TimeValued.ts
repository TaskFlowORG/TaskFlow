import { AllArgsConstructor } from "@/utils";
import { Value } from "./Value";
import { Interval } from "./Interval";

type Duration = {
    hours: number;
    minutes: number;
    seconds: number;
}

@AllArgsConstructor
export class TimeValued extends Value {
    value!: Interval;
    color?: string;
    ends?:Date[];
    starts?:Date[];

    constructor(id: number, value: Interval, color:string, ends:Date[], starts:Date[]) {
        super(id);
        this.value = value;
    }

}
