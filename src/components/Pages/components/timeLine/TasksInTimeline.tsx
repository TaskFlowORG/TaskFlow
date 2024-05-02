import { Property, Task, TimeValued } from "@/models";
import { useTheme } from "next-themes";
import { useContext, useEffect, useRef } from "react";
import { compareDates } from "../../functions";
import { TaskModalContext } from "@/utils/TaskModalContext";
import { DateTimelines } from "@/models/values/DateTimelines";

export const TasksInTimeline = ({
  tasks,
  propOrdering,
  interval,
  widthOfInterval,
  date,
}: {
  tasks: Task[];
  propOrdering: Property;
  interval: number;
  widthOfInterval: number;
  date: string;
}) => {
  const calcMarginLeft = (start: DateTimelines) => {
    const date = new Date(new Date(start.date).toLocaleString());
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    return `${(totalSeconds / interval) * widthOfInterval}px`;
  };

  const calcWidth = (start: DateTimelines, task: Task) => {

    const date = new Date(new Date(start.date).toLocaleString());
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    const propVl = task.properties.find(
      (prop) => prop.property.id === propOrdering.id
    )?.value as TimeValued;
    if (!propVl.value.starts) return "00";
    if (!propVl.value.ends) return "00";
    const index = propVl.value.starts.indexOf(start);

    let dateEndUTC = new Date(
      propVl.value.ends[index] ? propVl.value.ends[index].date : Date.now()
    );
    if (!dateEndUTC) dateEndUTC = new Date();
    const dateEnd = new Date(dateEndUTC.toLocaleString());
    const hoursEnd = dateEnd.getHours();
    const minutesEnd = dateEnd.getMinutes();
    const secondsEnd = dateEnd.getSeconds();
    const totalSecondsEnd = hoursEnd * 3600 + minutesEnd * 60 + secondsEnd;
    return `${
      ((totalSecondsEnd - totalSeconds) / interval) * widthOfInterval
    }px`;
  };

  const { setSelectedTask, setIsOpen } = useContext(TaskModalContext);

  const openModal = (id: number) => {
    if (!setIsOpen || !setSelectedTask) return;
    const task: Task | undefined = tasks.find((l) => l.id == id);
    if (!task) return;
    setIsOpen(true);
    setSelectedTask(task);
  };

  const { theme } = useTheme();
  const ref = useRef<HTMLDivElement>(null);


  const fixDate = (date: Date) => {
    date.setDate(date.getDate() + 1);
    return date;
  };

  return (
    <div className="h-min w-min flex flex-col box-border " ref={ref}>
      {tasks.map((task, index) => {
        const propVl = task.properties.find(
          (prop) => prop.property.id === propOrdering.id
        )?.value as TimeValued;
        return (
          <div
            key={index}
            className="h-8 my-[2px] relative flex hover:brightness-95"
            onClick={(e) => openModal(task.id)}
            style={{ width: ((24 * 60 * 60) / interval) * widthOfInterval }}
          >
            {propVl.value &&
              propVl.value.starts &&
              propVl?.value.starts
                .filter((start) =>

                  compareDates(
                    new Date(new Date(start.date)),
                    new Date(date)
                  )
                )
                .map((start, index) => {
                  return (
                    <div
                      key={index}
                      className="h-full rounded-md absolute top-0 left-0 "
                      style={{
                        backgroundColor:
                          propVl?.value.color ??
                          (theme == "dark"
                            ? "var(--secondary-color)"
                            : "var(--primary-color)"),
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
