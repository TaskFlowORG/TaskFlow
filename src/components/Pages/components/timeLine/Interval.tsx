import { log } from "console";
import { useEffect, useState } from "react";

export const Interval = ({ interval, specificInterval, isEnd }: { interval: number, specificInterval:number, isEnd:boolean }) => {
  const [formated, setFormated] = useState<string>("");
  const formatInterval = (intervalToFormat: number) => {
    const initialTime = getInitialTimeOfInterval(intervalToFormat);
    const latestTime = getLatestTimeOfInterval(intervalToFormat);
    return `${initialTime} - ${latestTime}`;
  };
  const getInitialTimeOfInterval = (intervalToFormat: number) => {
    const hours = intervalToFormat / 3600;
    const minutes = (intervalToFormat % 3600) / 60;
    const seconds = intervalToFormat % 60;
    const date = new Date(0);
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(seconds);
    
    return `${String(date.getHours()).padStart(2, "0")}:${String(
      date.getMinutes()
    ).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;
  };

  const getLatestTimeOfInterval = (intervalToFormat: number) => {
    if (isEnd) return "23:59:59";
    const hours = ((intervalToFormat + interval)/ 3600);
    const minutes = (((intervalToFormat + interval) % 3600) / 60);
    const seconds = (((intervalToFormat + interval) % 60) - 1);
    const date = new Date(0);
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(seconds);
    return `${String(date.getHours()).padStart(2, "0")}:${String(
      date.getMinutes()
    ).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;
  };
  useEffect(() => {
    setFormated(formatInterval(specificInterval));
  }, [specificInterval]);

  return <>{formated}</>;
};
