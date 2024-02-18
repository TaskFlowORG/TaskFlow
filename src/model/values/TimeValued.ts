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

    override setValue(value: any) {
        this.value = value as Duration;
    }

    override getValue(): any {
        return this.value;
    }
}
