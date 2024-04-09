"use client";

import { useContext, useEffect, useState } from "react";
import { CenterModal } from "../Modal";
import { Comment } from "./index";
import axios from "axios";
import {
  Message,
  Select,
  TaskOrdered,
  TypeOfProperty,
  Option,
  Task,
  User
} from "@/models";
import { Select as Selectt } from "@/components/Select";
import { taskService } from "@/services";
import { ProjectContext} from "@/contexts/ContextProject"
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
import { PropertyValue } from "@/models/relations/property-value/PropertyValue";
import { ProgressFilter } from "../FilterAdvancedInput/ProgressFilter";
import { IconsSelector } from "../Pages/components";
import { Button } from "../Button";
import { TextFilter } from "../FilterAdvancedInput/TextFilter";
import { useTranslation } from "next-i18next";

type isOpenBro = {
  isOpen: boolean;
  setIsOpen: (boolean: boolean) => void;
  task: Task;
  user: User;

};

export const TaskModal = ({ setIsOpen, isOpen, task, user }: isOpenBro) => {
  const [filter, setFilter] = useState<FilteredProperty[]>([]);
  const [list, setList] = useState<FilteredProperty | null>();
  const [input, setInput] = useState("");
  const [taskName, setTaskName] = useState("");
  const [commentsTask, setCommentsTask] = useState<Message[]>([]);
  // const [url, setUrl] = useState("");
  // async function findImage() {
  //   let bah = await (await axios.get("http://localhost:9999/aws/1")).data;
  //   setUrl(bah);
  // }
  const {project} = useContext(ProjectContext)

  // console.log(filter);
  // console.log(list);


  function arraysAreEqual(arr1:any, arr2:any) {
    // Se os comprimentos dos arrays forem diferentes, eles são definitivamente diferentes
    if (arr1.length !== arr2.length) {
      return false;
    }
    
    // Verifica cada elemento dos arrays
    for (let i = 0; i < arr1.length; i++) {
      // Se um elemento for diferente em qualquer posição, os arrays são diferentes
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
    
    // Se chegarmos até aqui, os arrays são iguais
    return true;
  }







  useEffect(() => {
    setList(undefined);
    setFilter([]);
  }, []);

  useEffect(() => {
    setTaskName(task?.name ?? "");

  }, [task?.name]);

useEffect(() => {
  setCommentsTask((prevComments) => {
    const newComments = task?.comments ?? [];
    if (!arraysAreEqual(prevComments, newComments)) {
      return newComments;
    }
    return prevComments;
  });
}, [task?.comments, deleteComment, updateComment]);


  async function updateNameTask(e: any) {
    task.name = e.target.value;
    setTaskName(e.target.value);
    await taskService.upDate(task);
  }

  async function updateTask() {
    console.log(filter);
    filter.forEach(async (value) => {
      let updateProp =
        task?.properties?.find((prop) => prop.property.id == value.id) ?? null;
      console.log(updateProp?.value);
      if (updateProp) {
        if (
          [TypeOfProperty.SELECT, TypeOfProperty.RADIO].includes(
            updateProp.property.type
          )
        ) {
          if (value.value != "244a271c-ab15-4620-b4e2-a24c92fe4042") {
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
          // console.log(value.value);
          // let updatedValue = (updateProp.property as Select).options.filter(
          //   (value2) => value.value.find((value3: any) => value2 == value3)
          // );
          // updateProp.value.value = updatedValue;
          let updatedValue = (updateProp.property as Select).options.filter(
            (option) => value.value?.includes(option.name)
          );
          console.log("Sou o valor atualizado");
          
          console.log(updatedValue)
          // console.log(updatedValue);
          updateProp.value.value = updatedValue;
          // console.log(updateProp);
          // await taskService.upDate(task);
        } else if (TypeOfProperty.DATE == updateProp.property.type) {
          console.log(value);
          let hours = new Date().getHours();
          let minutes = new Date().getMinutes();
          updateProp.value.value =
            value.value +
            "T" +
            ((hours as number) < 10 ? "0" + hours : hours) +
            ":" +
            ((minutes as number) < 10 ? "0" + minutes : minutes);
          console.log(updateProp.value.value);
        } else {
          updateProp.value.value = value.value;
        }
      }
    });
    await taskService.upDate(task);
    console.log(task);

    setList(undefined);
    setFilter([]);
  }

  async function deleteTask() {
    taskService.delete(task.id, "jonatas");
    setIsOpen(false);
  }

  function change(prop: PropertyValue): boolean {
    if (!filter.find((value) => prop.id == value.id)) {
      filter.push({
        id: prop.property.id,
        value: prop.value.value?.map((option: any) => option.name),
      });
    }
    return true;
  }
  async function updateComment(commentId: number, updatedValue: string) {
    let comment = task.comments[commentId];
    if (comment) {
      comment.value = updatedValue;
      comment.dateUpdate = new Date();
      console.log(updatedValue);
      console.log(task);
      let taskUpdated = await taskService.upDate(task);
      setCommentsTask(taskUpdated.comments);
    }
  }

  async function deleteComment(commentId: number) {
    let comment = task.comments[commentId];
    if (comment) {
      task.comments.splice(task.comments.indexOf(comment), 1);
      let taskUpdated = await taskService.upDate(task);
      setCommentsTask(taskUpdated.comments);
    }
  }

  async function sendComment() {
    let comment: Message = {
      sender: user,
      value: input,
      dateCreate: new Date(),
    };

    if (task.comments) {
      task.comments.push(comment);
    } else {
      task.comments = [comment];
    }

    await taskService.upDate(task);
    setInput("");
  }
  const {t} = useTranslation();

  return (
    <CenterModal
      stylesTailwind={"w-[1306px] shadow-blur-10 p-12"}
      condition={isOpen}
      setCondition={() => {
        setIsOpen(false);
      }}
    >
      <div className="flex gap-[102px]  w-full h-full">
        <div className="flex flex-col gap-12 w-[453px]">
          <div className="flex gap-4 items-center">
            <input
              className="h3 whitespace-nowrap bg-white outline-none"
              placeholder={t("withoutname")}
              value={taskName}
              onChange={(e) => updateNameTask(e)}
            ></input>
            <p>change</p>
          </div>
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
              <div className="flex flex-col gap-6 h-[442px] overflow-auto pr-8 bah">
                {commentsTask?.map((comment, index) => {
                  return (
                    <Comment
                      updatedComment={updateComment}
                      commentId={index}
                      deleteComment={deleteComment}
                      user={user}
                      sender={comment.sender}
                      value={comment.value}
                      updatedAt={comment.dateUpdate?.toString() ?? undefined}
                      date={comment.dateCreate?.toString()}
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
        <div className="w-full max-w-[547px] flex flex-col gap-6">
          <div className="w-full max-w-[547px] ">
            {/* bg-black */}
            <div className="flex flex-col gap-5 max-h-[450px] overflow-auto bah pr-4 w-full">
              {task?.properties.map((prop) => {
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
                                  options={(
                                    prop.property as Select
                                  ).options.map((option) => option.name)}
                                  value={
                                    prop.value.value?.name ??
                                    "244a271c-ab15-4620-b4e2-a24c92fe4042"
                                  }
                                />
                              )) ||
                              (TypeOfProperty.NUMBER == prop.property.type && (
                                <NumberFilter
                                  isInModal
                                  id={prop.property.id}
                                  name={prop.property.name}
                                  value={prop.value?.value}
                                />
                              )) ||
                              (TypeOfProperty.PROGRESS ==
                                prop.property.type && (
                                <ProgressFilter
                                  isInModal
                                  id={prop.property.id}
                                  name={prop.property.name}
                                  value={prop.value?.value}
                                />
                              )) ||
                              (TypeOfProperty.DATE == prop.property.type && (
                                <DateFilter
                                  isInModal
                                  id={prop.property.id}
                                  name={prop.property.name}
                                  value={prop.value?.value}
                                />
                              )) ||
                              (TypeOfProperty.TEXT == prop.property.type && (
                                <TextFilter
                                  isInModal
                                  id={prop.property.id}
                                  name={prop.property.name}
                                  value={prop.value.value}
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
                                value={
                                  prop.value.value?.name ??
                                  "244a271c-ab15-4620-b4e2-a24c92fe4042"
                                }
                              />
                            )) ||
                            (prop.property.type == TypeOfProperty.CHECKBOX
                               && (
                                <CheckboxFilter
                                  isInModal
                                  name={prop.property.name}
                                  options={(prop.property as Select).options}
                                  id={prop.property.id}
                                  value={prop.value.value?.map((option:any) => option.name)}
                                />
                              )) ||
                            (prop.property.type == TypeOfProperty.TAG && (
                              <TagFilter
                              isInModal
                              name={prop.property.name}
                              options={(prop.property as Select).options}
                              id={prop.property.id}
                              value={prop.value.value?.map((option:any) => option.name)}
                              />
                            ))}
                        </div>
                      </FilterContext.Provider>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex gap-4 pt-3 w-full h-min justify-end items-center">
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
              fnButton={() => updateTask()}
              paddingY="py-1"
              padding="p-4"
            />
          </div>
          <div className="bg-input-grey gap-8 p-2 rounded-lg shadow-comment flex justify-center w-full max-w-[543px]">
            <p className="font-montserrat text-base">
              Adicionar propriedade para tarefa
            </p>
            <img src="/addProp.svg" alt="" />
          </div>
          <div className=" min-w-full h-[2px] bg-[#F2F2F2]"></div>
          <div
            className="p-2 self-end justify-center items-center flex rounded-lg bg-primary dark:bg-secondary"
            onClick={deleteTask}
          >
            <img src="/trash.svg" alt="" width={18} height={18} />
          </div>
        </div>
      </div>

      <button onClick={() => setIsOpen(false)}>X</button>
    </CenterModal>
  );
};
