"use client";

import { RoundedCard } from "@/components/RoundedCard/RoundedCard";
import { useEffect, useState } from "react";
import { getListData } from "@/services/http/api";

export const ColumnKanban = ({ color, option, propertyId, tasks, id }) => {
  const [colorUse, setColorUse] = useState("");
  const [tasksColumn, setTasksColumn] = useState([]);
  let filteredTasks = []

  useEffect(() => {
    console.log(id, color, option);
    setColorUse(color ? color : "#FF0000");
    console.log(tasks);

    // tasks.map((task) => {
    //   console.log(tasks.length)
    //   console.log(task)
      
    //   task.properties.map((property) => {
    //     console.log(property.propertyId)
    //     if (property.propertyId == propertyId) {
    //       console.log(property.value)
    //       if (property.value == option) {
    //         console.log("Passei por aqui")
    //         filteredTasks.push(task);
    //       }
    //     }
    //   });
    // });
    const filteredTasks = tasks.filter((task) => {
      return task.properties.some((property) => {
        return property.propertyId === propertyId && property.value === option;
      });
    });
    setTasksColumn(filteredTasks)
   
  }, [id, color, option]);
  return (
    <div className="w-min flex flex-col gap-4  brightness-[0.95] hover:brightness-[1]">
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
