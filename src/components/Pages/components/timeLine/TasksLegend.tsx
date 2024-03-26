import { Property, Task, TimeValued } from "@/models";
import { useTheme } from "next-themes";
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


  useEffect(() => {
    if (ref.current) ref.current.scrollTop = scrollY;
  }, [scrollY]);

  const {theme} = useTheme()

  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      className=" h-full w-full overflow-y-hidden none-scrollbar pb-2"
      ref={ref}
      onWheel={e => {setScrollY(e.currentTarget.scrollTop + e.deltaY )}}
    >
      <div className="w-full h-min flex flex-col gap-1 pt-[2px]">

      {tasks.map((task, index) => {
        const propVl = task.properties.find(
          (prop) => prop.property.id === propOrdering.id
        )?.value as TimeValued;
        return (
          <div
            key={index}
            className="h-8 w-full md:px-6 gap-2 flex justify-center items-center"
          >
            <div
              className=" smm:h-full sm:h-0 md:h-full aspect-square rounded-md w-min"
              style={{
                backgroundColor: propVl?.color ?? (theme == "dark" ? "var(--secondary-color)":"var(--primary-color)"),
              }}
            />
            <span className="max-w-full w-min h-min sm:text-center truncate font-montserrat text-[12px]">
              {task.name ?? "Sem Nome"}
            </span>
          </div>
        );
      })}
      </div>
    </div>
  );
};
