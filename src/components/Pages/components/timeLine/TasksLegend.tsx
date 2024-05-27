import { Property, Task, TimeValued } from "@/models";
import { TaskModalContext } from "@/utils/TaskModalContext";
import { useTranslation } from "next-i18next";
import { useTheme } from "next-themes";
import { useContext, useEffect, useRef, useState } from "react";

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
  const { t } = useTranslation();

  const { setSelectedTask, setIsOpen } = useContext(TaskModalContext);

  const openModal = (id: number) => {
    if (!setIsOpen || !setSelectedTask) return;
    const task: Task | undefined = tasks.find((l) => l.id == id);
    if (!task) return;
    setIsOpen(true);
    setSelectedTask(task);
  };

  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      className=" h-full w-full overflow-y-hidden flex justify-center none-scrollbar pb-2 z-10"
      ref={ref}
      onWheel={(e) => {
        setScrollY(e.currentTarget.scrollTop + e.deltaY);
      }}
    >
      {tasks.length == 0 ? (
        <div className="text-h5 font-alata flex-col text-primary dark:text-secondary flex-warp text-center h-full w-full flex items-center justify-center">
          {t("no-tasks-in-page")}
        </div>
      ) : (
        <div className="w-min max-w-full h-min flex flex-col  gap-1 pt-[2px]">
          {tasks.map((task, index) => {
            const propVl = task.properties.find(
              (prop) => prop.property.id === propOrdering.id
            )?.value as TimeValued;
            return (
              <div className="w-full h-min flex justify-center ">
                <div
                  key={index}
                  className="h-8 w-full md:px-6 gap-2 flex justify-start items-center cursor-pointer hover:brightness-95 flex-1"
                  onClick={() => openModal(task.id)}
                >
                  <div
                    className={
                      " smm:h-full sm:h-0 md:h-full  aspect-square rounded-md w-min " +
                      (task.completed || task.waitingRevision
                        ? " border-green-500 border-2"
                        : "") +
                      (task.waitingRevision
                        ? " animation-delay-1000 animate-border-pulser "
                        : "")
                    }
                    style={{
                      backgroundColor: propVl?.value
                        ? propVl.value.color
                        : theme == "dark"
                        ? "var(--secondary-color)"
                        : "var(--primary-color)",
                    }}
                  />
                  <span className="max-w-full w-min h-min sm:text-center truncate font-montserrat text-mn"
                    style={{opacity: !task.name ? 0.5 : 1}}
                  >
                    {task.name ? task.name : t("withoutname")}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
