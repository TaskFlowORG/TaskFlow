 
import { Value } from "./Value";

type Duration = {
    hours: number;
    minutes: number;
    seconds: number;
}

export class Interval  {
    constructor(public id:number, public time: Duration, public color:string, public ends:Date[], public starts:Date[]) {
    }

}
