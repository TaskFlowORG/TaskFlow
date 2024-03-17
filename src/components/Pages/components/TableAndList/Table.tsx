"use client";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import { Page, Property, TaskOrdered } from "@/models";
import { ValueSelector } from "..";
import { useRef, useContext, useState, useEffect } from "react";
import { HeaderList } from "./HeaderList";
import { ProjectContext } from "@/utils/ContextProject";
interface Props {
  page: Page;
  updateIndex: (e: DropResult) => void;
}
export const Table = ({ page, updateIndex }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const { project } = useContext(ProjectContext);
  const [props, setProps] = useState<Property[]>([]);
  useEffect(() => {
    if (project) {
      setProps([...project.properties, ...page.properties]);
    }
  }, [project, page]);
  return (
    <DragDropContext onDragEnd={updateIndex}>
      <Droppable droppableId={`${page.id}`}>
        {(provided, snapshot) => {
          return (
            // se eu deixar com w-min ele vai funcionar o tamanho da linha, mas quando tiver menas colunas ele nao vai preencher a linha
            <div
              className="h-full shadow-blur-10 w-full max-w-full overflow-y-auto"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <table key={page.id} className="w-min flex-nowrap min-w-full">
                <thead className=" bg-white dark:bg-modal-grey sticky -top-0 left-0 shadow-blur-10 w-full ">
                  <tr className="w-full">
                    <th className=" bg-white min-w-[14rem] dark:bg-modal-grey border-zinc-400 w-min dark:border-zinc-600 border-b-2">
                      <HeaderList name={"Tasks"} />
                    </th>
                    {props.map((p) => (
                      <th
                        key={p.id}
                        className=" bg-white min-w-[14rem] dark:bg-modal-grey border-zinc-400 w-min dark:border-zinc-600 border-b-2"
                      >
                          <HeaderList name={p.name} p={p} />
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="shadow-blur-10 overflow-y-auto h-full w-full">
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
                              <tr
                              className="bg-white dark:bg-modal-grey flexhover:brightness-95 w-full"
                                {...providedDrag.draggableProps}
                                {...providedDrag.dragHandleProps}
                                ref={providedDrag.innerRef}
                                style={snapshot.isDragging ?
                                    { ...providedDrag.draggableProps.style, filter: "brightness(90%)", position:"absolute", top:0, left:0} :
                                    { ...providedDrag.draggableProps.style }}
                              >
                                <td className=" bg-white dark:bg-modal-grey border-zinc-400  dark:border-zinc-600 border-y-[1px] w-full">
                                  <ValueSelector l={l} justName={true} />
                                </td>
                                {props.map((p, index) => {
                                  return (
                                    <td
                                      key={index}
                                      className=" bg-white dark:bg-modal-grey border-zinc-400 w-full dark:border-zinc-600 border-y-[1px] "
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
                                    </td>
                                  );
                                })}
                              </tr>
                            );
                          }}
                        </Draggable>
                      );
                    })}
                  {provided.placeholder}
                </tbody>
              </table>
            </div>
          );
        }}
      </Droppable>
    </DragDropContext>
  );
};
