import { Property, PropertyValue, Task, TimeValued } from "@/models";
import { DateTimelines } from "@/models/values/DateTimelines";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { compareDates } from "../../functions";

interface Props {
  task: Task;
  index: number;
  start: DateTimelines;
  propVl: TimeValued;
  interval: number;
  widthOfInterval: number;
  propOrdering: Property;
  dateSelected: Date;
}

export const TaskInTimeline = ({
  task,
  index,
  start,
  propVl,
  interval,
  widthOfInterval,
  propOrdering,
  dateSelected,
}: Props) => {
  const { theme } = useTheme();
  const [margin, setMargin] = useState<string>("0px");
  const [width, setWidth] = useState<string>("0px");
  const calcMarginLeft = (start: DateTimelines) => {
    const date = new Date(start.date);
    if(!compareDates(date, dateSelected)){
      return "8px";
    }
    const startTime = date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();
    // Calcular o número de intervalos
    const numberOfIntervals = startTime / interval ;
    return `${((numberOfIntervals ) * widthOfInterval )+ 8}px`;
  };

  const calcWidth = (start: DateTimelines, task: Task) => {

    const propVl = task.properties.find(
      (prop) => prop.property.id === propOrdering.id
    )?.value as TimeValued;
    if (!propVl.value.starts) return "00";
    if (!propVl.value.ends) return "00";
    
    let date = new Date(new Date(start.date));
    const index = propVl.value.starts.indexOf(start);
    if(!propVl.value.ends[index] || !propVl.value.ends[index].date){
      setTimeout(() => {
        setMargin(calcMarginLeft(start));
        setWidth(calcWidth(start, task));
      }, 1000)
    }
    let dateEndUTC = new Date(propVl.value.ends[index] ? propVl.value.ends[index].date : Date.now());
    if (!dateEndUTC) dateEndUTC = new Date();
    let dateEnd = new Date(dateEndUTC);
    if(!compareDates(date, dateSelected)){
      date = new Date(dateSelected);
      date.setHours(0);
      date.setMinutes(0);
      date.setSeconds(0);
    }
    if(!compareDates(dateEnd, dateSelected)){
      dateEnd = new Date(dateSelected);
      dateEnd.setHours(23);
      dateEnd.setMinutes(59);
      dateEnd.setSeconds(59);
    }
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    const hoursEnd = dateEnd.getHours();
    const minutesEnd = dateEnd.getMinutes();
    const secondsEnd = dateEnd.getSeconds();
    const totalSecondsEnd = hoursEnd * 3600 + minutesEnd * 60 + secondsEnd;
    return `${
      ((totalSecondsEnd - totalSeconds) / interval) * widthOfInterval
    }px`; 
  };

  useEffect(() => {
    setMargin(calcMarginLeft(start));
    setWidth(calcWidth(start, task));
  });
  return (
    <div
      key={index}
      className={
        "h-8 rounded-md absolute  top-0 left-0 " +
        (task.completed || task.waitingRevision
          ? " border-green-500 border-2"
          : "") +
        (task.waitingRevision
          ? " animation-delay-1000 animate-border-pulser "
          : "")
      }
      style={{
        backgroundColor:
          propVl.value.color ??
          (theme == "dark" ? "var(--secondary-color)" : "var(--primary-color)"),
        marginLeft: margin,
        minWidth: width,
      }}
    />
  );
};
