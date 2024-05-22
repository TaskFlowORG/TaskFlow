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
  Limited,
  Date as DateProp,
  DateValued,
  Project,
} from "@/models";
import { ContentPropertyModalTask } from "../ContentPropertyModalTask";
import { AddPropertyButton } from "./AddPropertyButton";
import { FooterTask } from "./FooterTask";
import { ProjectContext } from "@/contexts";
import { useContext, useEffect, useState } from "react";
import { PageContext } from "@/utils/pageContext";
import { projectService, taskService } from "@/services";
import { FilteredProperty } from "@/types/FilteredProperty";
import { ColumnProperty } from "./ColumnProperty";
import { RowProperty } from "./RowProperty";
import { createValue } from "@/functions/createValue";

import { useTranslation } from "react-i18next";
import { useHasPermission } from "@/hooks/useHasPermission";
import { NeedPermission } from "@/components/NeedPermission";
import { valuesOfObjects } from "@/functions/modalTaskFunctions/valuesOfObjects";
import { isProject } from "@/functions/modalTaskFunctions/isProject";
import { useAsyncThrow } from "@/hooks/useAsyncThrow";
import { DateWithGoogle } from "@/models/values/DateValued";
import Image from "next/image";
import { ConfigBlock } from "@/components/Config";
import { UserContext } from "@/contexts/UserContext";
import { TaskModalContext } from "@/utils/TaskModalContext";
import { SourceTextModule } from "vm";
import { log } from "console";
import { FilterContext } from "@/utils/FilterlistContext";

