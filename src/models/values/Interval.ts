 
import { Value } from "./Value";

type Duration = {
    hours: number;
    minutes: number;
    seconds: number;
}

@AllArgsConstructor
export class Interval  {
    time!: Duration;
    color?: string;
    ends?:Date[];
    starts?:Date[];

    constructor(value: Duration, color:string, ends:Date[], starts:Date[]) {
    }

}
