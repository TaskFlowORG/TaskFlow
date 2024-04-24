import { DateTimelines } from "./DateTimelines";
import { Duration } from "./Duration";

export class Interval {
  constructor(
    public id: number,
    public time: Duration,
    public color: string = "#f04a94",
    public ends: DateTimelines[] = [],
    public starts: DateTimelines[] = []
  ) {}
}
