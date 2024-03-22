"use client";

import { Page, TypeOfProperty } from "@/models";
import { useEffect, useState } from "react";

export const TimeLine = ({ page }: { page: Page }) => {
  //in seconds
  const [interval, setInterval] = useState<number>(60 * 60);
  const [widthOfInterval, setWidthOfInterval] = useState<number>(150);
  const [listOfIntervals, setListOfIntervals] = useState<number[]>([]);

  const propertyOrdering = {id:1}
    const tasks = [
        {
            name:"Tarefa 1",
            properties:[
                {
                    property:{
                        id:1,
                        type:TypeOfProperty.TIME
                    },
                    value:{
                         color:"#aa3322",
                        starts:[
                            "2022-01-01T00:00:00",
                            "2022-01-01T03:00:00"
                        ],
                        ends:[
                            "2022-01-01T01:00:00",
                            "2022-01-01T04:00:00"
                        ],
                        value:{
                            time:12123
                        }
                       
                    }
                }
            ]
        },
        {
            name:"Tarefa 2ljjdklfjgklsklgjsdfklkdjgs",
            properties:[
                {
                    property:{
                        id:1,
                        type:TypeOfProperty.TIME
                    },
                    value:{ color:"#aa3322",
                        starts:[
                            "2022-01-01T02:00:00",
                            "2022-01-01T05:00:00"
                        ],
                        ends:[
                            "2022-01-01T04:00:00",
                            "2022-01-01T06:00:00"
                        ],
                        value:{
                            time:131
                        }
                       
                    }
                }
            ]
        }
    ]




  useEffect(() => {
    setIntervals()
  }, [interval]);

const setIntervals = () => {
    const intervals = [];
    //esse for cria sempre uma lista que comporte um dia inteiro
    for (let i = 0; i < ((24*3600)/interval); i++) {
      intervals.push(i * interval);
    }
    setListOfIntervals(intervals);
}

  const getInitialTimeOfInterval = (intervalToFormat: number) => {
    const hours = Math.floor(intervalToFormat / 3600);
    const minutes = Math.floor((intervalToFormat % 3600) / 60);
    const seconds = Math.floor(intervalToFormat % 60);
    const date = new Date(0);
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(seconds);
    if (interval >= 3600)
        return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
    else
        return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`

  };

  const getLatestTimeOfInterval = (intervalToFormat: number) => {
    const hours = Math.floor((intervalToFormat + interval) / 3600);
    const minutes = Math.floor(((intervalToFormat + interval) % 3600) / 60);
    const seconds = Math.floor((intervalToFormat + interval) % 60-1);
    const date = new Date(0);
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(seconds);
    if (interval >= 3600)
        return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
    else
        return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`


  };

  const formatInterval = (intervalToFormat: number) => {
    const initialTime = getInitialTimeOfInterval(intervalToFormat);
    const latestTime = getLatestTimeOfInterval(intervalToFormat);
    return `${initialTime} - ${latestTime}`;    
}

  const calcMarginLeft = (start: string) => {
    const date = new Date(start);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    
    const seconds = date.getSeconds();
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    return `${(totalSeconds / interval) * widthOfInterval}px`;
  }

  const calcWidth = (start: string, task: any) => {
    const date = new Date(start);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    const propVl = task.properties.find(prop => prop.property.id === propertyOrdering.id)?.value
    const index = propVl.starts.indexOf(start);
    const dateEnd = new Date(propVl.ends[index]);
    const hoursEnd = dateEnd.getHours();
    const minutesEnd = dateEnd.getMinutes();
    const secondsEnd = dateEnd.getSeconds();
    const totalSecondsEnd = hoursEnd * 3600 + minutesEnd * 60 + secondsEnd;
    return `${((totalSecondsEnd - totalSeconds) / interval) * widthOfInterval}px`;
  }

const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (e.ctrlKey) {
        e.stopPropagation()
        e.preventDefault()
        if (e.deltaY > 0) {
        const intervalTemp = interval + interval/3; 
        setInterval(intervalTemp > 3600*8 ? 3600*8 : intervalTemp);
        // setWidthOfInterval((prev) => prev / 2);
      } else {
        const intervalTemp = interval - interval/3;
        setInterval(intervalTemp < 1 ? 1 : intervalTemp);
        // setWidthOfInterval((prev) => prev * 2);
      }
    }
    setIntervals()
  }


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
                    <div className="flex w-full h-full gap-5 overflow-y-auto" onWheelCapture={handleWheel }>
              <div className="bg-red-200  w-40 h-full flex flex-col py-4 gap-2">
                <h5 className="h4 bg-yellow-200 text-primary w-full text-center ">
                  Tarefas
                </h5>
                <div className="w-full flex flex-col gap-2  h-min">
                {tasks.map((task, index) =>{
                    const propVl = task.properties.find(prop => prop.property.id === propertyOrdering.id)?.value
                    return <div key={index} className="h-8 w-full bg-rose-300 px-6 gap-2 flex justify-start items-center">
                        <div className="h-5/6 aspect-square rounded-md w-min" style={{backgroundColor:propVl?.color ?? "#f04a94"}} />
                        <span className="w-max h-min truncate font-montserrat text-[12px]">
                        {task.name ?? "Sem Nome"}
                        </span>
                    </div>
                  })}
                </div>
              </div>
              <div className="w-full bg-blue-200 h-min min-h-full py-4 overflow-x-auto flex flex-col">
                <div className="w-min bg-purple-500 min-w-full h-9 border-b-2 flex border-primary">
                  {listOfIntervals.map((interval, index) => {
                    return (
                        <div key={index} className="relative flex whitespace-nowrap justify-center" style={{width:widthOfInterval}}>
                            {formatInterval(interval) ?? ""}
                            <div className="w-px border-r-2 border-dashed border-input-grey h-96 absolute -right-0 top-0"  />
                        </div>
                    )
                  })}
                </div>
                <div className="flex flex-col h-min w-min gap-2 pt-2">
                  {tasks.map((task, index) =>{
                    const propVl = task.properties.find(prop => prop.property.id === propertyOrdering.id)?.value
                    return <div key={index} className="h-8 w-full bg-green-300 flex justify-start relative" >
                        {
                            propVl?.starts.map((start, index) => {
                                return <div key={index} className="h-full rounded-md absolute top-0 left-0" 
                                style={{backgroundColor:propVl.color, marginLeft:calcMarginLeft(start), width:calcWidth(start, task)}} />
                            })
                        }
                    </div>
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-4/5 p-2 flex absolute -z-10 top-0 left-0">
            <div className="grid grid-cols-5 w-full h-full  gap-2">
              <div className="bg-white w-40 h-full shadow-blur-10"></div>
              <div className=" bg-white w-full col-span-4 shadow-blur-10"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
