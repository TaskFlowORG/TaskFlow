import { ModalRegisterProperty } from "@/components/ModalRegisterProperty";
import { IconsSelector } from "@/components/Pages/components";
import {
  TypeOfProperty,
  OtherUser,
  PropertyValue,
  Task,
  Select,
  Property,
  DatePost,
  SelectPost,
  LimitedPost,
  ArchiveValued,
  DateValued,
  MultiOptionValued,
  NumberValued,
  TextValued,
  TimeValued,
  UniOptionValued,
  UserValued,
  Value,
} from "@/models";
import { ContentPropertyModalTask } from "../ContentPropertyModalTask";
import { AddPropertyButton } from "./AddPropertyButton";
import { FooterTask } from "./FooterTask";
import { ProjectContext } from "@/contexts";
import { useContext, useState } from "react";
import { PageContext } from "@/utils/pageContext";
import { Select as Selectt } from "@/components/Select";
import { propertyService, taskService } from "@/services";
import { FilteredProperty } from "@/types/FilteredProperty";
import { Duration } from "@/models/values/Duration";
import { Interval } from "@/models/values/Interval";
import { ColumnProperty } from "./ColumnProperty";
import { RowProperty } from "./RowProperty";
import { createValue } from "@/functions/createValue";

type Props = {
  task: Task;
  filter: FilteredProperty[];
  users: OtherUser[];
  setIsOpen: (bool: boolean) => void;
  setFilter: (array: FilteredProperty[]) => void;
  setList: (value: FilteredProperty | undefined) => void;
};
export const PropertiesSide = ({
  task,
  setIsOpen,
  filter,
  users,
  setFilter,
  setList,
}: Props) => {
  const { project, setProject } = useContext(ProjectContext);
  const { pageId } = useContext(PageContext);
  const [openedConfig, setOpenedConfig] = useState(false);
  const [idConfig, setIdConfig] = useState(0);
  const [modalProperty, setModalProperty] = useState(false);

  async function deleteTask() {
    taskService.delete(task.id, project!.id.toString());
    let page = project?.pages.find((page) => pageId == page.id);
    let taskPage = page?.tasks.find((taskP) => taskP.task.id == task.id);
    page?.tasks.splice(page.tasks.indexOf(taskPage!), 1);
    setProject!({ ...project! });
    setIsOpen(false);
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
          let updatedValue = (updateProp.property as Select).options.filter(
            (option) => value.value?.includes(option.name)
          );
          updateProp.value.value = updatedValue;
        } else if (TypeOfProperty.USER == updateProp.property.type) {
          users.filter((user) => value.value.includes(user.username));
          updateProp.value.value = users.filter((user) =>
            value.value.includes(user.username)
          );
        } else if (TypeOfProperty.DATE == updateProp.property.type) {
          let hours = new Date().getHours();
          let minutes = new Date().getMinutes();
          updateProp.value.value =
            value.value +
            "T" +
            ((hours as number) < 10 ? "0" + hours : hours) +
            ":" +
            ((minutes as number) < 10 ? "0" + minutes : minutes);
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

  return (
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

                  <div className="flex flex-col justify-center  gap-2 flex-1">
                    <div className="flex-1 flex items-center relative   justify-between ">
                      <div className="flex gap-3">
                        <IconsSelector property={prop.property} />
                        <p className="font-montserrat text-[16px] whitespace-nowrap">
                          {prop.property.name}
                        </p>
                      </div>
                      {[
                        TypeOfProperty.SELECT,
                        TypeOfProperty.ARCHIVE,
                        TypeOfProperty.DATE,
                        TypeOfProperty.NUMBER,
                        TypeOfProperty.PROGRESS,
                        TypeOfProperty.TEXT,
                        TypeOfProperty.TIME,
                        TypeOfProperty.USER,
                      ].includes(prop.property.type) && (
                        <RowProperty prop={prop} task={task} />
                      )}
                    </div>
                    {[
                      TypeOfProperty.CHECKBOX,
                      TypeOfProperty.TAG,
                      TypeOfProperty.RADIO,
                    ].includes(prop.property.type) && (
                      <ColumnProperty prop={prop} />
                    )}
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

      <AddPropertyButton setModalProperty={setModalProperty} />
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
      <FooterTask deleteTask={deleteTask} updateTask={updateTask} />
    </div>
  );
};
