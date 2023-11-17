"use client";

import { RoundedCard } from "@/components/RoundedCard/RoundedCard";
import { useEffect, useState } from "react";
import { getListData } from "@/services/http/api";
import { verify } from "crypto";

export const ColumnKanban = ({ color, option, propertyId, tasks, id, verify }) => {
  const [colorUse, setColorUse] = useState("");
  const [tasksColumn, setTasksColumn] = useState([]);
  let filteredTasks = []

  useEffect(() => {
    console.log(tasks)
    console.log(id, color, option);
    setColorUse(color ? color : "#FF0000");
    console.log(tasks, id);
    if (verify){
      const filteredTasks = tasks.filter((task) => {
        return task.properties.some((property) => {
          return property.propertyId === propertyId && property.value === option;
        });
      });
      setTasksColumn(filteredTasks)
    } else {
      console.log("eu passei por aqui")
      setTasksColumn(tasks)
    }

   
  }, [id, color, option, tasks]);
  return (
    <div className="w-min min-w-[360px] flex flex-col gap-4  brightness-[0.95] hover:brightness-[1]">
      <div className="flex gap-6 items-center">
        <div
          className={`w-2 h-2 rounded-full`}
          style={{ backgroundColor: color }}
        ></div>
        <h4 className=" whitespace-nowrap">{option}</h4>
      </div>

      {tasksColumn.map(task => {
        console.log(task)
        console.log(tasksColumn.length)
        return <RoundedCard key={task.id} task={task}/>
      })}
    </div>
  );
};
