import { Property, Task, TimeValued } from "@/models";
import { useEffect, useRef, useState } from "react";

export const TaskLegend = ({
  tasks,
  propOrdering,
  scrollY,
  setScrollY,
}: {
  tasks: Task[];
  propOrdering: Property;
  scrollY: number;
  setScrollY: (y: number) => void;
}) => {

  const [scrolling, setScrolling] = useState(false);


  useEffect(() => {
    if (ref.current && !scrolling) ref.current.scrollTop = scrollY;
  }, [scrollY]);


  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      className=" h-full w-full pt-[0.65rem] overflow-y-auto none-scrollbar "
      ref={ref}
      onScrollCapture={e => {setScrollY(scrollY + e.currentTarget.scrollTop); setScrolling(true)}}
    >
      {tasks.map((task, index) => {
        const propVl = task.properties.find(
          (prop) => prop.property.id === propOrdering.id
        )?.value as TimeValued;
        return (
          <div
            key={index}
            className="h-8 w-full px-6 gap-2 bg-green-200 flex justify-start my-1 items-center"
          >
            <div
              className="h-full aspect-square rounded-md w-min"
              style={{
                backgroundColor: propVl?.color ?? "#f04a94",
              }}
            />
            <span className="w-full h-min truncate font-montserrat text-[12px]">
              {task.name ?? "Sem Nome"}
            </span>
          </div>
        );
      })}
    </div>
  );
};
