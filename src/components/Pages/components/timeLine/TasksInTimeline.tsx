import { Property, Task, TimeValued } from "@/models";
import { useTheme } from "next-themes";
import { useContext, useEffect, useRef } from "react";
import { compareDates } from "../../functions";
import { TaskModalContext } from "@/utils/TaskModalContext";
import { DateTimelines } from "@/models/values/DateTimelines";
import { TaskInTimeline } from "./TaskInTimeline";

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
            className="h-8 my-[2px]  relative flex hover:brightness-95 bg-white dark:bg-modal-grey"
            onClick={(e) => openModal(task.id)}
            style={{ width: ((24 * 60 * 60) / interval) * widthOfInterval }}
          >
            {propVl.value &&
              propVl.value.starts &&
              propVl?.value.starts
                .filter((start) =>
                  compareDates(
                    new Date(new Date(start.date)),
                    new Date(fixDate(new Date(date)))
                  )
                )
                .map((start, index) => {
                  return (
                    <TaskInTimeline  key={index} widthOfInterval={widthOfInterval} propOrdering={propOrdering} interval={interval} propVl={propVl} task={task} start={start} index={index}  />
                  );
                })}
          </div>
        );
      })}
    </div>
  );
};
