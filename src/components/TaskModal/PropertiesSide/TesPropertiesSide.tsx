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
} from "@/models";
import { ContentPropertyModalTask } from "../ContentPropertyModalTask";
import { AddPropertyButton } from "./AddPropertyButton";
import { FooterTask } from "./FooterTask";
import { ProjectContext } from "@/contexts";
import { useContext, useEffect, useState } from "react";
import { PageContext } from "@/utils/pageContext";
import { taskService } from "@/services";
import { FilteredProperty } from "@/types/FilteredProperty";
import { ColumnProperty } from "./ColumnProperty";
import { RowProperty } from "./RowProperty";
import { createValue } from "@/functions/createValue";

import { useTranslation } from "react-i18next";

type Props = {
  task: Task;
  filter: FilteredProperty[];
  users: OtherUser[];
  setIsOpen: (bool: boolean) => void;
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
  const [propertiesToValidate, setPropertiesToValidate] = useState<PropsForm[]>(
    []
  );

  type PropsForm = {
    property: PropertyValue;
    errors: string[];
  };

  const [errors, setErrors] = useState(false);

  useEffect(() => {
    let array: PropsForm[] = [];
    task?.properties.forEach((prop) => {
      if (propertiesToValidate.includes({ property: prop, errors: [] })) return;
      array.push({ property: prop, errors: [] });
      console.log(array);
    });
    setPropertiesToValidate(array);
  }, [task?.properties, setPropertiesToValidate]);

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

  const validateProps = (): boolean => {
    propertiesToValidate.forEach((prop) => {
      console.log(prop);
      if (prop.property.property.obligatory) {
        let propertyd = filter.find(
          (propV) => propV.id == prop.property.property.id
        );
        console.log(propertyd);
        if (!propertyd) return;
        if (
          !propertyd.value ||
          propertyd.value == "244a271c-ab15-4620-b4e2-a24c92fe4042" ||
          !(propertyd.value.length > 0)
        ) {
          prop.errors.push("Essa propriedade é obrigatória");
          setPropertiesToValidate([...propertiesToValidate]);
        } else {
          prop.errors = [];
          setPropertiesToValidate([...propertiesToValidate]);
        }
      }
    });
    filter.forEach((propInput) => {
      const propertyForm =
        propertiesToValidate.find(
          (prop) => prop.property.property.id == propInput.id
        ) ?? null;
      console.log("Im here");
      console.log(propInput);
      console.log(propertyForm);
      if (propertyForm) {
        switch (propertyForm.property.property.type) {
          case TypeOfProperty.TEXT:
            if (!(propertyForm.property.property as Limited).maximum) return;
            if (
              (propertyForm.property.property as Limited).maximum <
              propInput.value.length
            ) {
              console.log("Caralho lek");
              propertyForm.errors.push(
                `Essa propridade possuí um máximo de ${
                  (propertyForm.property.property as Limited).maximum
                } caractéres.`
              );
              setPropertiesToValidate([...propertiesToValidate]);
            } else {
              propertyForm.errors = [];
              setPropertiesToValidate([...propertiesToValidate]);
            }
            break;
          case TypeOfProperty.NUMBER:
          case TypeOfProperty.PROGRESS:
            if (!(propertyForm.property.property as Limited).maximum) return;
            if (
              (propertyForm.property.property as Limited).maximum <
              parseFloat(propInput.value)
            ) {
              console.log("Caralho lek");
              propertyForm.errors.push(
                `Essa propridade possuí um valor máximo de ${
                  (propertyForm.property.property as Limited).maximum
                }.`
              );
              setPropertiesToValidate([...propertiesToValidate]);
            } else {
              propertyForm.errors = [];
              setPropertiesToValidate([...propertiesToValidate]);
            }
            break;
          case TypeOfProperty.DATE:
            if (!(propertyForm.property.property as DateProp).canBePass) {
              const currentDate = new Date();
              console.log(new Date(propInput.value) < currentDate);
              if (new Date(propInput.value) < currentDate) {
                propertyForm.errors.push(
                  `Essa propriedade não pode estar no passado!`
                );
              }
              setPropertiesToValidate([...propertiesToValidate]);
            } else {
              propertyForm.errors = [];
              setPropertiesToValidate([...propertiesToValidate]);
            }
            break;
          case TypeOfProperty.USER:
            if (!(propertyForm.property.property as Limited).maximum) return;
            if (
              (propertyForm.property.property as Limited).maximum <
              propInput.value.length
            ) {
              propertyForm.errors.push(
                `Essa propridade possuí um máximo de ${
                  (propertyForm.property.property as Limited).maximum
                } usuários.`
              );
              setPropertiesToValidate([...propertiesToValidate]);
            } else {
              propertyForm.errors = [];
              setPropertiesToValidate([...propertiesToValidate]);
            }
            break;
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

  async function updateTask() {
    if (!validateProps()) {
      setErrors(true);
      return;
    }

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
          console.log("PELO MENOS TEM EU AQUI CARAIO");
          console.log(value);
          console.log(
            users.filter((user) => value.value.includes(user.username))
          );
          updateProp.value.value = users.filter((user) =>
            value.value.includes(user.username)
          );
          console.log("Calma qui vou salvar o usuário fi");
          console.log(updateProp);
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
    const taskReturned = await taskService.upDate(task, project!.id);
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
      console.log(
        new PropertyValue(
          propertyObj as unknown as Property,
          createValue(propertyObj as unknown as Property)!
        )
      );
      task.properties.push(
        new PropertyValue(
          propertyObj as unknown as Property,
          createValue(propertyObj as unknown as Property)!
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
    <div className="w-full lg:w-2/5 flex flex-col justify-between min-h-full ">
      {/* <pre>{JSON.stringify(propertiesToValidate, null, 2)}</pre> */}
      <div className="w-full">
        {/* bg-black */}
        <div className="flex max-w-full flex-col gap-5 h-full max-h-[450px] min-h-[450px] none-scrollbar overflow-auto bah pr-4 w-full">
          {task?.properties.map((prop) => {
            return (
              <div
                key={prop.id}
                className="bg-white dark:bg-modal-grey flex flex-col"
              >
                <div className="flex sm:gap-8 gap-4 w-full items-center">
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

                  <div className="flex flex-wrap justify-between items-center gap-2 flex-1">
                    <div className="flex w-full items-center flex-1 gap-3">
                      <IconsSelector property={prop.property} />
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
