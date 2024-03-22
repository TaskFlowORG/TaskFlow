import { AllArgsConstructor } from "@/utils";
import { Value } from "./Value";

type Duration = {
    hours: number;
    minutes: number;
    seconds: number;
}

@AllArgsConstructor
export class TimeValued extends Value {
    value!: Duration;
    color?: string;
    ends?:Date[];
    starts?:Date[];

    constructor(id: number, time: Duration, color:string, ends:Date[], starts:Date[]) {
        super(id);
        this.value = time;
    }

}
