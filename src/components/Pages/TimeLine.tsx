"use client";

import { Page, Property, Task, TypeOfProperty } from "@/models";
import { useEffect, useState } from "react";
import { BackSquare, TaskLegend, TasksInTimeline, TimeLineHeader } from "./components";

export const TimeLine = ({ page }: { page: Page }) => {
  //in seconds
  const [interval, setInterval] = useState<number>(60 * 60);
  const [widthOfInterval, setWidthOfInterval] = useState<number>(150);
  const [listOfIntervals, setListOfIntervals] = useState<number[]>([]);

  const propertyOrdering = { id: 1 };
  const tasks = [
    {
      name: "Tarefa 1",
      properties: [
        {
          property: {
            id: 1,
            type: TypeOfProperty.TIME,
          },
          value: {
            color: "#aa3322",
            starts: ["2022-01-01T00:00:00", "2022-01-01T03:00:00"],
            ends: ["2022-01-01T01:00:00", "2022-01-01T04:00:00"],
            value: {
              time: 12123,
            },
          },
        },
      ],
    },
    {
      name: "Tarefa 2ljjdklfjgklsklgjsdfklkdjgs",
      properties: [
        {
          property: {
            id: 1,
            type: TypeOfProperty.TIME,
          },
          value: {
            color: "#029334",
            starts: ["2022-01-01T02:00:00", "2022-01-01T05:00:00"],
            ends: ["2022-01-01T04:00:00", "2022-01-01T06:00:00"],
            value: {
              time: 131,
            },
          },
        },
      ],
    },
    {
      name: "Tarefa 2ljjdklfjgklsklgjsdfklkdjgs",
      properties: [
        {
          property: {
            id: 1,
            type: TypeOfProperty.TIME,
          },
          value: {
            color: "#029334",
            starts: ["2022-01-01T02:00:00", "2022-01-01T05:00:00"],
            ends: ["2022-01-01T04:00:00", "2022-01-01T06:00:00"],
            value: {
              time: 131,
            },
          },
        },
      ],
    },
    {
      name: "Tarefa 2ljjdklfjgklsklgjsdfklkdjgs",
      properties: [
        {
          property: {
            id: 1,
            type: TypeOfProperty.TIME,
          },
          value: {
            color: "#029334",
            starts: ["2022-01-01T02:00:00", "2022-01-01T05:00:00"],
            ends: ["2022-01-01T04:00:00", "2022-01-01T06:00:00"],
            value: {
              time: 131,
            },
          },
        },
      ],
    },
    {
      name: "Tarefa 2ljjdklfjgklsklgjsdfklkdjgs",
      properties: [
        {
          property: {
            id: 1,
            type: TypeOfProperty.TIME,
          },
          value: {
            color: "#029334",
            starts: ["2022-01-01T02:00:00", "2022-01-01T05:00:00"],
            ends: ["2022-01-01T04:00:00", "2022-01-01T06:00:00"],
            value: {
              time: 131,
            },
          },
        },
      ],
    },
    {
      name: "Tarefa 2ljjdklfjgklsklgjsdfklkdjgs",
      properties: [
        {
          property: {
            id: 1,
            type: TypeOfProperty.TIME,
          },
          value: {
            color: "#029334",
            starts: ["2022-01-01T02:00:00", "2022-01-01T05:00:00"],
            ends: ["2022-01-01T04:00:00", "2022-01-01T06:00:00"],
            value: {
              time: 131,
            },
          },
        },
      ],
    },
    {
      name: "Tarefa 2ljjdklfjgklsklgjsdfklkdjgs",
      properties: [
        {
          property: {
            id: 1,
            type: TypeOfProperty.TIME,
          },
          value: {
            color: "#029334",
            starts: ["2022-01-01T02:00:00", "2022-01-01T05:00:00"],
            ends: ["2022-01-01T04:00:00", "2022-01-01T06:00:00"],
            value: {
              time: 131,
            },
          },
        },
      ],
    },
    {
      name: "Tarefa 2ljjdklfjgklsklgjsdfklkdjgs",
      properties: [
        {
          property: {
            id: 1,
            type: TypeOfProperty.TIME,
          },
          value: {
            color: "#029334",
            starts: ["2022-01-01T02:00:00", "2022-01-01T05:00:00"],
            ends: ["2022-01-01T04:00:00", "2022-01-01T06:00:00"],
            value: {
              time: 131,
            },
          },
        },
      ],
    },
    {
      name: "Tarefa 2ljjdklfjgklsklgjsdfklkdjgs",
      properties: [
        {
          property: {
            id: 1,
            type: TypeOfProperty.TIME,
          },
          value: {
            color: "#029334",
            starts: ["2022-01-01T02:00:00", "2022-01-01T05:00:00"],
            ends: ["2022-01-01T04:00:00", "2022-01-01T06:00:00"],
            value: {
              time: 131,
            },
          },
        },
      ],
    },
    {
      name: "Tarefa 2ljjdklfjgklsklgjsdfklkdjgs",
      properties: [
        {
          property: {
            id: 1,
            type: TypeOfProperty.TIME,
          },
          value: {
            color: "#029334",
            starts: ["2022-01-01T02:00:00", "2022-01-01T05:00:00"],
            ends: ["2022-01-01T04:00:00", "2022-01-01T06:00:00"],
            value: {
              time: 131,
            },
          },
        },
      ],
    },
    {
      name: "Tarefa 2ljjdklfjgklsklgjsdfklkdjgs",
      properties: [
        {
          property: {
            id: 1,
            type: TypeOfProperty.TIME,
          },
          value: {
            color: "#029334",
            starts: ["2022-01-01T02:00:00", "2022-01-01T05:00:00"],
            ends: ["2022-01-01T04:00:00", "2022-01-01T06:00:00"],
            value: {
              time: 131,
            },
          },
        },
      ],
    },
    {
      name: "Tarefa 2ljjdklfjgklsklgjsdfklkdjgs",
      properties: [
        {
          property: {
            id: 1,
            type: TypeOfProperty.TIME,
          },
          value: {
            color: "#029334",
            starts: ["2022-01-01T02:00:00", "2022-01-01T05:00:00"],
            ends: ["2022-01-01T04:00:00", "2022-01-01T06:00:00"],
            value: {
              time: 131,
            },
          },
        },
      ],
    },
    {
      name: "Tarefa 2ljjdklfjgklsklgjsdfklkdjgs",
      properties: [
        {
          property: {
            id: 1,
            type: TypeOfProperty.TIME,
          },
          value: {
            color: "#029334",
            starts: ["2022-01-01T02:00:00", "2022-01-01T05:00:00"],
            ends: ["2022-01-01T04:00:00", "2022-01-01T06:00:00"],
            value: {
              time: 131,
            },
          },
        },
      ],
    },
    {
      name: "Tarefa 2ljjdklfjgklsklgjsdfklkdjgs",
      properties: [
        {
          property: {
            id: 1,
            type: TypeOfProperty.TIME,
          },
          value: {
            color: "#029334",
            starts: ["2022-01-01T02:00:00", "2022-01-01T05:00:00"],
            ends: ["2022-01-01T04:00:00", "2022-01-01T06:00:00"],
            value: {
              time: 131,
            },
          },
        },
      ],
    },
    {
      name: "Tarefa 2ljjdklfjgklsklgjsdfklkdjgs",
      properties: [
        {
          property: {
            id: 1,
            type: TypeOfProperty.TIME,
          },
          value: {
            color: "#029334",
            starts: ["2022-01-01T02:00:00", "2022-01-01T05:00:00"],
            ends: ["2022-01-01T04:00:00", "2022-01-01T06:00:00"],
            value: {
              time: 131,
            },
          },
        },
      ],
    },
    {
      name: "Tarefa 2ljjdklfjgklsklgjsdfklkdjgs",
      properties: [
        {
          property: {
            id: 1,
            type: TypeOfProperty.TIME,
          },
          value: {
            color: "#029334",
            starts: ["2022-01-01T02:00:00", "2022-01-01T05:00:00"],
            ends: ["2022-01-01T04:00:00", "2022-01-01T06:00:00"],
            value: {
              time: 131,
            },
          },
        },
      ],
    },
    {
      name: "Tarefa 2ljjdklfjgklsklgjsdfklkdjgs",
      properties: [
        {
          property: {
            id: 1,
            type: TypeOfProperty.TIME,
          },
          value: {
            color: "#029334",
            starts: ["2022-01-01T02:00:00", "2022-01-01T05:00:00"],
            ends: ["2022-01-01T04:00:00", "2022-01-01T06:00:00"],
            value: {
              time: 131,
            },
          },
        },
      ],
    },
    {
      name: "Tarefa 2ljjdklfjgklsklgjsdfklkdjgs",
      properties: [
        {
          property: {
            id: 1,
            type: TypeOfProperty.TIME,
          },
          value: {
            color: "#029334",
            starts: ["2022-01-01T02:00:00", "2022-01-01T05:00:00"],
            ends: ["2022-01-01T04:00:00", "2022-01-01T06:00:00"],
            value: {
              time: 131,
            },
          },
        },
      ],
    },
    {
      name: "Tarefa 2ljjdklfjgklsklgjsdfklkdjgs",
      properties: [
        {
          property: {
            id: 1,
            type: TypeOfProperty.TIME,
          },
          value: {
            color: "#029334",
            starts: ["2022-01-01T02:00:00", "2022-01-01T05:00:00"],
            ends: ["2022-01-01T04:00:00", "2022-01-01T06:00:00"],
            value: {
              time: 131,
            },
          },
        },
      ],
    },
    {
      name: "Tarefa 2ljjdklfjgklsklgjsdfklkdjgs",
      properties: [
        {
          property: {
            id: 1,
            type: TypeOfProperty.TIME,
          },
          value: {
            color: "#029334",
            starts: ["2022-01-01T02:00:00", "2022-01-01T05:00:00"],
            ends: ["2022-01-01T04:00:00", "2022-01-01T06:00:00"],
            value: {
              time: 131,
            },
          },
        },
      ],
    },
    {
      name: "Tarefa 2ljjdklfjgklsklgjsdfklkdjgs",
      properties: [
        {
          property: {
            id: 1,
            type: TypeOfProperty.TIME,
          },
          value: {
            color: "#029334",
            starts: ["2022-01-01T02:00:00", "2022-01-01T05:00:00"],
            ends: ["2022-01-01T04:00:00", "2022-01-01T06:00:00"],
            value: {
              time: 131,
            },
          },
        },
      ],
    },
  ];

  useEffect(() => {
    setIntervals();
  }, [interval]);

  const setIntervals = () => {
    const intervals = [];
    //esse for cria sempre uma lista que comporte um dia inteiro
    for (let i = 0; i < (24 * 3600) / interval; i++) {
      intervals.push(i * interval);
    }
    setListOfIntervals(intervals);
  };



  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (e.altKey) {
      e.stopPropagation();
      e.preventDefault();
      if (e.deltaY > 0) {
        let intervalTemp;
        if (interval > 60) intervalTemp = interval + 60;
        else intervalTemp = interval + 1;
        setInterval(intervalTemp > 3600 * 8 ? 3600 * 8 : intervalTemp);
        // setWidthOfInterval((prev) => prev / 2);
      } else {
        let intervalTemp;
        if (interval > 60) intervalTemp = interval - 60;
        else intervalTemp = interval - 1;
        setInterval(intervalTemp < 2 ? 2 : intervalTemp);
        // setWidthOfInterval((prev) => prev * 2);
      }
    }
    setIntervals();
  };

  return (
    <div className="w-full h-full pt-20 flex flex-col justify-start items-center">
      <div className="h-full flex flex-col w-screen px-8 md:px-16 lg:px-40 xl:px-52 2xl:px-72 gap-14">
        <div className="h-min w-full flex items-center justify-between">
          <div className="h4 dark:text-white sm:text-[40px] md:text-[48px] w-full text-primary">
            {page.name ?? "Sem Nome"}
          </div>
          <div className="w-min flex">
            <div className=" aspect-square dark:bg-secondary h-6 md:h-12 bg-primary rounded-full"></div>
            <div className=" aspect-square dark:bg-secondary h-6 md:h-12 bg-primary rounded-full"></div>
          </div>
        </div>
        <div className="relative w-full flex h-full">
          <div className="w-full h-4/5 p-2 flex">
            <div className="flex w-full h-full gap-2" onWheelCapture={handleWheel}>
              <TaskLegend tasks={tasks as Task[]} propOrdering={propertyOrdering as Property}/>
              <div className="w-full p-4  flex flex-col col-span-4 relative overflow-x-auto ">
                <TimeLineHeader interval={interval} listOfIntervals={listOfIntervals} widthOfInterval={widthOfInterval} />
                <TasksInTimeline interval={interval} propOrdering={propertyOrdering as Property} tasks={tasks as Task[]} widthOfInterval={widthOfInterval} />
              </div>
            </div>
          </div>
          <BackSquare />
        </div>
      </div>
    </div>
  );
};
