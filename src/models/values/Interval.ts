import { Duration } from "./Duration";

export class Interval {
  constructor(
    public id: number,
    public time: Duration,
    public color: string = "#f04a94",
    public ends: string[] = [],
    public starts: string[] = []
  ) {}
}
