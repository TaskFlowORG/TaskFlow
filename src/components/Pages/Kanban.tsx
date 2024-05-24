/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { RoundedCard } from "@/components/RoundedCard";
import { ColumnKanban } from "@/components/ColumnKanban/ColumnKanban";
import { SearchBar, SearchInput } from "@/components/SearchBar";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { OrderInput } from "@/components/OrderInput/OrderInput";
import { FilterAdvancedInput } from "@/components/FilterAdvancedInput/FilterAdvancedInput";
import { FilteredProperty } from "@/types/FilteredProperty";
import { RegisterTaskModal } from "@/components/RegisterTaskModal";
import { pageService, projectService, taskService } from "@/services";
import {
  MultiOptionValued,
  Option,
  OrderedPage,
  Property,
  Select,
  TaskOrdered,
  PropertyValue,
  TypeOfProperty,
  UniOptionValued,
  Project,
  Task,
} from "@/models";
import { TaskModalContext } from "@/utils/TaskModalContext";
import { FilterContext } from "@/utils/FilterlistContext";
import { TaskModal } from "../TaskModal";

import { User } from "@/models/user/user/User";
import { ProjectContext } from "@/contexts";
import { updateIndexes } from "./functions/updateIndexes";
import { showTask } from "./functions";

type Props = {
  user: User;
  page: OrderedPage;
  project?: Project;
};

