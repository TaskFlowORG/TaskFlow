"use client";

import { CalendarDay, CalendarTasksModal } from "./components";
import { Arrow } from "@/components/icons/";
import { compareDates } from "./functions";
import {
  OrderedPage,
  Property,
  TaskOrdered,
  TaskPage,
  PropertyValue,
  Language,
} from "@/models";
import { useContext, useEffect, useState } from "react";
import { Date as DateProp } from "@/models";
import { SearchBar } from "../SearchBar";
import { useTranslation } from "react-i18next";
import { UserContext } from "@/contexts/UserContext";
import { languageToString } from "@/functions/selectLanguage";

interface Day {
  day: Date;
  inThisMonth: boolean;
  tasks: TaskPage[];
}

interface Props {
  page: OrderedPage;
}

export const Calendar = ({ page }: Props) => {
  const [tasks, setTasks] = useState<TaskOrdered[]>(
    page.tasks as TaskOrdered[]
  );
  const {t} = useTranslation  ();
  const [month, setMonth] = useState<number>(0);
  const [year, setYear] = useState<number>(0);
  const [modal, setModal] = useState<boolean>(false);
  const {user} = useContext(UserContext);

  useEffect(() => {
    const temporaryMonth = new Date().getMonth() + 1;
    setMonth(temporaryMonth);
    setYear(new Date().getUTCFullYear());
    const tasksPromise = page.tasks as TaskOrdered[];
    setTasks(tasksPromise);
  }, [page.tasks]);

  function getPropertyValueOfOrdering(
    task: TaskOrdered,
    prop: Property | undefined
  ): PropertyValue | null {
    if (!prop) return null;
    for (let p of task.task.properties) {
      if (p.property.id == prop.id) {
        return p;
      }
    }
    return null;
  }
  function getDays(): Array<Day> {
    if (!tasks) return [];
    const lastDate: Date = new Date(year, month, 0);
    const firstDate: Date = new Date(year, month - 1);
    const days: Array<Day> = [];
    for (let i = firstDate.getDay(); i > 0; i--) {
      let date: Date = new Date(firstDate);
      date.setTime(firstDate.getTime() - i * 24 * 60 * 60 * 1000);
      days.push({
        day: date,
        inThisMonth: false,
        tasks: tasks.filter((t) =>
          compareDates(
            new Date(
              getPropertyValueOfOrdering(t, page.propertyOrdering)?.value.value
            ),
            date
          )
        ),
      });
    }
    for (let i = 0; i < lastDate.getDate(); i++) {
      let date: Date = new Date(firstDate);
      date.setTime(firstDate.getTime() + i * 24 * 60 * 60 * 1000);

      days.push({
        day: date,
        inThisMonth: true,
        tasks: tasks.filter((t) =>
          compareDates(
            new Date(
              getPropertyValueOfOrdering(t, page.propertyOrdering)?.value.value
            ),
            date
          )
        ),
      });
    }
    for (let i = 1; i < 7 - lastDate.getDay(); i++) {
      let date: Date = new Date(lastDate);
      date.setTime(lastDate.getTime() + i * 24 * 60 * 60 * 1000);
      days.push({
        day: date,
        inThisMonth: false,
        tasks: tasks.filter((t) =>
          compareDates(
            new Date(
              getPropertyValueOfOrdering(t, page.propertyOrdering)?.value.value
            ),
            date
          )
        ),
      });
    }
    return days;
  }
  function decMonth(): void {
    if (month == 1) {
      setYear(year - 1);
      setMonth(12);
    } else {
      setMonth(month - 1);
    }
  }
  function incMonth(): void {
    if (month == 12) {
      setYear(year + 1);
      setMonth(1);
    } else {
      setMonth(month + 1);
    }
  }
  function getMonthName(): string {
    const date: Date = new Date(year, month - 1);
    const lang = user?.configuration.language;
    const locale = languageToString(lang as Language);
    const name: string = date.toLocaleString(  locale , { month: "long" });
    return name[0].toUpperCase() + name.slice(1);
  }

  return (
    <div className="w-full h-full flex justify-center pb-14 items-start">
      <div className="max-w-full h-full flex items-center flex-col aspect-square ">
        <div className="h-min w-full flex items-center justify-between gap-2">
          <div className="font-alata text-p dark:text-white smm:text-h4 sm:text-h3  w-min text-primary">
            {year}
          </div>
          <div className="w-full h-min flex justify-center items-center">
            <button onClick={decMonth} className="rotate-180 h-4 sm:h-6">
              <Arrow />
            </button>
            <span
              className=" font-alata text-p dark:text-white smm:text-h4 sm:text-h3   h-min text-secondary
                       w-full text-center"
            >
              {t(getMonthName())}
            </span>
            <button onClick={incMonth} className="h-4 sm:h-6">
              <Arrow />
            </button>
          </div>
          <div className="w-min ">
            <SearchBar
              filter
              order
              page={page as OrderedPage}
              properties={page?.properties as Property[]}
            ></SearchBar>
          </div>
        </div>
        <div className="grid grid-cols-7 smm:gap-1 w-full h-max max-h-full">
          <span className="text-back-grey dark:text-white h-3 mb-1 smm:mb-0 sm:h-10 text-mn w-full font-alata sm:text-h4 text-center">
            {t("sunday").slice(0, 3).toUpperCase()}
          </span>
          <span className="text-back-grey dark:text-white h-3 mb-1 smm:mb-0 sm:h-10 text-mn w-full font-alata sm:text-h4 text-center">
            {t("monday").slice(0, 3).toUpperCase()}
          </span>
          <span className="text-back-grey dark:text-white h-3 mb-1 smm:mb-0 sm:h-10 text-mn w-full font-alata sm:text-h4 text-center">
            {t("tuesday").slice(0, 3).toUpperCase()}
          </span>
          <span className="text-back-grey dark:text-white h-3 mb-1 smm:mb-0 sm:h-10 text-mn w-full font-alata sm:text-h4 text-center">
            {t("wednesday").slice(0, 3).toUpperCase()}
          </span>
          <span className="text-back-grey dark:text-white h-3 mb-1 smm:mb-0 sm:h-10 text-mn w-full font-alata sm:text-h4 text-center">
            {t("thursday").slice(0, 3).toUpperCase()}
          </span>
          <span className="text-back-grey dark:text-white h-3 mb-1 smm:mb-0 sm:h-10 text-mn w-full font-alata sm:text-h4 text-center">
            {t("friday").slice(0, 3).toUpperCase()}
          </span>
          <span className="text-back-grey dark:text-white h-3 mb-1 smm:mb-0 sm:h-10 text-mn w-full font-alata sm:text-h4 text-center relative">
            {t("saturday").slice(0, 3).toUpperCase()}
            <button
              className="[writing-mode:vertical-rl] font-montserrat h-min w-min px-px smm:px-1 rounded-r-md text-contrast text-[8px] sm:text-mn lg:text-p14
                            py-2 smm:py-3 xl:text-p bg-primary dark:bg-secondary whitespace-nowrap absolute left-[95%] smm:left-full ml-1 cursor-pointer top-full mt-1"
              onClick={() => setModal(true)}
            >
             {t("tasks-without-date")}
            </button>
          </span>
          {getDays().map((d) => (
            <CalendarDay
              propOrd={page.propertyOrdering as DateProp}
              date={d}
              key={
                d.day.getDate() +
                ", " +
                d.day.getMonth() +
                ", " +
                d.day.getFullYear()
              }
            />
          ))}
        </div>
      </div>
      <CalendarTasksModal
        title={t("tasks-without-date")}
        modal={modal}
        setModal={setModal}
        propOrd={page.propertyOrdering as DateProp}
        withotTime
        tasks={tasks.filter(
          (t) =>
            t.task.properties.find(
              (p) => p.property.id === page.propertyOrdering?.id
            )?.value.value == null
        )}
        notDay
      />
    </div>
  );
};