type Props = {
  task: Task | Project;
  filter: FilteredProperty[];
  users: OtherUser[];
  setIsOpen?: (bool: boolean) => void;
  setFilter: (array: FilteredProperty[]) => void;
  setList: (value: FilteredProperty | undefined) => void;
};
export const TesPropertiesSide = ({
  task,
  setIsOpen,
  filter,
  users,
  setFilter,
  setList,
}: Props) => {
  const { t } = useTranslation();
  const { setSelectedTask } = useContext(TaskModalContext);
  const { setFilterProp } = useContext(FilterContext);
  const [propertiesToValidate, setPropertiesToValidate] = useState<PropsForm[]>(
    []
  );

  const hasPermissionUpdate = useHasPermission("update");
  const hasPermissionDelete = useHasPermission("delete");

  type PropsForm = {
    property: PropertyValue;
    errors: string[];
  };

  const [errors, setErrors] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    let array: PropsForm[] = [];
    valuesOfObjects(task).forEach((prop) => {
      if (propertiesToValidate.includes({ property: prop, errors: [] })) return;
      array.push({ property: prop, errors: [] });
    });
    setPropertiesToValidate(array);
  }, [valuesOfObjects(task)]);

  const { project, setProject } = useContext(ProjectContext);
  const { pageId } = useContext(PageContext);
  const [openedConfig, setOpenedConfig] = useState(false);
  const [idConfig, setIdConfig] = useState(0);
  const [modalProperty, setModalProperty] = useState(false);

  async function deleteTask() {
    if (!isProject(task)) {
      taskService.delete(task.id, project!.id.toString());
      let page = project?.pages.find((page) => pageId == page.id);
      let taskPage = page?.tasks.find((taskP) => taskP.task.id == task.id);
      page?.tasks.splice(page.tasks.indexOf(taskPage!), 1);
      setProject!({ ...project! });
      {
        setIsOpen && setIsOpen(false);
      }
    } else {
      projectService.delete(project!.id);
    }
  }

  const passObligatoryVerification = (propertyForm: PropsForm): boolean => {
    if (propertyForm.property.property.obligatory) {
      let inputProperty = filter.find(
        (propV) => propV.id == propertyForm.property.property.id
      );

      if (inputProperty) {
        if (
          inputProperty.value == "" ||
          inputProperty.value == "244a271c-ab15-4620-b4e2-a24c92fe4042" ||
          inputProperty.value.length == 0
        ) {
          propertyForm.errors.push(`${t("property-required")}`);
          setPropertiesToValidate([...propertiesToValidate]);
          return false;
        } else {
          propertyForm.errors = [];
          setPropertiesToValidate([...propertiesToValidate]);
          return true;
        }
      } else {
        if (
          !propertyForm.property.value.value ||
          propertyForm.property.value.value.length == 0
        ) {
          propertyForm.errors.push(`${t("property-required")}`);
          setPropertiesToValidate([...propertiesToValidate]);
          return false;
        } else {
          return true;
        }
      }
    } else {
      return true;
    }
  };
  const validateProps = (): boolean => {
    propertiesToValidate.forEach((propertyForm) => {
      if (propertyForm.property.property.obligatory) {
        let inputProperty = filter.find(
          (propV) => propV.id == propertyForm.property.property.id
        );

        if (inputProperty) {
          if (
            inputProperty.value == "" ||
            inputProperty.value == "244a271c-ab15-4620-b4e2-a24c92fe4042" ||
            inputProperty.value.length == 0
          ) {
            propertyForm.errors.push(`${t("property-required")}`);
            setPropertiesToValidate([...propertiesToValidate]);
          } else {
            propertyForm.errors = [];
            setPropertiesToValidate([...propertiesToValidate]);
          }
        } else {
          if (
            !propertyForm.property.value.value ||
            propertyForm.property.value.value.length == 0
          ) {
            propertyForm.errors.push(`${t("property-required")}`);
            setPropertiesToValidate([...propertiesToValidate]);
          }
        }
      }

      if (
        [
          TypeOfProperty.TEXT,
          TypeOfProperty.USER,
          TypeOfProperty.NUMBER,
          TypeOfProperty.PROGRESS,
        ].includes(propertyForm.property.property.type)
      ) {
        if (!(propertyForm.property.property as Limited).maximum) return;
        let inputProperty = filter.find(
          (propV) => propV.id == propertyForm.property.property.id
        );
        if (inputProperty) {
          if (
            inputProperty.value.length >
            (propertyForm.property.property as Limited).maximum
          ) {
            propertyForm.errors.push(
              `${t("property-max")} ${
                (propertyForm.property.property as Limited).maximum
              } ${
                propertyForm.property.property.type == TypeOfProperty.TEXT
                  ? t("characters")
                  : propertyForm.property.property.type == TypeOfProperty.USER
                  ? (propertyForm.property.property as Limited).maximum > 1
                    ? t("users")
                    : t("user")
                  : "!"
              }`
            );
            setPropertiesToValidate([...propertiesToValidate]);
          } else {
            if (passObligatoryVerification(propertyForm)){
              propertyForm.errors = [];
            }
            setPropertiesToValidate([...propertiesToValidate]);
          }
        } else {
          console.log(propertyForm.property.value.value);
          if (
            propertyForm.property.value.value.length >
            (propertyForm.property.property as Limited).maximum
          ) {
            propertyForm.errors.push(
              `${t("property-max")} ${
                (propertyForm.property.property as Limited).maximum
              } ${
                propertyForm.property.property.type == TypeOfProperty.TEXT
                  ? t("characters")
                  : propertyForm.property.property.type == TypeOfProperty.USER
                  ? (propertyForm.property.property as Limited).maximum > 1
                    ? t("users")
                    : t("user")
                  : "!"
              }`
            );
            setPropertiesToValidate([...propertiesToValidate]);
          }
        }
      }
    });

    return propertiesToValidate
      .filter(
        (prop) =>
          !(
            prop.property.property.type == TypeOfProperty.TIME ||
            prop.property.property.type == TypeOfProperty.ARCHIVE
          )
      )
      .find((prop) => prop.errors.length > 0)
      ? false
      : true;
  };

  function testIfIsPass(
    propertyForm: PropsForm,
    currentDate: Date,
    propInput: FilteredProperty
  ) {
    if ((propertyForm.property.property as DateProp).includesHours) {
      return new Date(propInput?.value) < currentDate;
    } else {
      return (
        new Date(propInput?.value).getDate() < currentDate.getDate() &&
        new Date(propInput?.value).getMonth() < currentDate.getMonth() &&
        new Date(propInput?.value).getFullYear() < currentDate.getFullYear()
      );
    }
  }

  const asynThrow = useAsyncThrow();

  async function updateTask() {
    if (!validateProps()) {
      setErrors(true);
      return;
    }

    filter.forEach(async (value) => {
      let updateProp =
        valuesOfObjects(task)?.find((prop) => prop.property.id == value.id) ??
        null;
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
          updateProp.value.value = users.filter((user) =>
            value.value.includes(user.username)
          );
        } else if (TypeOfProperty.DATE == updateProp.property.type) {
          if (updateProp.value.value == null)
            updateProp.value.value = new DateWithGoogle(null, "", null);
          updateProp.value.value.dateTime = value.value;
        } else {
          console.log(value, "value");

          updateProp.value.value = value.value;
        }
      }
    });
    if (!isProject(task)) {
      const taskReturned = await taskService
        .upDate(task as Task, project!.id)
        .catch(asynThrow);
      const page = project?.pages.find((page) => page.id == pageId);
      const taskPage = page?.tasks.find((taskP) => taskP.task.id == task.id);
      if (taskReturned && taskPage) {
        taskPage.task = taskReturned;
      }
      setSelectedTask!(taskReturned!);

      setProject!({ ...project! });
    } else {
      const projectReturned = await projectService
        .update(task as Project, project!.id)
        .catch(asynThrow);
      setProject!({ ...projectReturned! });
    }

    setList(undefined);
    setFilterProp!([]);
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
        propertyObj = new LimitedPost(
          name,
          selected,
          values.visible,
          values.obligatory,
          values.maximum,
          undefined,
          []
        );
      } else if (
        [
          TypeOfProperty.CHECKBOX,
          TypeOfProperty.TAG,
          TypeOfProperty.RADIO,
          TypeOfProperty.SELECT,
        ].includes(selected)
      ) {
        propertyObj = new SelectPost(
          name,
          selected,
          values.visible,
          values.obligatory,
          [],
          undefined,
          []
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

      valuesOfObjects(task).push(
        new PropertyValue(
          propertyObj as unknown as Property,
          createValue(propertyObj as unknown as Property)!
        )
      );

      if (!isProject(task)) {
        let taskReturned = await taskService.upDate(task as Task, project!.id);
        let page = project!.pages.find((page) => pageId == page.id);
        let taskFinded = page?.tasks.find((taskD) => taskD.task.id == task.id);
        taskFinded!.task = taskReturned;
        setProject!({ ...project! });
      } else {
        // (task as Project).values = valuesOfObjects(task)
        let projectReturned = await projectService.update(
          task as Project,
          project!.id
        );

        setProject!({ ...projectReturned });
      }
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
    <div className="w-full lg:w-2/5 flex flex-col properties-section justify-between min-h-full ">
      {/* <pre>{JSON.stringify(propertiesToValidate, null, 2)}</pre> */}
      <div className="w-full">
        {/* bg-black */}
        <div className="flex max-w-full flex-col gap-5 h-full max-h-[460px] min-h-[450px] none-scrollbar overflow-auto bah pr-4 w-full">
          {valuesOfObjects(task).map((prop) => {
            return (
              <div
                key={prop.id}
                className="bg-white dark:bg-transparent flex flex-col"
              >
                <div className="flex sm:gap-8 gap-4 w-full items-center text-back-grey dark:text-white">
                  <NeedPermission permission="update">
                    <ConfigBlock
                      onClick={() => {
                        if (isTaskProperty(prop.property)) {
                          setOpenedConfig(!openedConfig);
                          setIdConfig(prop.property.id);
                        }
                      }}
                    ></ConfigBlock>
                  </NeedPermission>

                  <div className="flex flex-wrap justify-between items-center gap-2 flex-1">
                    <div className="flex w-full items-center flex-1 gap-3">
                      <div className="w-5 aspect-square">
                        <IconsSelector property={prop.property} />
                      </div>
                      <p
                        className="font-montserrat text-p14 md:text-p"
                        // onClick={() => handleValidate()}
                      >
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
                      <RowProperty
                        setErrors={setErrors}
                        setFormProps={setPropertiesToValidate}
                        formProps={propertiesToValidate}
                        prop={prop}
                        task={task}
                      />
                    )}

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
                {errors &&
                propertiesToValidate.find(
                  (propV) => propV.property.property.id == prop.property.id
                )!.errors?.length > 0 ? (
                  <p className="text-xs text-red-600 font-montserrat">
                    {
                      propertiesToValidate.find(
                        (propV) =>
                          propV.property.property.id == prop.property.id
                      )!.errors[0]
                    }
                  </p>
                ) : (
                  <></>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <NeedPermission permission="create">
        {((!(task as Task).completed && !isProject(task)) ||
          (!(task as Task).completed && project?.owner?.id == user?.id)) && (
          <AddPropertyButton
            isInModal={!isProject(task)}
            setModalProperty={setModalProperty}
          />
        )}
      </NeedPermission>

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

      {(hasPermissionDelete || hasPermissionUpdate) && (
        <div className=" min-w-full h-[2px] bg-[#F2F2F2]"></div>
      )}
      {<FooterTask deleteTask={deleteTask} updateTask={updateTask} />}
    </div>
  );
};
