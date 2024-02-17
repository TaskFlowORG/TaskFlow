/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { RoundedCard } from "@/components/RoundedCard";
import { ColumnKanban } from "@/components/ColumnKanban/ColumnKanban";
import { SearchBar } from "@/components/SearchBar";
import { useEffect } from "react";
import { getData, getListData, getPage, putData } from "@/services/http/api";
import { useState } from "react";
import { Page } from "@/model/pages/Page";
import { CommonPage } from "@/model/pages/CommonPage";
import { Select } from "@/model/Properties/Select";
import { Option } from "@/model/Properties/Option";
import { UniOptionValued } from "@/model/values/UniPotionValued";
import { TaskValue } from "@/model/relations/TaskValue";
import { TypeOfProperty } from "@/model/enums/TypeOfProperty";
import { TextValued } from "@/model/values/TextValued";
import { TaskCanvas } from "@/model/relations/TaskCanvas";
import { MultiOptionValued } from "@/model/values/MultiOptionValued";
import { ArchiveValued } from "@/model/values/ArchiveValued";
import { NumberValued } from "@/model/values/NumberValued";
import { TimeValued } from "@/model/values/TimeValued";
import { OrderInput } from "@/components/OrderInput/OrderInput";
import { Property } from "@/model/Properties/Property";
import { FilterAdvancedInput } from "@/components/FilterAdvancedInput/FilterAdvancedInput";
import { FilteredProperty } from "@/types/FilteredProperty";
import { RegisterTaskModal } from "@/components/RegisterTaskModal";
import { Project } from "@/model/Project";
import { User } from "@/model/User";

//================================ Parte do Becker (Modal Cadastro Tarefa) ===============================
const property1 = new Property(1, "Propriedade1", true, false, TypeOfProperty.TEXT, [], new Project(1,"a","asas",new Date(),new Date,"a",null,null,null,null));
const property2 = new Property(2, "Propriedade2", false, true, TypeOfProperty.NUMBER, [], new Project(1,"a","asas",new Date(),new Date,"a",null,null,null,null));
//const property3 = new Property(3, "Propriedade3", true, true, TypeOfProperty.RADIO, [], new Project(1,"a","asas",new Date(),new Date,"a",null,null,null,null));
const property4 = new Property(4, "Propriedade4", true, true, TypeOfProperty.DATE, [], new Project(1,"a","asas",new Date(),new Date,"a",null,null,null,null));
const property5 = new Property(5, "Propriedade5", true, true, TypeOfProperty.PROGRESS, [], new Project(1,"a","asas",new Date(),new Date,"a",null,null,null,null));

const list : Array<Property> = [];

list.push(property1,property2,property4, property5);
//==========================================================================================================

export default function Kanban() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState<TaskCanvas[]>([]);
  const [id, setId] = useState<number>(0);
  const [options, setOptions] = useState<Option[]>([]);
  const [page, setPage] = useState<CommonPage | null>(null);
  const [filterProp, setFilterProp] = useState<FilteredProperty[]>([]);

  useEffect(() => {
    (async () => {
      const pg: CommonPage = await getPage("page", 1);
      pg.project = await getData("project", 1);
      setTasks(pg.tasks);
      setOptions((pg.propertyOrdering as Select).options);
      setId(pg.propertyOrdering.id);
      setPage(pg);
    })();
  });

  function compararPorIndice(a: TaskCanvas, b: TaskCanvas) {
    return a.indexAtColumn - b.indexAtColumn;
  }

  function indexAtColumn(tasks: TaskCanvas[]) {
    tasks.sort(compararPorIndice);
    return tasks;
  }

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const { source, destination } = result;

    const optionOrder = options.find((option) => {
      return option.id == destination.droppableId;
    });

    const draggedTask: TaskCanvas = tasks.find((task) => {
      return task.id == result.draggableId;
    })!;

    const property: TaskValue = draggedTask?.task?.properties?.find(
      (property) => {
        return property.property.id == id;
      }
    )!;

    property.value.value = optionOrder ?? null;

    if (draggedTask) {
      try {
        (async () => {
          await putData("task", draggedTask.task);
        })();
      } catch (e) {}
    }

    const updatePage = async () => {
      try {
        await putData(
          `page/${draggedTask?.task?.id}/${destination.index}/${
            destination.droppableId != source.droppableId ? 1 : 0
          }`,
          page
        );
      } catch (e) {}
    };
    updatePage();
  };

  return (
    <div className="w-full h-full mt-[5em] flex flex-col dark:bg-back-grey">
      <RegisterTaskModal open={modal} close={() => setModal(false)} listInputs={list} />
      <div className="flex gap-5 items-end pb-16 justify-center relative   h-max">
        <h1
          className="h1 text-primary whitespace-nowrap dark:text-white"
          onClick={() => console.log(page)}
        >
          {page?.name}
        </h1>
          <div className=" flex items-center justify-center h-9 w-9 rounded-full shadowww mb-4 cursor-pointer " onClick={() => setModal(true)}>
            <p className="p text-primary text-4xl h-min w-min">+</p>
          </div>
        <SearchBar
          order={() => console.log("Ordering")}
          filter={() => console.log("Filtering")}
          search={(textInput: string) => setInput(textInput)}
        >
          <OrderInput
            page={page as CommonPage}
            orderingId={id}
            propertiesPage={page?.properties ?? []}
          ></OrderInput>
          <FilterAdvancedInput
            filterProps={(list) => setFilterProp(list)}
            orderingId={page?.propertyOrdering.id}
            page={page}
            properties={page?.properties as Property[]}
          />
        </SearchBar>
      </div>
      <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
        <div className="flex gap-8 justify-center w-full">
          {options.map((option) => {
            return (
              <ColumnKanban
                propsFiltered={filterProp}
                input={input}
                key={`${option.id}`}
                tasks={indexAtColumn(
                  tasks.filter((task) => {
                    return task?.task?.properties?.some((property) => {
                      return (
                        property.property.id == id &&
                        (property.value as UniOptionValued | MultiOptionValued)
                          .value?.id == option?.id
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
              propsFiltered={filterProp}
              key={0}
              input={input}
              tasks={tasks.filter((task) => {
                return task?.task?.properties?.some((property) => {
                  // console.log(option,(property.value as UniOptionValued).value?.name )
                  return (
                    property.property.id == id &&
                    (property.value as UniOptionValued).value == null
                  );
                });
              })}
              propertyId={id}
              color="#767867"
              option={new Option(0, "Não Marcadas", "#767867")}
            />
          }
        </div>
      </DragDropContext>
    </div>
  );
}
