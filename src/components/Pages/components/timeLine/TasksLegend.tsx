import { Property, Task, TimeValued } from "@/models";
import { useTranslation } from "next-i18next";
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

  const { theme } = useTheme();
  const {t} = useTranslation();

  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      className=" h-full w-full overflow-y-hidden none-scrollbar pb-2 z-10"
      ref={ref}
      onWheel={(e) => {
        setScrollY(e.currentTarget.scrollTop + e.deltaY);
      }}
    >
      {tasks.length == 0 ? (
        <div className="h5 flex-col text-primary dark:text-secondary flex-warp text-center h-full w-full flex items-center justify-center">
          <p>
            Não Existem Tasks 
          </p>
          <p>
            Nessa Página
          </p>
        </div>
      ) : (
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
                    backgroundColor:
                      propVl?.value.color ??
                      (theme == "dark"
                        ? "var(--secondary-color)"
                        : "var(--primary-color)"),
                  }}
                />
                <span className="max-w-full w-min h-min sm:text-center truncate font-montserrat text-[12px]">
                  {task.name ?? t("withoutname")}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
