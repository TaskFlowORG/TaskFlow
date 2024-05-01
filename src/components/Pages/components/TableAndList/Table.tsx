"use client";
import {
  DragDropContext,
  Draggable,
  DragUpdate,
  Droppable,
  DropResult,
  OnDragUpdateResponder,
  ResponderProvided,
} from "@hello-pangea/dnd";
import { Page, Property, Task, TaskOrdered } from "@/models";
import { ValueSelector } from "..";
import { useRef, useContext, useState, useEffect, MouseEvent } from "react";
import { HeaderList } from "./HeaderList";
import { ProjectContext } from "@/contexts";
import { updateIndexes } from "../../functions/updateIndexes";
import { TaskModalContext } from "@/utils/TaskModalContext";
import { useHasPermission } from "@/hooks/useHasPermission";
import { useTranslation } from "react-i18next";
interface Props {
  page: Page;
}
export const Table = ({ page }: Props) => {
  const { project } = useContext(ProjectContext);
  const [props, setProps] = useState<Property[]>([]);
  useEffect(() => {
    if (project) {
      const list=[...project.properties, ...page.properties]
      setProps(list.filter(p => p.visible));
    }
  }, [project, page]);

  const [list, setList] = useState<Array<TaskOrdered>>((page.tasks as TaskOrdered[]).sort((a, b) => a.indexAtColumn - b.indexAtColumn));

  const {setSelectedTask, setIsOpen} = useContext(TaskModalContext)

  const openModal = (id:number) => {
    if(!setIsOpen || !setSelectedTask) return
    const task: Task | undefined = list.find(l => l.task.id == id)?.task
    if(!task) return
    setIsOpen(true)
    setSelectedTask(task)
  }

  const {t} = useTranslation();

  const permission = useHasPermission("update")

  return (
    <DragDropContext 
    
      onDragEnd={e => updateIndexes(e, list, setList, project)}   
    >
            <div className="h-full w-min min-w-full flex">
              <div key={page.id} className="w-min shadow-blur-10  flex-nowrap min-w-full h-full">
                <div className=" bg-white dark:bg-modal-grey  w-full h-min">
                  <div className="w-full  flex">
                    <div className=" bg-white min-w-[14rem] dark:bg-modal-grey border-zinc-400 w-full dark:border-zinc-600 border-b-2">
                      <HeaderList name={"Tasks"} />
                    </div>
                    {props.map((p) => (
                        <div key={p.id} className=" bg-white min-w-[14rem] dark:bg-modal-grey flex items-center border-zinc-400 w-full dark:border-zinc-600 border-b-2">
                                            <div className="w-px bg-zinc-400 dark:bg-zinc-600 h-8" />
                        <HeaderList name={p.name} p={p} />
                      </div>
                    ))}
                  </div>        
                </div>
                <Droppable droppableId={`${page.id}`} >
                  {(provided, snapshot) => {
                    return (
                <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                  className="overflow-y-auto none-scrollbar h-[87%] flex relative w-full">
                    {page.tasks.length == 0 ?
                    
                    <div className="text-h4 font-alata text-primary items-center pb-10 dark:text-secondary w-full h-full flex   justify-center">
                       {t("no-tasks-in-page")}
                    </div>
                   :
                  <div className="w-full h-min">
                    {
                    list
                      .map((l, index) => {
                        return (
                          <Draggable
                            draggableId={`${index}`}
                            index={index}
                            isDragDisabled={!permission}
                            
                            key={index}
                          >
                            {(providedDrag, snapshot) => {
                              return (
                                  <div
                                    {...providedDrag.draggableProps}
                                    {...providedDrag.dragHandleProps}
                                    ref={providedDrag.innerRef}
                                    className="bg-white dark:bg-modal-grey flexhover:brightness-95 flex "
                                    onClick={e => openModal(l.task.id)}
                                  >
                                    <div className=" bg-white dark:bg-modal-grey border-zinc-400  dark:border-zinc-600 border-y-[1px] w-full">
                                      <ValueSelector l={l} justName={true} />
                                    </div>
                                    {props.map((p, index) => {
                                      return (
                                        <div
                                          key={index}
                                          className="bg-white dark:bg-modal-grey border-zinc-400 w-full dark:border-zinc-600 border-y-[1px]"
                                        >
                                          <span className="flex w-full items-center justify-start">
                                            <div className="w-px bg-zinc-400 dark:bg-zinc-600 h-8" />
                                            <ValueSelector
                                              l={l}
                                              justName={false}
                                              property={p}
                                              propVl={l.task.properties.find(
                                                (p1) => p1.property.id == p.id
                                              )}
                                            />
                                          </span>
                                        </div>
                                      );
                                    })}
                                  </div>
                              );
                            }}
                          </Draggable>
                        );
                      })}
                  </div>}
                  {provided.placeholder}
                </div>
          );
        }}
      </Droppable>
              </div>
            </div>
    </DragDropContext>
  );
};
