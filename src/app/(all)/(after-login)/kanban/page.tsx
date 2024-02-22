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
import { pageService, taskService } from "@/services";
import {
  MultiOptionValued,
  Option,
  OrderedPage,
  Property,
  Select,
  TaskOrdered,
  TaskValue,
  TypeOfProperty,
  UniOptionValued,
} from "@/models";

//================================ Parte do Becker (Modal Cadastro Tarefa) ===============================
const property1 = new Property(
  1,
  "Propriedade1",
  true,
  false,
  TypeOfProperty.TEXT
);
const property2 = new Property(
  2,
  "Propriedade2",
  false,
  true,
  TypeOfProperty.NUMBER
);
//const property3 = new Property(3, "Propriedade3", true, true, TypeOfProperty.RADIO);
const property4 = new Property(
  4,
  "Propriedade4",
  true,
  true,
  TypeOfProperty.DATE
);
const property5 = new Property(
  5,
  "Propriedade5",
  true,
  true,
  TypeOfProperty.PROGRESS
);

const list: Array<Property> = [];

list.push(property1, property2, property4, property5);
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
      setTasks(pg.tasks as TaskOrdered[]);
      setOptions((pg.propertyOrdering as Select).options);
      setId(pg.propertyOrdering.id);
      setPage(pg);
    })();
  });

  function separarNumeros(stringComHifen: string): [number, number] | null {
    // Divide a string usando o caractere hífen como separador
    const numerosSeparados = stringComHifen.split("-");

    // Verifica se a string foi dividida em dois números
    if (numerosSeparados.length === 2) {
      // Converte os números de string para números inteiros
      const numero1 = parseInt(numerosSeparados[0], 10);
      const numero2 = parseInt(numerosSeparados[1], 10);

      // Retorna os números separados em uma tupla
      return [numero1, numero2];
    } else {
      // Retorna null se a string não estiver no formato esperado
      return null;
    }
  }

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

    const numerosSeparados = separarNumeros(result.draggableId);

    let taskId: number;
    let optionid: number;
    if (numerosSeparados) {
      const [numero1, numero2] = numerosSeparados;
      // // console.log("Número 1:", numero1); // Saída: 12
      // // console.log("Número 2:", numero2);
      taskId = numero1;
      optionid = numero2; // Saída: 23
    } else {
      // // console.log("A string não está no formato esperado.");
    }

    const optionOrder = options.find((option) => {
      return option.id == destination.droppableId;
    });

    const draggedTask: TaskOrdered = tasks.find((task) => {
      return task.id == taskId;
    })!;

    const property: TaskValue = draggedTask?.task?.properties?.find(
      (property) => {
        return property.property.id == id;
      }
    )!;

    if (
      [TypeOfProperty.CHECKBOX, TypeOfProperty.TAG].includes(
        property.property.type
      )
    ) {
      const newArray = property.value.value.filter((value: any) => {
        return value.id != optionid && value.id != optionOrder!.id;
      });
      // // console.log(newArray);
      property.value.value = [...(newArray ?? []), optionOrder] ?? null;
    } else {
      property.value.value = optionOrder ?? null;
    }

    if (draggedTask) {
      try {
        (async () => {
          // // console.log(draggedTask.task);
          await taskService.upDate(draggedTask.task);
        })();
      } catch (e) {}
    }

    const updatePage = async () => {
      try {
        await pageService.updateIndexesKanban(
          page!,
          draggedTask?.task?.id,
          destination.index,
          destination.droppableId != source.droppableId ? 1 : 0
        );
      } catch (e) {}
    };
    updatePage();
  };

  return (
    <div className="w-full h-full mt-[5em] flex flex-col dark:bg-back-grey">
      <RegisterTaskModal
        open={modal}
        close={() => setModal(false)}
        listInputs={list}
      />
      <div className="flex gap-5 items-end pb-16 justify-center relative   h-max">
        <h1
          className="h1 text-primary whitespace-nowrap dark:text-white"
          onClick={() => console.log(page)}
        >
          {page?.name}
        </h1>
        <div
          className=" flex items-center justify-center h-9 w-9 rounded-full shadowww mb-4 cursor-pointer "
          onClick={() => setModal(true)}
        >
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
          propsFiltered={filterProp}
            filterProps={(listx) => {
              // // console.log(listx);
              setFilterProp(listx);
            }}
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
                      // // // console.log(TypeOfProperty.CHECKBOX);
                      return (
                        (property.property.id == id &&
                          (property.value as UniOptionValued).value?.id ==
                            option?.id) ||
                        (property.property.type === TypeOfProperty.CHECKBOX &&
                          (property.value as MultiOptionValued).value.find(
                            (value) => value.id == option.id
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
              propsFiltered={filterProp}
              key={0}
              input={input}
              tasks={tasks.filter((task) => {
                return task?.task?.properties?.some((property) => {
                  // // // console.log(option,(property.value as UniOptionValued).value?.name )
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
              option={new Option(0, "Não Marcadas", "#767867")}
            />
          }
        </div>
      </DragDropContext>
    </div>
  );
}
