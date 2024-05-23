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
import { InputCalendar } from "../InputCalendar";
import { IconCalendar } from "../icons";
import { useTranslation } from "next-i18next";
import { compareDates } from "./functions";
import { Info } from "../Info";

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
        setInterval(intervalTemp < 60 ? 60 : intervalTemp);
        // setWidthOfInterval((prev) => prev * 2);
      }
    } else {
      e.stopPropagation();
      if (ref.current) setScrollY(ref.current?.scrollTop + e.deltaY);
    }
    setIntervals();
  };
  const ref = useRef<HTMLDivElement>(null);
  const [date, setDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    if (ref.current) ref.current.scrollTop = scrollY;
  }, [scrollY]);
  const { t } = useTranslation();


  useEffect(() => {
    const tempWidth  = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--font-size-p").replace("px", ""));
    setWidthOfInterval(tempWidth * 12);
  });

  return (
    <div className="w-full h-full flex flex-col justify-start items-center">
      
      <div className="h-full relative flex flex-col w-full gap-10">
        <div className=" w-full h-[75%] flex flex-col">
          <div className="w-full h-min flex justify-end">
            {/* Não consigo mudar o icone do input de data */}
            <div className=" bg-primary text-contrast dark:bg-secondary h-8 z-10 text-montserrat p-2 relative rounded-t-md">
              <InputCalendar
                value={date}
                setValue={setDate}
                icon={<IconCalendar contrast />}
              />
            </div>
          </div>
          <div className="w-full h-full flex relative">
            <div className=" w-2/5 sm:w-1/5 h-full flex flex-col pb-4 p-2 z-30">

              <h5 className="text-p h-[3.4rem] md:text-h4 text-alata 
              flex items-center justify-center  gap-2 text-primary w-full dark:text-secondary">
                <Info text="timeline-scroll-desc" title="timeline-scroll" />
                {t("tasks")}
              </h5>
              <TaskLegend
                tasks={page.tasks.map((t) => t.task)}
                propOrdering={(page as OrderedPage).propertyOrdering}
                scrollY={scrollY}
                setScrollY={setScrollY}
              />
            </div>
            <div className="h-full flex w-3/5 sm:w-4/5 p-2">
              <div className="w-full h-full flex overflow-x-auto pl-2 pb-2 box-content z-20 ">
                <div
                  className="flex w-min h-full relative"
                  onWheelCapture={handleWheel}
                >
                  <TimeLineHeader
                    interval={interval}
                    listOfIntervals={listOfIntervals}
                    widthOfInterval={widthOfInterval}
                  />
                  <div
                    className="flex h-full w-min pt-12 overflow-y-hidden  none-scrollbar"
                    onScroll={(e) => {
                      setScrollY(e.currentTarget.scrollTop); 
                    }}
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
