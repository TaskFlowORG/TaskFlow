import { Value } from "./Value";

export class Interval {
  constructor(
    public id: number,
    public time: string,
    public color: string,
    public ends: string[],
    public starts: string[]
  ) {}
  public parseDuration = () => {
    const matches = this.time.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!matches || !matches[1] || !matches[2] || !matches[0]) return;
    const hours = matches[1] ? parseInt(matches[1].slice(0, -1)) : 0;
    const minutes = matches[2] ? parseInt(matches[2].slice(0, -1)) : 0;
    const seconds = matches[3] ? parseInt(matches[3].slice(0, -1)) : 0;

    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    return {
      hours,
      minutes,
      seconds,
      totalSeconds,
    };
  }
}
