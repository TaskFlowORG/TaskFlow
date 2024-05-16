"use client";

import {
  Calendar,
  Canvas,
  Kanban,
  List,
  Table,
  TimeLine,
} from "@/components/Pages";
import { ProjectContext } from "@/contexts";
import { UserContext } from "@/contexts/UserContext";
import {
  CanvasPage,
  OrderedPage,
  Page as PageModel,
  Project,
  Property,
  TaskPage,
  TypeOfPage,
  User,
} from "@/models";
import { FilteredProperty } from "@/types/FilteredProperty";
import { FilterContext } from "@/utils/FilterlistContext";
import { PageContext } from "@/utils/pageContext";
import { log } from "console";
import { useContext, useEffect, useState } from "react";
import { SearchBar } from "../SearchBar";
import { If } from "../If";
import { showTask } from "./functions";
import { Loading } from "../Loading";

export const Page = ({
  user,
  project,
  page,
  tasks,
  setPage,
}: {
  user: User;
  project?: Project;
  page: PageModel;
  tasks: TaskPage[];
  setPage: (page: PageModel) => void;
}) => {
  const context = useContext(FilterContext);
  useEffect(() => {
    console.log("FOI AQUI TBM");

    const pageTemp = { ...page };
    pageTemp.tasks = tasks?.filter((task) =>
      showTask(task.task, context)
    ) as TaskPage[];
    setPage(pageTemp as PageModel);
  }, [context.filterProp, context.input, tasks]);

  if (page.type == TypeOfPage.CANVAS)
    return (
      <span className="page">
        <Canvas page={page as CanvasPage} />
      </span>
    );

  function getPage(page: PageModel) {
    switch (page?.type) {
      case TypeOfPage.CALENDAR:
        return (
          <span className="page">
            <Calendar page={page as OrderedPage} />
          </span>
        );
      case TypeOfPage.KANBAN:
        return (
          <span className="page">
            <Kanban
              user={user}
              page={page as OrderedPage}
              project={project as Project}
            />
          </span>
        );
      case TypeOfPage.LIST:
        return (
          <span className="page">
            <List page={page} />
          </span>
        );
      case TypeOfPage.TABLE:
        return (
          <span className="page">
            <Table page={page} project={project} />
          </span>
        );
      case TypeOfPage.TIMELINE:
        return (
          <span className="page">
            <TimeLine page={page} />
          </span>
        );
    }
  }

  return (
    <div className="w-screen h-screen pt-24 px-8 md:px-16 lg:px-40 xl:px-52 2xl:px-48 flex justify-center dark:bg-back-grey">
      <div className="w-full h-full">
        <If condition={page?.type != TypeOfPage.CALENDAR}>
          <div className=" flex gap-5 justify-between self-center w-full items-center  pb-4  relative   h-max">
            <div className="flex gap-4 items-center">
              <h1
                className=" text-h3  leading-none lg:text-h2 1.5xl:text-h1 font-alata text-primary whitespace-nowrap    dark:text-white"
                onClick={() => console.log(page)}
              >
                {page?.name}
              </h1>
            </div>

            <SearchBar
              order={[
                TypeOfPage.CALENDAR,
                TypeOfPage.KANBAN,
                TypeOfPage.TIMELINE,
              ].includes(page?.type)}
              filter
              search
              page={page as OrderedPage}
              properties={page?.properties as Property[]}
            ></SearchBar>
          </div>
        </If>
        {getPage(page)}
      </div>
    </div>
  );
};
