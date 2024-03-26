"use client";

import { OrderedPage, Page, Property, Task, TypeOfProperty } from "@/models";
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
    }else{
      e.stopPropagation();
      if(ref.current)
      setScrollY(ref.current?.scrollTop + e.deltaY);
    }
    setIntervals();
  };
  const ref = useRef<HTMLDivElement>(null);
  const[date, setDate] = useState<string>(new Date().toISOString().split("T")[0]);

  useEffect(() => {
    if (ref.current) ref.current.scrollTop = scrollY;
  }, [scrollY]);

  return (
    <div className="w-full h-full pt-20 flex flex-col justify-start items-center">
      <div className="h-full relative flex flex-col w-screen px-8 md:px-16 lg:px-40 xl:px-52 2xl:px-72 gap-10">
        <div className="h-min w-full flex items-center justify-between">
          <div className="h4 dark:text-white sm:text-[40px] md:text-[48px] w-full text-primary">
            {page.name ?? "Sem Nome"}
          </div>
          <div className="w-min flex">
            <div className=" aspect-square dark:bg-secondary h-6 md:h-12 bg-primary rounded-full"></div>
            <div className=" aspect-square dark:bg-secondary h-6 md:h-12 bg-primary rounded-full"></div>
          </div>
        </div>
        <div className=" w-full h-[65%] flex flex-col">
          <div className="w-full h-min flex justify-end">
            {/* Não consigo mudar o icone do input de data */}
            <input className=" bg-primary text-contrast dark:bg-secondary h-8 z-10 text-montserrat p-2 rounded-t-md" onChange={e =>setDate(e.target.value)} type="date" value={date} />
          </div>
          <div className="w-full h-full flex relative">
            <div className=" w-2/5 sm:w-1/5 h-full flex flex-col pb-4 p-2 z-30">
              <h5 className="text-[18px] h-[3.4rem] md:text-[24px] text-alata 
              flex items-center justify-center  text-primary w-full dark:text-secondary">
                Tarefas
              </h5>
              <TaskLegend
                tasks={page.tasks.map((t) => t.task)}
                propOrdering={(page as OrderedPage).propertyOrdering}
                scrollY={scrollY}
                setScrollY={setScrollY}
              />
            </div>
            <div className="h-full flex w-3/5 sm:w-4/5 p-2">
              <div className="w-full h-full flex overflow-x-auto pl-2 pb-2 box-content ">
                <div className="flex w-min h-full relative">
                  <TimeLineHeader
                    interval={interval}
                    listOfIntervals={listOfIntervals}
                    widthOfInterval={widthOfInterval}
                    />
                  <div
                    className="flex h-full w-min pt-12 overflow-y-hidden  none-scrollbar"
                      onWheelCapture={handleWheel}
                      onScroll={(e) => {setScrollY(e.currentTarget.scrollTop)}}
                    ref={ref}
                  >
                    <TasksInTimeline
                      interval={interval}
                      propOrdering={(page as OrderedPage).propertyOrdering}
                      tasks={page.tasks.map((t) => t.task)}
                      date={date}
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
