"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { CenterModal } from "../Modal";
import { Comment } from "./CommentsSection/Comment";
import {
  Message,
  Select,
  TaskOrdered,
  TypeOfProperty,
  Option,
  Task,
  User,
  MessagePost,
  OtherUser,
  UserPost,
  DatePost,
  LimitedPost,
  SelectPost,
  Property,
  Value,
  TimeValued,
  DateValued,
  MultiOptionValued,
  UniOptionValued,
  TextValued,
  NumberValued,
  UserValued,
  ArchiveValued,
} from "@/models";
import { Select as Selectt } from "@/components/Select";
import {
  groupService,
  projectService,
  propertyService,
  taskService,
  userService,
} from "@/services";
import { ProjectContext } from "@/contexts/ContextProject";
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
import { IconTrashBin } from "../icons";
import { PageContext } from "@/utils/pageContext";
import { AddProp } from "../icons/GeneralIcons/AddProp";
import { UserFilter } from "../FilterAdvancedInput/UserFilter";
import { FileFilter } from "../FilterAdvancedInput/FilteFilter";
import { TimeFilter } from "../FilterAdvancedInput/TimeFilter";
import { SendComment } from "./CommentsSection/SendComment";
import { CommentsContainer } from "./CommentsSection/CommentsContainer";
import { Interval } from "@/models/values/Interval";
import { Duration } from "@/models/values/Duration";
import { ModalRegisterProperty } from "../ModalRegisterProperty";
import { RegisterProperty } from "../RegisterProperty";
import page from "@/app/(all)/(before-login)/page";
import { ContentModalProperty } from "../ContentModalProperty";
import { useForm } from "react-hook-form";
import { ModalProperty } from "../ModalProperty";
import { ContentPropertyModalTask } from "./ContentPropertyModalTask";
import { Buttons } from "./Buttons";

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
  const { filterProp, setFilterProp } = useContext(FilterContext);

  const { project, setProject } = useContext(ProjectContext);
  const { pageId } = useContext(PageContext);
  const [users, setUsers] = useState<OtherUser[]>([]);
  const taskNameRef = useRef<any>(null);

  const [openedConfig, setOpenedConfig] = useState(false);
  const [idConfig, setIdConfig] = useState(0);
  const [modalProperty, setModalProperty] = useState(false);

  function createValue(propertyObj: Property): Value | undefined {
    switch (propertyObj.type) {
      case TypeOfProperty.TIME:
        return new TimeValued(new Interval(new Duration(0, 0, 0)));
      case TypeOfProperty.DATE:
        return new DateValued(null);
      case TypeOfProperty.CHECKBOX:
      case TypeOfProperty.TAG:
        return new MultiOptionValued([]);
      case TypeOfProperty.SELECT:
      case TypeOfProperty.RADIO:
        return new UniOptionValued(null);
      case TypeOfProperty.TEXT:
        return new TextValued(null);
      case TypeOfProperty.NUMBER:
        return new NumberValued(null);
      case TypeOfProperty.NUMBER:
      case TypeOfProperty.PROGRESS:
        return new NumberValued(null);
      case TypeOfProperty.USER:
        return new UserValued([]);
      case TypeOfProperty.ARCHIVE:
        return new ArchiveValued(null);
    }
  }
  const postProperty = async (
    name: string,
    values: any,
    selected: TypeOfProperty
  ) => {
    try {
      let propertyObj;

      if (
        [
          TypeOfProperty.TIME,
          TypeOfProperty.USER,
          TypeOfProperty.ARCHIVE,
          TypeOfProperty.NUMBER,
          TypeOfProperty.PROGRESS,
          TypeOfProperty.TEXT,
        ].includes(selected)
      ) {
        propertyObj = await propertyService.saveLimited(
          project!.id,
          new LimitedPost(
            name,
            selected,
            values.visible,
            values.obligatory,
            values.maximum,
            undefined,
            []
          )
        );
      } else if (
        [
          TypeOfProperty.CHECKBOX,
          TypeOfProperty.TAG,
          TypeOfProperty.RADIO,
          TypeOfProperty.SELECT,
        ].includes(selected)
      ) {
        propertyObj = await propertyService.saveSelect(
          project!.id,
          new SelectPost(
            name,
            selected,
            values.visible,
            values.obligatory,
            [],
            undefined,
            []
          )
        );
      } else {
        propertyObj = new DatePost(
          name,
          selected,
          values.visible,
          values.obligatory,
          values.pastDate,
          values.hours,
          undefined,
          []
        );
      }
      task.properties.push(
        new PropertyValue(
          propertyObj as Property,
          createValue(propertyObj as Property)!
        )
      );
      let taskReturned = await taskService.upDate(task, project!.id);
      let page = project!.pages.find((page) => pageId == page.id);
      let taskFinded = page?.tasks.find((taskD) => taskD.task.id == task.id);
      taskFinded!.task = taskReturned;
      setProject!({ ...project! });
    } catch (error) {
      console.log(error);
    }
  };

  function arraysAreEqual(arr1: any, arr2: any) {
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
    const findGroups = async () => {
      const users = await userService.findAll();
      setUsers(
        users.filter(
          (user) =>
            user.permissions.find(
              (permission) => permission.project.id === project?.id
            ) != undefined
        )
      );
    };
    findGroups();
  }, [project]);

  useEffect(() => {
    setList(undefined);
    setFilter([]);

    if (taskNameRef.current) {
      taskNameRef.current.focus();
      console.log(`FOQUEI PA CARALHO`);
    }
  }, [isOpen]);

  useEffect(() => {
    setTaskName(task?.name ?? "");
    if (task?.name) {
      let page = project?.pages.find((page) => pageId == page.id);
      if (page) {
        const taskP = page.tasks.find((taskP) => taskP.task.id == task.id);
        if (taskP) {
          taskP.task.name = task.name;
        }
      }

      setProject!({ ...project! });
    }
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
    await taskService.upDate(task, project!.id);
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

          console.log(updatedValue);
          // console.log(updatedValue);
          updateProp.value.value = updatedValue;
          // console.log(updateProp);
          // await taskService.upDate(task);
        } else if (TypeOfProperty.USER == updateProp.property.type) {
          // console.log(value.value);
          console.log(users);
          // falta o userDetailsEntity aqui man
          console.log(
            users.filter((user) => value.value.includes(user.username))
          );
          users.filter((user) => value.value.includes(user.username));
          updateProp.value.value = users.filter((user) =>
            value.value.includes(user.username)
          );
          // console.log(updateProp);
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
    // aqui tem problema, a porra do projeto as vezes é undefined
    const taskReturned = await taskService.upDate(task, project!.id ?? 1);
    console.log(taskReturned);
    const page = project?.pages.find((page) => page.id == pageId);
    const taskPage = page?.tasks.find((taskP) => taskP.task.id == task.id);
    if (taskPage) {
      taskPage.task = taskReturned;
    }

    setProject!({ ...project! });

    console.log(task);

    setList(undefined);
    setFilter([]);
  }

  async function deleteTask() {
    taskService.delete(task.id, project!.id.toString());
    let page = project?.pages.find((page) => pageId == page.id);
    let taskPage = page?.tasks.find((taskP) => taskP.task.id == task.id);
    page?.tasks.splice(page.tasks.indexOf(taskPage!), 1);
    setProject!({ ...project! });
    setIsOpen(false);
  }

  async function updateComment(commentId: number, updatedValue: string) {
    let comment = task.comments[commentId];
    if (comment) {
      comment.value = updatedValue;
      comment.dateUpdate = new Date();
      console.log(updatedValue);
      console.log(task);
      let taskUpdated = await taskService.upDate(task, project!.id);
      setCommentsTask(taskUpdated.comments);
    }
  }

  async function deleteComment(commentId: number) {
    let comment = task.comments[commentId];
    if (comment) {
      task.comments.splice(task.comments.indexOf(comment), 1);
      let taskUpdated = await taskService.upDate(task, project!.id);
      setCommentsTask(taskUpdated.comments);
    }
  }

  function isTaskProperty(property: Property): boolean {
    let page = project?.pages.find((page) => pageId == page.id);
    if (project?.properties.find((propertyD) => propertyD.id == property.id)) {
      return false;
    } else if (
      page?.properties.find((propertyD) => propertyD.id == property.id)
    ) {
      return false;
    } else {
      return true;
    }
  }
  async function sendComment() {
    if (!input) return;
    let comment: Message = {
      sender: user,
      value: input,
      destinations: [],
      dateCreate: new Date(),
    };

    if (task.comments) {
      task.comments.push(comment);
    } else {
      task.comments = [comment];
    }

    await taskService.upDate(task, project!.id);
    setInput("");
  }
  const { t } = useTranslation();

  return (
    <CenterModal
      stylesTailwind={"w-[1306px]  shadow-blur-10 p-12"}
      condition={isOpen}
      setCondition={() => {
        setIsOpen(false);
      }}
    >
      <div className="flex gap-[102px]  w-full h-full ">
        <CommentsContainer>
          <div className="flex flex-col gap-12 w-[453px]">
            <div className="flex gap-4 items-center">
              <input
                className="h3 whitespace-nowrap bg-white dark:bg-modal-grey w-full outline-none"
                ref={taskNameRef}
                placeholder={t("withoutname")}
                value={taskName}
                onChange={(e) => updateNameTask(e)}
              ></input>
            </div>
            <div className="flex flex-col w-full gap-6">
              <div className="flex gap-0 w-full">
                <button className="w-full  flex items-center gap-4  px-4 py-1 bg-primary dark:bg-secondary rounded-t-lg">
                  <div className="w-4 h-4 rounded-full bg-white"></div>
                  <p className="h4 text-white ">{t("comments")}</p>
                </button>
                <button className="w-full flex items-center gap-4  border-t-2 border-b-2  border-r-2 px-4 py-1 bg-white dark:bg-modal-grey rounded-r-lg">
                  <div className="w-4 h-4 rounded-full bg-white"></div>
                  <p className="h4 text-[#343434] dark:text-white ">
                    {t("historical")}
                  </p>
                </button>
              </div>
              <div className=" flex flex-col gap-6">
                <div className="flex flex-col gap-6 h-[442px] overflow-auto pr-8 bah">
                  {commentsTask?.map((comment, index) => {
                    return (
                      <Comment
                        {...comment}
                        updateComment={updateComment}
                        commentId={index}
                        deleteComment={deleteComment}
                        user={user}
                        updatedAt={comment.dateUpdate?.toString() ?? undefined}
                        date={comment.dateCreate?.toString()}
                        key={index}
                      ></Comment>
                    );
                  })}
                </div>
                <SendComment
                  input={input}
                  sendComment={sendComment}
                  setInput={setInput}
                ></SendComment>
              </div>
            </div>
          </div>
        </CommentsContainer>
        <FilterContext.Provider
          value={{
            filterProp: filter,
            setFilterProp: setFilter,
            list: list ?? undefined,
            setList: setList,
          }}
        >
          <div className=" w-[2px] min-h-full bg-[#F2F2F2]"></div>
          <div className="w-full max-w-[547px] flex flex-col justify-between min-h-full ">
            <div className="w-full max-w-[547px] ">
              {/* bg-black */}
              <div className="flex flex-col gap-5 h-full max-h-[450px] min-h-[450px]  overflow-auto bah pr-4 w-full">
                {task?.properties.map((prop) => {
                  return (
                    <div
                      key={prop.id}
                      className="bg-white dark:bg-modal-grey flex flex-col"
                    >
                      <div className="flex gap-8 w-full items-start">
                        <img
                          className="pt-2"
                          onClick={() => {
                            if (isTaskProperty(prop.property)) {
                              setOpenedConfig(!openedConfig);
                              setIdConfig(prop.property.id);
                            }
                          }}
                          src="/config.svg"
                          alt=""
                        />
                        {/* <span>C</span> */}

                        <div className="flex flex-col justify-center  gap-2 flex-1">
                          <div className="flex-1 flex items-center relative   justify-between ">
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
                              (TypeOfProperty.USER == prop.property.type && (
                                <UserFilter
                                  isInModal
                                  id={prop.property.id}
                                  name={prop.property.name}
                                  value={(
                                    prop.value?.value as OtherUser[]
                                  )?.map((user) => user.username)}
                                />
                              )) ||
                              (TypeOfProperty.ARCHIVE == prop.property.type && (
                                <FileFilter
                                  isInModal
                                  id={prop.property.id}
                                  task={task}
                                  propertyValue={prop.value as PropertyValue}
                                  name={prop.property.name}
                                  value={prop.value?.value}
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
                              (TypeOfProperty.TIME == prop.property.type && (
                                <TimeFilter
                                  task={task}
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
                            (prop.property.type == TypeOfProperty.CHECKBOX && (
                              <CheckboxFilter
                                isInModal
                                name={prop.property.name}
                                options={(prop.property as Select).options}
                                id={prop.property.id}
                                value={prop.value.value?.map(
                                  (option: any) => option.name
                                )}
                              />
                            )) ||
                            (prop.property.type == TypeOfProperty.TAG && (
                              <TagFilter
                                isInModal
                                name={prop.property.name}
                                options={(prop.property as Select).options}
                                id={prop.property.id}
                                value={prop.value.value?.map(
                                  (option: any) => option.name
                                )}
                              />
                            ))}
                          {openedConfig && idConfig == prop.property.id && (
                            <ContentPropertyModalTask
                              closeOption={() => setOpenedConfig(false)}
                              task={task}
                              property={prop.property}
                              close={() => setOpenedConfig(false)}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div
              onClick={() => setModalProperty(true)}
              className="bg-[#f2f2f2] border-2 border-[#d7d7d7]  dark:bg-modal-grey gap-8 p-2 rounded-lg shadow-comment flex justify-center w-full max-w-[543px]"
            >
              <p className="font-montserrat text-base">
                {t("add-task-property")}
              </p>
              <div>
                <AddProp></AddProp>
              </div>
            </div>
            {modalProperty && (
              <div className="h-min">
                <ModalRegisterProperty
                  isInModal
                  project={project!}
                  postProperty={postProperty}
                  close={() => {
                    setModalProperty(false);
                  }}
                  open={modalProperty}
                  page={project?.pages.find((page) => page.id == pageId)!}
                ></ModalRegisterProperty>
              </div>
            )}

            <div className=" min-w-full h-[2px] bg-[#F2F2F2]"></div>
            <div className="flex justify-between items-center">
              <div
                className="p-2 self-end justify-center items-center flex rounded-lg bg-primary dark:bg-secondary"
                onClick={deleteTask}
              >
                <div className="w-[18px] aspect-square  stroke-white">
                  <IconTrashBin></IconTrashBin>
                </div>
              </div>
              <Buttons updateTask={updateTask} />
            </div>
          </div>
        </FilterContext.Provider>
      </div>
    </CenterModal>
  );
};
