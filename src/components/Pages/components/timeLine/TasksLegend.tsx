import { Property, Task, TimeValued } from "@/models";

export const TaskLegend = ({
  tasks,
  propOrdering,
}: {
  tasks: Task[];
  propOrdering: Property;
}) => {
  return (
    <div className="min-w-[14rem] h-full flex flex-col py-4 gap-2">
      <h5 className="h4  text-primary w-full text-center ">Tarefas</h5>
      <div className="w-full  h-full overflow-y-auto">
        {tasks.map((task, index) => {
          const propVl = task.properties.find(
            (prop) => prop.property.id === propOrdering.id
          )?.value as TimeValued;
          return (
            <div
              key={index}
              className="h-8 w-full px-6 gap-2 flex justify-start my-1 items-center"
            >
              <div
                className="h-5/6 aspect-square rounded-md w-min"
                style={{
                  backgroundColor: propVl?.color ?? "#f04a94",
                }}
              />
              <span className="w-max h-min truncate font-montserrat text-[12px]">
                {task.name ?? "Sem Nome"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
