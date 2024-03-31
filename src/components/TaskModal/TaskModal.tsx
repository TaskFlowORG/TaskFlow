"use client";

import { useEffect, useState } from "react";
import { CenterModal } from "../Modal";
import { Comment } from "./index";
import axios from "axios";
import { Message, Select, TaskOrdered, TypeOfProperty, Option } from "@/models";
import { Select as Selectt } from "@/components/Select";
import { UserGet } from "@/models/user/user/UserGetDTO";
import { taskService } from "@/services";
import { MessageGet } from "@/models/chat/message/MessageGetDTO";
import {
  CheckboxProp,
  NumberProp,
  SelectProp,
  SwitchIcon,
  TagProp,
} from "./PropertyTask";
import { DateProp } from "./PropertyTask/DateProp";
import { RadioProp } from "./PropertyTask/RadioProp";
import { FilterContext } from "@/utils/FilterlistContext";
import { FilteredProperty } from "@/types/FilteredProperty";
import { NumberFilter } from "../FilterAdvancedInput/NumberFilter";
import { DateFilter } from "../FilterAdvancedInput/DateFilter";
import { RadioFilter } from "../FilterAdvancedInput/RadioFilter";
import { CheckboxFilter } from "../FilterAdvancedInput/CheckboxFilter";
import { TagFilter } from "../FilterAdvancedInput/TagFilter";
import { TaskValueGet } from "@/models/relations/task-value/TaskValueGetDTO";
import { ProgressFilter } from "../FilterAdvancedInput/ProgressFilter";
import { IconsSelector } from "../Pages/components";
import { Button } from "../Button";

type isOpenBro = {
  isOpen: boolean;
  setIsOpen: (boolean: boolean) => void;
  task: TaskOrdered;
  user: UserGet;
};