export const Kanban = ({ page, user }: Props) => {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState<TaskOrdered[]>([]);
  const [id, setId] = useState<number>(0);
  const [options, setOptions] = useState<Option[]>([]);
  const [filter, setFilter] = useState<FilteredProperty[]>([]);
  const [list, setList] = useState<FilteredProperty>();
  const { project, setProject } = useContext(ProjectContext);
  const context = useContext(FilterContext);
  const [taskMãe, setTaskMãe] = useState<Task | undefined>(undefined);


  const findDependences = () => {
    taskMãe?.dependencies.forEach(async (dep) => {
      let poxinha = await taskService.findDependencies(dep, page.id);
      dep.dependencies.forEach(async (dep2) => {
        let poxinha = await taskService.findDependencies(dep2, page.id);
      })
  })
}


  useEffect(() => {
    setTasks(
      (page.tasks as TaskOrdered[]).filter((task) => task.task.deleted == false)
    );
    console.log(tasks);
    setOptions((page.propertyOrdering as Select).options);
    setId(page.propertyOrdering.id);


  }, [page.tasks, project]);

  const [poxas, setPoxas] = useState<Task[]>([]);

  const { setSelectedTask, setIsOpen } = useContext(TaskModalContext);

  function openModal(task: TaskOrdered) {
    setIsOpen!(true);
    setSelectedTask!(task.task);
  }

  function separateNumbers(stringComHifen: string): [number, number] | null {
    const separatedNumbers = stringComHifen.split("-");
    if (separatedNumbers.length === 2) {
      const numberOne = parseInt(separatedNumbers[0], 10);
      const numberTwo = parseInt(separatedNumbers[1], 10);

      return [numberOne, numberTwo];
    } else {
      return null;
    }
  }

  function compareByIndex(a: TaskOrdered, b: TaskOrdered) {
    return a.indexAtColumn - b.indexAtColumn;
  }

  function indexAtColumn(tasks: TaskOrdered[]) {
    tasks.sort(compareByIndex);
    return tasks;
  }

  function findDragDestinationColumn(destination: any) {
    return options.find((option) => {
      return option.id == destination.droppableId;
    });
  }
  function findDraggedTask(taskId: number) {
    return tasks.find((task) => {
      return task.id == taskId;
    })!;
  }

  const handleCreateMuchThings = async () => {
    await projectService.findOne(project?.id!);
    const taskFodaPaCaramba = await taskService.insert(project?.id!, page.id);
    taskFodaPaCaramba.name = "sou quem tá na lista da que ta na lista";
    let taskReturned3 = await taskService.upDate(
      taskFodaPaCaramba,
      project?.id!
    );

    const taskFodona = await taskService.insert(project?.id!, page.id);
    taskFodona.name = "sou quem tá na lista";
    taskFodona.dependencies = [taskReturned3];

    let taskReturned2 = await taskService.upDate(taskFodona, project?.id!);

    const taskMãe = await taskService.insert(project?.id!, page.id);
    taskMãe.dependencies = [taskReturned2];
    let returned = await taskService.upDate(taskMãe, project?.id!);
    setTaskMãe(taskReturned3);
    let projectPromise2 = await projectService.findOne(project?.id!);
    setProject!(projectPromise2);

    taskMãe.dependencies.forEach(async (dep) => {
      let poxinha = await taskService.findDependencies(dep, page.id);
      console.log(poxinha);
      console.log("tE RETONRI EM CIMA");
      setPoxas(poxinha);
    });
    // poxas.filter(
    //   (pa, index) => poxas.findLastIndex((po) => pa.id == po.id) == index
    // );
    // let tasksTests = tasks;
    // console.log("la vai bomba");

    // console.log(
    //   tasksTests.filter((task) => !poxas.find((po) => po.id == task.id))
    // );
  };

  function findPropertyInTask(draggedTask: TaskOrdered) {
    return draggedTask?.task?.properties?.find((property) => {
      return property.property.id == id;
    })!;
  }

  function updateOptions(
    propertyInTask: PropertyValue,
    optionId: number,
    optionDestination: Option
  ) {
    return propertyInTask.value.value.filter((value: any) => {
      return value.id != optionId && value.id != optionDestination?.id;
    });
  }

  const onDragEnd = async (result: any) => {
    if (!result.destination) return;
    const { source, destination } = result;
    console.log(result.draggableId);

    const separatedNumbers = separateNumbers(result.draggableId);
    const [numberOne, numberTwo] = separatedNumbers!;
    let taskId = numberOne;
    let optionId = numberTwo;

    const optionDestination = findDragDestinationColumn(destination);
    const draggedTask: TaskOrdered = findDraggedTask(taskId!);
    const propertyInTask: PropertyValue = findPropertyInTask(draggedTask);

    if (
      [TypeOfProperty.CHECKBOX, TypeOfProperty.TAG].includes(
        propertyInTask.property.type
      )
    ) {
      const updatedOptions = updateOptions(
        propertyInTask,
        optionId,
        optionDestination!
      );
      propertyInTask.value.value =
        [...(updatedOptions ?? []), optionDestination] ?? null;
    } else {
      propertyInTask.value.value = optionDestination ?? null;
    }

    const updatePageAndTask = async () => {
      if (!project) return;
      try {
        if (draggedTask) {
          const taskReturned = await taskService.upDate(
            draggedTask.task,
            project?.id!
          );
          const indexTaskInPage = page.tasks.findIndex(
            (task) => task.id == taskReturned.id
          );
          page.tasks[indexTaskInPage].task = taskReturned;
          const indexPage = project!.pages.findIndex(
            (pageP) => pageP.id == page.id
          );
          project!.pages[indexPage] = page;
          setProject!({ ...project });
        }
      } catch (e) {}
    };
    await updatePageAndTask();
    updateIndexes(result, tasks, setTasks, project);
  };

  return (
    <FilterContext.Provider
      value={{
        filterProp: filter,
        setFilterProp: setFilter,
        list,
        setList: setList,
        input: input,
        setInput: setInput,
      }}
    >
      <div className="w-full h-full mt-[5em] flex flex-col dark:bg-back-grey">
        <div
          className="absolute top-1/2 left-1/2 bg-primary w-1/5 h-1/5 "
          onClick={handleCreateMuchThings}
        ></div>
        {poxas.map((poxa, index) => {
          return <p key={index}>{poxa?.name}</p>;
        })}
        <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
          <div
            id="scrollKanban"
            // Da um salve nesse overflow-y-auto aí mano
            className="flex gap-8 justify-start bah flex-row pl-3 w-[90%] md:w-[750px] lg:w-[950px] xl:w-[1150px] 1.5xl:w-[1360px] 2xl:w-[1560px]  h-full mb-6 overflow-x-auto  self-center"
          >
            {options?.map((option) => {
              return (
                <ColumnKanban
                  user={user}
                  allTasks={tasks}
                  input={input}
                  openModal={openModal}
                  key={`${option.id}`}
                  tasks={indexAtColumn(
                    tasks.filter((task) => {
                      return task?.task?.properties?.some((property) => {
                        return (
                          (property.property.id == id &&
                            (property.value as UniOptionValued).value?.id ==
                              option?.id) ||
                          ((property.property.type ===
                            TypeOfProperty.CHECKBOX ||
                            property.property.type === TypeOfProperty.TAG) &&
                            (property.value as MultiOptionValued).value.find(
                              (value: Option) => value?.id == option?.id
                            ))
                        );
                      });
                    })
                  )}
                  propertyId={id}
                  color={option.color}
                  option={option}
                  verify={true}
                />
              );
            })}
            {
              <ColumnKanban
                user={user}
                allTasks={tasks}
                key={0}
                openModal={openModal}
                input={input}
                tasks={tasks.filter((task) => {
                  return task?.task?.properties?.some((property) => {
                    return (
                      (property.property.id == id &&
                        (property.value as UniOptionValued).value == null) ||
                      (property.property.id == id &&
                        [TypeOfProperty.CHECKBOX, TypeOfProperty.TAG].includes(
                          property.property.type
                        ) &&
                        (property.value as MultiOptionValued).value.length == 0)
                    );
                  });
                })}
                propertyId={id}
                color="#767867"
                option={new Option("Não Marcadas", "#767867", 0)}
              />
            }
          </div>
        </DragDropContext>
      </div>
    </FilterContext.Provider>
  );
};
