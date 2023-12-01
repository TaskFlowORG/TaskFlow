"use client";

import { RoundedCard } from "@/components/RoundedCard/RoundedCard";
import { useEffect, useState } from "react";
import { getListData } from "@/services/http/api";
import { verify } from "crypto";
import { CardContent } from "../CardContent";

interface Props {
  color?: string;
  option?: string;
  propertyId?: number;
  tasks: any[];
  verify?: boolean;
}

export const ColumnKanban = ({
  color,
  option,
  propertyId,
  tasks,
  verify,
}: Props) => {
  const [colorUse, setColorUse] = useState<string>("");
  const [tasksColumn, setTasksColumn] = useState<any[]>([]);

  useEffect(() => {
    setColorUse(color ? color : "#FF0000");

    if (verify) {
      const filteredTasks: any[] = tasks.filter((task) => {
        return task.uniProperties.some((property: any) => {
          return (
            property.propertyId === propertyId && property.value === option
          );
        });
      });
      setTasksColumn(filteredTasks);
    } else {
      setTasksColumn(tasks);
      console.log(tasks);
    }

    console.log(tasksColumn, verify);
  }, [color, option, tasks]);
  return (
    <div className="w-min min-w-[360px] flex lg:flex-col gap-4   brightness-[0.95] hover:brightness-[1]">
      <div className="flex gap-6 items-center">
        <div
          className={`w-2 h-2 rounded-full`}
          style={{ backgroundColor: color }}
        ></div>
        <h4 className="h4 whitespace-nowrap text-black dark:text-white ">
          {option}
        </h4>
      </div>

      {tasksColumn.map((task) => {
        return (
          <RoundedCard color={color} key={task.id}>
            <CardContent key={task.id} task={task} />
          </RoundedCard>
        );
      })}
    </div>
  );
};
