"use client";

import { List } from "@/components/List";
import { IconTask } from "@/components/icons";
import { getData, getListData, putData } from "@/services/http/api";
import { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import page from "@/app/(all)/(before-login)/login/page";
import { Page, Project, Property, TaskOrdered } from "@/models";

export default function TablePage({
  params,
}: {
  params: { page: string; project: string };
}) {
  const [tasks, setTasks] = useState<TaskOrdered[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [pageObj, setPageObj] = useState<Page>();

  useEffect(() => {
    (async () => {
      const pagePromise: Promise<Page> = await getData(
        "page",
        JSON.parse(params.page)
      );
      setPageObj(await pagePromise);
      const projectPromise: Promise<Project> = await getData(
        "project",
        JSON.parse(params.project)
      );

      let tasksPromise = (await pagePromise).tasks;
      let propsPromise = [
        ...(await projectPromise).properties,
        ...(await pagePromise).properties,
      ];
      setTasks(tasksPromise as TaskOrdered[]);
      setProperties(propsPromise.filter((p) => p.visible));
    })();
    // eslint-disable-next-line
  }, []);

  async function updateIndexes(e: DropResult) {
    if (!e.draggableId || !e.destination?.index) return;
    const id = e.draggableId.split("/")[1];
    // // console.log(e.draggableId, e.destination?.index)
    const pagePromise = await putData(
      `page/${id}/${e.destination?.index}`,
      pageObj
    );
    setPageObj(await pagePromise);
  }

  return (
    <div className="w-full h-full pt-20 flex flex-col justify-start items-center">
      <div className="h-full flex flex-col w-5/6 md:w-2/3 lg:w-3/5 xl:w-[45%] 2xl:w-[45%] gap-14">
        <div className="h-min w-full flex items-center justify-between">
          <div
            className="h4 dark:text-white sm:text-[40px] md:text-[48px] w-full text-primary"
            style={!pageObj?.name ? { opacity: 0.7 } : {}}
          >
            {pageObj?.name || "Sem Nome"}
          </div>
          <div className="w-min flex">
            <div className=" aspect-square dark:bg-secondary h-6 md:h-12 bg-primary rounded-full"></div>
            <div className=" aspect-square dark:bg-secondary h-6 md:h-12 bg-primary rounded-full"></div>
          </div>
        </div>
        <div className="w-full h-4/5 overflow-auto p-2">
          <div className="min-w-full h-full flex gap-1 shadow-blur-10">
            <DragDropContext onDragEnd={(e) => updateIndexes(e)}>
              <List
                list={tasks}
                headName="Tasks"
                justName
                updateIndexes={updateIndexes}
                listId={pageObj?.id ?? 0}
              />
              {properties.map((p) => {
                return (
                  <List
                    list={tasks}
                    property={p}
                    headName={p.name}
                    key={p.id}
                    justName={false}
                    updateIndexes={updateIndexes}
                    listId={pageObj?.id ?? 0}
                  />
                );
              })}
            </DragDropContext>
          </div>
        </div>
      </div>
    </div>
  );
}
