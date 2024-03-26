import { Property, Task, TimeValued } from "@/models";
import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";

export const TasksInTimeline = ({
  tasks,
  propOrdering,
  interval,
  widthOfInterval
}: {
  tasks: Task[];
  propOrdering: Property;
  interval: number;
  widthOfInterval: number;
}) => {
  const calcMarginLeft = (start: Date) => {
    const date = new Date(start);
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const seconds = date.getSeconds();
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    return `${(totalSeconds / interval) * widthOfInterval}px`;
  };

  const calcWidth = (start: Date, task: Task) => {
    const date = new Date(start);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    const propVl = task.properties.find(
      (prop) => prop.property.id === propOrdering.id
    )?.value as TimeValued;
    if (!propVl.starts) return "00";
    if (!propVl.ends) return "00";
    const index = propVl.starts.indexOf(start);
    let dateEnd = new Date(propVl.ends[index]);
    if(!dateEnd) dateEnd = new Date();
    const hoursEnd = dateEnd.getHours();
    const minutesEnd = dateEnd.getMinutes();
    const secondsEnd = dateEnd.getSeconds();
    const totalSecondsEnd = hoursEnd * 3600 + minutesEnd * 60 + secondsEnd;
    return `${
      ((totalSecondsEnd - totalSeconds) / interval) * widthOfInterval
    }px`;
  };

  const {theme} = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  return (
      <div className="h-min w-min flex flex-col box-border pl-px" ref={ref} >
        {tasks.map((task, index) => {
          const propVl = task.properties.find(
            (prop) => prop.property.id === propOrdering.id
          )?.value as TimeValued;
          return (
            <div key={index} className="h-8 my-[2px] relative flex " style={{width:24*60*60/interval*widthOfInterval}} >
              {propVl?.starts?.map((start, index) => {
                return (
                  <div
                    key={index}
                    className="h-full rounded-md absolute top-0 left-0"
                    style={{
                      backgroundColor: propVl?.color ?? (theme == "dark" ? "var(--secondary-color)":"var(--primary-color)"),
                      marginLeft: calcMarginLeft(start),
                      minWidth: calcWidth(start, task),
                    }}
                  />
                );
              })}
            </div>
          );
        })}
      </div>

  );
};
