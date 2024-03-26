"use client";

import { Page, Property, Task, TypeOfProperty } from "@/models";
import { useEffect, useRef, useState } from "react";
import {
  BackSquare,
  TaskLegend,
  TasksInTimeline,
  TimeLineHeader,
} from "./components";
import { set } from "zod";

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
  const [scrollY, setScrollY] = useState(0);

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
      // e.preventDefault();
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
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) ref.current.scrollTop = scrollY;
  }, [scrollY]);

  return (
    <div className="w-full h-full pt-20 flex flex-col justify-start items-center">
      <div className="h-full relative flex flex-col w-screen px-8 md:px-16 lg:px-40 xl:px-52 2xl:px-72 gap-14">
        <div className="h-min w-full flex items-center justify-between">
          <div className="h4 dark:text-white sm:text-[40px] md:text-[48px] w-full text-primary">
            {page.name ?? "Sem Nome"}
          </div>
          <div className="w-min flex">
            <div className=" aspect-square dark:bg-secondary h-6 md:h-12 bg-primary rounded-full"></div>
            <div className=" aspect-square dark:bg-secondary h-6 md:h-12 bg-primary rounded-full"></div>
          </div>
        </div>
        <div className=" w-full h-[75%] flex">
          <div className="w-full h-full flex relative">
            <div className=" w-2/5 sm:w-1/5 h-full flex flex-col pb-4 p-2">
              <h5 className="text-[18px] h-[3.2rem] md:text-[24px] text-alata flex items-center justify-center  text-primary w-full ">
                Tarefas
              </h5>
              <TaskLegend
                tasks={tasks as Task[]}
                propOrdering={propertyOrdering as Property}
                scrollY={scrollY}
                setScrollY={setScrollY}
              />
            </div>
            <div className="h-full flex w-3/5 sm:w-4/5 p-2">
              <div className="w-full h-full flex overflow-x-auto pl-2">
                <div className="flex w-min h-full relative">
                  <TimeLineHeader
                    interval={interval}
                    listOfIntervals={listOfIntervals}
                    widthOfInterval={widthOfInterval}
                  />
                  <div
                    className="flex h-full w-min pt-12 overflow-y-auto none-scrollbar"
                    ref={ref}
                    onScrollCapture={e => {setScrollY(e.currentTarget.scrollTop)}}
                    onWheelCapture={handleWheel}
                  >
                    <TasksInTimeline
                      interval={interval}
                      propOrdering={propertyOrdering as Property}
                      tasks={tasks as Task[]}
                      widthOfInterval={widthOfInterval}
                    />
                  </div>
                </div>
              </div>
            </div>
        <BackSquare />
          </div>
        </div>
      </div>
    </div>
  );
};
