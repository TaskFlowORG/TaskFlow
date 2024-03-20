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
import { Page, Property, TaskOrdered } from "@/models";
import { ValueSelector } from "..";
import { useRef, useContext, useState, useEffect, MouseEvent } from "react";
import { HeaderList } from "./HeaderList";
import { ProjectContext } from "@/utils/ContextProject";
interface Props {
  page: Page;
  updateIndex: (e: DropResult) => void;
}
export const Table = ({ page, updateIndex }: Props) => {
  const { project } = useContext(ProjectContext);
  const [props, setProps] = useState<Property[]>([]);
  useEffect(() => {
    if (project) {
      setProps([...project.properties, ...page.properties]);
    }
  }, [project, page]);

  return (
    <DragDropContext 
      onDragEnd={updateIndex}   
    >
            {/* se eu deixar com w-min ele vai funcionar o tamanho da linha, mas quando tiver menas colunas ele nao vai preencher a linha*/}
            <div className="h-full w-min min-w-full">
              <div key={page.id} className="w-min shadow-blur-10  flex-nowrap min-w-full h-full">
                <div className=" bg-white dark:bg-modal-grey  w-full h-[13%]">
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
                  className="overflow-y-auto none-scrollbar h-[87%] relative w-full">
                  <div className="w-full h-min">
                    {(page.tasks as TaskOrdered[])
                      .sort((a, b) => a.indexAtColumn - b.indexAtColumn)
                      .map((l, index) => {
                        return (
                          <Draggable
                            draggableId={`${index}`}
                            index={index}
                            
                            key={index}
                          >
                            {(providedDrag, snapshot) => {
                              return (
                                  <div
                                    {...providedDrag.draggableProps}
                                    {...providedDrag.dragHandleProps}
                                    ref={providedDrag.innerRef}
                                    className="bg-white dark:bg-modal-grey flexhover:brightness-95 flex "
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
                  </div>
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
