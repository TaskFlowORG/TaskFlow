
import {
  Calendar,
  Canvas,
  Kanban,
  List,
  Table,
  TimeLine,
} from "@/components/Pages";
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
import { FilterContext } from "@/utils/FilterlistContext";
import { ReactNode, useContext, useEffect, useState } from "react";
import { SearchBar } from "../SearchBar";
import { If } from "../If";
import { showTask } from "./functions";

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
  const [pageComponent, setPageComponent] = useState<ReactNode | undefined>();
  useEffect(() => {
    console.log("UBLABLA")
    const pageTemp = { ...page };
    pageTemp.tasks = tasks?.filter((task) =>
      showTask(task.task, context)
    ) as TaskPage[];
    setPage(pageTemp as PageModel);
  }, [context.filterProp, context.input, project]);

  useEffect(() => {
    setPageComponent(getPage(page))
  }, [page])

  if (page.type == TypeOfPage.CANVAS)
    return <Canvas page={page as CanvasPage} />;

  function getPage(page: PageModel) {
    switch (page?.type) {
      case TypeOfPage.CALENDAR:
        return <Calendar page={page as OrderedPage} />;
      case TypeOfPage.KANBAN:
        // Lembra de ajeitar isso luka
        return (
          <Kanban
            user={user}
            page={page as OrderedPage}
            project={project as Project}
          />
        );
      case TypeOfPage.LIST:
        return <List page={page} />;
      case TypeOfPage.TABLE:
        return <Table page={page} project={project} />;
      case TypeOfPage.TIMELINE:
        return <TimeLine page={page} />;
    }
  }

  
  return (
    <div className="w-screen h-screen created-page pt-24 px-8 md:px-16 lg:px-40 xl:px-52 2xl:px-48 flex justify-center dark:bg-back-grey">
      <div className="w-full h-full flex flex-col">
        <If condition={page?.type != TypeOfPage.CALENDAR}>
          <div className="flex-col sm:flex-row flex gap-5 justify-between self-center w-full items-center  pb-4  relative  h-[108px] sm:h-16">
            <div className="flex gap-4 items-center">
              <h1 className=" text-h3  leading-none lg:text-h2 1.5xl:text-h1 font-alata text-primary whitespace-nowrap    dark:text-white">
                {page?.name}
              </h1>
            </div>
            <div className="w-max">
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
          </div>
        </If>
        <span className="sm:h-[calc(100%_-_64px)] h-[calc(100%_-_108px)] w-full page flex flex-col ">{pageComponent}</span>
      </div>
    </div>
  );
};
