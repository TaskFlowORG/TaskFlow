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

    constructor(id: number, time: Duration) {
        super(id);
        this.value = time;
    }

}
