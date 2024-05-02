import { useEffect, useState } from "react";

export const Interval = ({ interval }: { interval: number }) => {
  const [formated, setFormated] = useState<string>("");
  const formatInterval = (intervalToFormat: number) => {
    const initialTime = getInitialTimeOfInterval(intervalToFormat);
    const latestTime = getLatestTimeOfInterval(intervalToFormat);
    return `${initialTime} - ${latestTime}`;
  };
  const getInitialTimeOfInterval = (intervalToFormat: number) => {
    const hours = Math.floor(intervalToFormat / 3600);
    const minutes = Math.floor((intervalToFormat % 3600) / 60);
    const seconds = Math.floor(intervalToFormat % 60);
    const date = new Date(0);
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(seconds);
    return `${String(date.getHours()).padStart(2, "0")}:${String(
      date.getMinutes()
    ).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;
  };

  const getLatestTimeOfInterval = (intervalToFormat: number) => {
    const hours = Math.floor((intervalToFormat + interval) / 3600);
    const minutes = Math.floor(((intervalToFormat + interval) % 3600) / 60);
    const seconds = Math.floor(((intervalToFormat + interval) % 60) - 1);
    const date = new Date(0);
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(seconds);
    return `${String(date.getHours()).padStart(2, "0")}:${String(
      date.getMinutes()
    ).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;
  };
  useEffect(() => {
    setFormated(formatInterval(interval));
  }, [interval]);

  return <>{formated}</>;
};
