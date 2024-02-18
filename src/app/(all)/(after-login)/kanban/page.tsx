/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { RoundedCard } from "@/components/RoundedCard";
import { ColumnKanban } from "@/components/ColumnKanban/ColumnKanban";
import { SearchBar } from "@/components/SearchBar";
import { useEffect } from "react";
import { getData, getListData, getPage, putData } from "@/services/http/api";
import { useState } from "react";
import { OrderInput } from "@/components/OrderInput/OrderInput";
import { FilterAdvancedInput } from "@/components/FilterAdvancedInput/FilterAdvancedInput";
import { FilteredProperty } from "@/types/FilteredProperty";
import { RegisterTaskModal } from "@/components/RegisterTaskModal";
import { MultiOptionValued, Option, OrderedPage, Property,Select,TaskOrdered,TaskValue,TypeOfProperty, UniOptionValued } from "@/models";

//================================ Parte do Becker (Modal Cadastro Tarefa) ===============================
const property1 = new Property(1, "Propriedade1", true, false, TypeOfProperty.TEXT,);
const property2 = new Property(2, "Propriedade2", false, true, TypeOfProperty.NUMBER);
//const property3 = new Property(3, "Propriedade3", true, true, TypeOfProperty.RADIO);
const property4 = new Property(4, "Propriedade4", true, true, TypeOfProperty.DATE);
const property5 = new Property(5, "Propriedade5", true, true, TypeOfProperty.PROGRESS);

const list : Array<Property> = [];

list.push(property1,property2,property4, property5);
//==========================================================================================================

export default function Kanban() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState<TaskOrdered[]>([]);
  const [id, setId] = useState<number>(0);
  const [options, setOptions] = useState<Option[]>([]);
  const [modal, setModal] = useState(false);
  const [page, setPage] = useState<OrderedPage | null>(null);
  const [filterProp, setFilterProp] = useState<FilteredProperty[]>([]);

  useEffect(() => {
    (async () => {
      const pg: OrderedPage = await getPage("page", 1);
      setTasks((pg.tasks as TaskOrdered[]));
      setOptions((pg.propertyOrdering as Select).options);
      setId(pg.propertyOrdering.id);
      setPage(pg);
    })();
  });

  function compararPorIndice(a: TaskOrdered, b: TaskOrdered) {
    return a.indexAtColumn - b.indexAtColumn;
  }

  function indexAtColumn(tasks: TaskOrdered[]) {
    tasks.sort(compararPorIndice);
    return tasks;
  }

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const { source, destination } = result;

    const optionOrder = options.find((option) => {
      return option.id == destination.droppableId;
    });

    const draggedTask: TaskOrdered = tasks.find((task) => {
      return task.id == result.draggableId;
    })!;

    const property: TaskValue = draggedTask?.task?.properties?.find(
      (property) => {
        return property.property.id == id;
      }
    )!;

    property.value.getValue().equals(optionOrder) ?? null;

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
            page={page as OrderedPage}
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
                        //se der algo errado, dar uma olhada nessa condição
                        ((property.value instanceof UniOptionValued &&
                        property.value?.value?.id == option?.id) || 
                        (property.value instanceof MultiOptionValued &&
                          property.value?.value?.find((val:Option) => val.id == option.id) != undefined))
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
