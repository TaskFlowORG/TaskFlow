"use client";

import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import { Page, Property, Task, TaskOrdered } from "@/models";
import { ValueSelector } from "..";
import { useEffect, WheelEvent, useRef, useState, useContext } from "react";
import { PageTypeIcons } from "../../../icons";
import { HeaderList } from "./HeaderList";
import { pageService } from "@/services";
import { ProjectContext } from "@/contexts";
import { updateIndexes } from "../../functions/updateIndexes";
import { TaskModalContext } from "@/utils/TaskModalContext";
import { useHasPermission } from "@/hooks/useHasPermission";

interface Props {
  list: Array<TaskOrdered>;
  page: Page;
}

export const List = ({ list:listPrev, page }: Props) => {

  const [list, setList] = useState<Array<TaskOrdered>>(listPrev.sort((a, b) => a.indexAtColumn - b.indexAtColumn));
  const {project} = useContext(ProjectContext)
  const {setSelectedTask, setIsOpen} = useContext(TaskModalContext)

  const openModal = (id:number) => {
    if(!setIsOpen || !setSelectedTask) return
    const task: Task | undefined = list.find(l => l.task.id == id)?.task
    if(!task) return
    setIsOpen(true)
    setSelectedTask(task)
  }

  const permission = useHasPermission("update")


  return (
    <div
      key={page.id}
      className=" min-w-[16rem] w-full max-w-[24rem] h-full p-2 px-6  bg-white dark:bg-modal-grey flex flex-col items-center rounded-sm truncate shadow-blur-10  ">
      <HeaderList page={page} name={page.name} />
      <DragDropContext
        key={page.id}
        onDragEnd={e => updateIndexes(e, list, setList, project)}
      >
        <Droppable droppableId={`${page.id}`} >
          {(provided, snapshot) => {
            return (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={"h-5/6 none-scrollbar w-full overflow-y-auto "}
                
              >
                <div className="w-full relative h-min gap-1 flex flex-col">

                  {list
                    .map((l, index) => {
                      return (
                        <Draggable
                          draggableId={`${l.id}`}
                          index={index}
                          key={index}
                          isDragDisabled={!permission}
                        >
                          {(providedDrag, snapshot) => {
                            return (
                                <div
                                  key={l.id}

                                  className={"bg-white dark:bg-modal-grey block   border-b-2 w-full " + 
                                  (l.task.completed || l.task.waitingRevision ? " border-green-500 border-2" : " border-zinc-400 dark:border-zinc-600 ") + (l.task.waitingRevision ? " animation-delay-1000 animate-border-pulser " : "")

                                  }
                                  {...providedDrag.draggableProps}
                                  {...providedDrag.dragHandleProps}
                                  ref={providedDrag.innerRef}
                                  onClick={e => openModal(l.task.id)}
                                >
                                  <ValueSelector l={l} justName={true} />
                                </div>
                            );
                          }}
                        </Draggable>
                      );
                    })}
                  {provided.placeholder}
                </div>
              </div>
            );
          }}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