export const TaskModal = ({ setIsOpen, isOpen, task, user }: isOpenBro) => {
  const [filter, setFilter] = useState<FilteredProperty[]>([]);
  const [list, setList] = useState<FilteredProperty | null>();
  const [input, setInput] = useState("");
  // const [url, setUrl] = useState("");
  // async function findImage() {
  //   let bah = await (await axios.get("http://localhost:9999/aws/1")).data;
  //   setUrl(bah);
  // }

  useEffect(() => {
    const allProperties = task?.task.properties;
  }, []);

  console.log(filter);
  // console.log(list);

  async function updateTask() {
    filter.forEach(async (value) => {
      let updateProp =
        task?.task?.properties?.find((prop) => prop.property.id == value.id) ??
        null;
      if (updateProp) {
        if (
          [TypeOfProperty.SELECT, TypeOfProperty.RADIO].includes(
            updateProp.property.type
          )
        ) {
          if (value.value != "oi") {
            let updatedValue = (updateProp.property as Select).options.find(
              (option) => value.value == option.name
            );
            updateProp.value.value = updatedValue;
          } else {
            updateProp.value.value = [];
          }
        } else if (
          [TypeOfProperty.CHECKBOX, TypeOfProperty.TAG].includes(
            updateProp.property.type
          )
        ) {
          console.log(value.value);
          // let updatedValue = (updateProp.property as Select).options.filter(
          //   (value2) => value.value.find((value3: any) => value2 == value3)
          // );
          // updateProp.value.value = updatedValue;
          let updatedValue = (updateProp.property as Select).options.filter(
            (option) => value.value.includes(option.name)
          );
          updateProp.value.value = updatedValue;
        } else if (TypeOfProperty.DATE == updateProp.property.type) {
          console.log(value);
          let hours = new Date().getHours();
          let minutes = new Date().getMinutes();
          updateProp.value.value = value.value + "T" + hours + ":" + minutes;
        } else {
          updateProp.value.value = value.value;
        }

        await taskService.upDate(task.task);
        console.log(updateProp);
      }
    });
    setList(undefined);
    setFilter([]);
  }

  function change(prop: TaskValueGet): boolean {
    if (!filter.find((value) => prop.id == value.id)) {
      filter.push({
        id: prop.property.id,
        value: prop.value.value.map((option: any) => option.name),
      });
    }
    return true;
  }

  async function sendComment() {
    let comment: MessageGet = {
      sender: user,
      value: input,
    };
    task.task.comments.push(comment);
    await taskService.upDate(task.task);
    setInput("");
  }
  return (
    <CenterModal
      stylesTailwind={"w-[1306px] shadow-blur-10 p-12"}
      condition={isOpen}
      setCondition={setIsOpen}
    >
      <div className="flex gap-[102px]  w-full h-full">
        <div className="flex flex-col gap-12 w-[453px]">
          <h3 className="h3 whitespace-nowrap">
            {task?.task.name ?? "Sem nome"}
          </h3>
          <div className="flex flex-col w-full gap-6">
            <div className="flex gap-0 w-full">
              <button className="w-full  flex items-center gap-4  px-4 py-1 bg-primary rounded-t-lg">
                <div className="w-4 h-4 rounded-full bg-white"></div>
                <p className="h4 text-white ">Comentários</p>
              </button>
              <button className="w-full flex items-center gap-4 border-2  px-4 py-1 bg-white rounded-r-lg">
                <div className="w-4 h-4 rounded-full bg-white"></div>
                <p className="h4 text-[#343434] ">Histórico</p>
              </button>
            </div>
            <div className=" flex flex-col gap-6">
              <div className="flex flex-col gap-6 max-h-[442px] overflow-auto pr-8 bah">
                {task?.task.comments.map((comment, index) => {
                  return (
                    <Comment
                      user={user}
                      sender={comment.sender}
                      value={comment.value}
                      date={comment.dateCreate!.toString()}
                      key={index}
                    ></Comment>
                  );
                })}
              </div>
              <div className="flex gap-6">
                <input
                  type="text"
                  value={input}
                  className="text-[14px] border-[#d7d7d7] border-[1px] shadow-comment bg-[#f2f2f2] flex-1 font-montserrat px-3 py-[10px] rounded-lg"
                  placeholder="Escreva o comentário"
                  onChange={(e) => setInput(e.target.value)}
                />
                <div
                  className="h-full items-center flex justify-center aspect-square rounded-lg bg-primary"
                  onClick={sendComment}
                >
                  <img src="/send.svg" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" w-[2px] min-h-full bg-[#F2F2F2]"></div>
        <div className="w-full max-w-[547px] ">
          {/* bg-black */}
          <div className="flex flex-col gap-5 max-h-[450px] overflow-auto bah pr-4   w-full">
            {task?.task.properties.map((prop) => {
              const propert = filter!.find(
                (propert) => propert.id == prop.id
              ) ?? {
                value: null,
              };
              return (
                <div
                  key={prop.id}
                  className="bg-white dark:bg-modal-grey flex flex-col"
                >
                  <div className="flex gap-8 w-full items-center">
                    <img src="/config.svg" alt="" />
                    {/* <span>C</span> */}
                    <FilterContext.Provider
                      value={{
                        filterProp: filter,
                        setFilterProp: setFilter,
                        list: list ?? undefined,
                        setList: setList,
                      }}
                    >
                      <div className="flex flex-col justify-center  gap-2 flex-1">
                        <div className="flex-1 flex items-center   justify-between ">
                          <div className="flex gap-3">
                            <IconsSelector property={prop.property} />
                            <p className="font-montserrat text-[16px] whitespace-nowrap">
                              {prop.property.name}
                            </p>
                          </div>
                          {([
                            TypeOfProperty.SELECT,
                            TypeOfProperty.ARCHIVE,
                            TypeOfProperty.DATE,
                            TypeOfProperty.NUMBER,
                            TypeOfProperty.PROGRESS,
                          ].includes(prop.property.type) &&
                            TypeOfProperty.SELECT == prop.property.type && (
                              <Selectt
                                isInModal
                                name={prop.property.name}
                                ids={prop.property.id}
                                options={(prop.property as Select).options.map(
                                  (option) => option.name
                                )}
                                value={prop.value.value?.name}
                              />
                            )) ||
                            (TypeOfProperty.NUMBER == prop.property.type && (
                              <NumberFilter
                                isInModal
                                id={prop.property.id}
                                name={prop.property.name}
                                value={prop.value.value}
                              />
                            )) ||
                            (TypeOfProperty.PROGRESS == prop.property.type && (
                              <ProgressFilter
                                percent={22}
                                isInModal
                                id={prop.property.id}
                                name={prop.property.name}
                                value={prop.value.value}
                              />
                            )) ||
                            (TypeOfProperty.PROGRESS == prop.property.type && (
                              <RadioFilter
                                isInModal
                                name={prop.property.name}
                                id={prop.property.id}
                                options={(prop.property as Select).options}
                                value={prop.value.value?.name ?? "oi"}
                              />
                            )) ||
                            (TypeOfProperty.DATE == prop.property.type && (
                              <DateFilter
                                isInModal
                                id={prop.property.id}
                                name={prop.property.name}
                                value={prop.value.value ?? ""}
                              />
                            ))}
                        </div>
                        {([
                          TypeOfProperty.CHECKBOX,
                          TypeOfProperty.TAG,
                          TypeOfProperty.RADIO,
                        ].includes(prop.property.type) &&
                          TypeOfProperty.RADIO == prop.property.type && (
                            <RadioFilter
                              isInModal
                              name={prop.property.name}
                              id={prop.property.id}
                              options={(prop.property as Select).options}
                              value={prop.value.value?.name ?? "oi"}
                            />
                          )) ||
                          (prop.property.type == TypeOfProperty.CHECKBOX &&
                            change(prop) && (
                              <CheckboxFilter
                                isInModal
                                name={prop.property.name}
                                options={(prop.property as Select).options}
                                id={prop.property.id}
                                value={propert.value ?? []}
                              />
                            )) ||
                          (prop.property.type == TypeOfProperty.TAG && (
                            <TagFilter
                              id={prop.property.id}
                              name={prop.property.name}
                              addList={() => console.log("a")}
                              removeList={(value: string) => {
                                if (list) {
                                  const thisProperty = filter.find(
                                    (item) => item.id == list.id
                                  )!;
                                  if (list?.value.includes(value)) {
                                    list.value.splice(
                                      list.value.indexOf(value),
                                      1
                                    );
                                    if (list.value.length == 0) {
                                      filter.splice(
                                        filter.indexOf(thisProperty),
                                        1
                                      );
                                      setFilter!(filter);
                                    }
                                    setList!(list);
                                  } else {
                                    list?.value.push(value);
                                    filter.splice(
                                      filter.indexOf(thisProperty),
                                      1
                                    );
                                    setFilter!(filter);
                                    setFilter!([list!, ...filter]);
                                    setList!(list);
                                  }
                                } else {
                                  setList!({
                                    id: prop.property.id,
                                    value: [value],
                                  });
                                  setFilter!([
                                    { id: prop.property.id, value: [value] },
                                    ...filter,
                                  ]);
                                }
                              }}
                              options={(prop.property as Select).options}
                              value={propert.value ?? []}
                            />
                          ))}
                      </div>
                    </FilterContext.Provider>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex gap-4 justify-end items-center">
            <Button
              font="font-alata"
              textSize="text-base"
              text="Cancelar"
              secondary={true}
              fnButton={() => {
                setList(undefined);
                setFilter([]);
              }}
              paddingY="py-1  "
              padding="p-4"
            />
            <Button
              font="font-alata"
              textSize="text-base"
              text="Salvar alterações"
              fnButton={updateTask}
              paddingY="py-1"
              padding="p-4"
            />
          </div>
        </div>
      </div>

      <button onClick={() => setIsOpen(false)}>X</button>
    </CenterModal>
  );
};
