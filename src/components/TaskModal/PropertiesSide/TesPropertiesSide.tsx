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
  Project,
  Limited,
  Date as DateProp,
} from "@/models";
import { ContentPropertyModalTask } from "../ContentPropertyModalTask";
import { AddPropertyButton } from "./AddPropertyButton";
import { FooterTask } from "./FooterTask";
import { ProjectContext } from "@/contexts";
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { PageContext } from "@/utils/pageContext";
import { taskService } from "@/services";
import { FilteredProperty } from "@/types/FilteredProperty";
import { ColumnProperty } from "./ColumnProperty";
import { RowProperty } from "./RowProperty";
import { createValue } from "@/functions/createValue";
import * as z from "zod";
import { FormState, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { log } from "console";
import { filterProps } from "framer-motion";

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

  // // Array de propriedades (pode ser dinâmico)
  // const properties: (Limited | DateProp | Select)[] = task.properties.map(
  //   (prop) => {
  //     if (prop.property.type == TypeOfProperty.SELECT) {
  //       return prop.property as Select;
  //     } else if (prop.property.type == TypeOfProperty.DATE) {
  //       return prop.property as DateProp;
  //     } else {
  //       return prop.property as Limited;
  //     }
  //   }
  // );
  // // Adicione mais propriedades conforme necessário
  // // Função para gerar o esquema Zod com base nas propriedades
  // function generateSchema(
  //   properties: (Limited | DateProp | Select)[]
  // ): z.ZodObject<any> {
  //   const schema: { [key: string]: z.ZodType<any, any> } = {};
  //   properties.forEach((property) => {
  //     const propertySchema: { [key: string]: z.ZodType<any, any> } = {};
  //     propertySchema.name = z.string();
  //     if ("maximum" in property) {
  //       if (property.type == TypeOfProperty.TEXT) {
  //         propertySchema.value = z
  //           .string()
  //           .max(
  //             property.maximum,
  //             `Essa propriedade tem um limite de caractéres de ${property.maximum}.`
  //           );
  //       } else if (
  //         [TypeOfProperty.NUMBER, TypeOfProperty.PROGRESS].includes(
  //           property.type
  //         )
  //       ) {
  //         propertySchema.value = z.number().max(property.maximum);
  //       } else {
  //         propertySchema.value = z
  //           .array(z.string())
  //           .max(
  //             property.maximum,
  //             `Essa propriedade tem um limite de usuários de ${property.maximum}.`
  //           );
  //       }
  //     }
  //     if ("canBePass" in property) {
  //       propertySchema.value = z
  //         .date()
  //         .refine((data) => data.getTime() >= Date.now(), {
  //           message: "A data deve ser igual ou posterior à data atual",
  //         });
  //     }
  //     schema[property.name] = z.object(propertySchema);
  //   });
  //   return z.object(schema);
  // }

  // // Gerar o esquema com base nas propriedades
  // const schema = generateSchema(properties);

  // type MeuTipo = z.infer<typeof schema>;

  // const handleValidate = () => {
  //   validarDados(filter);
  // };

  // function validarDados(dados: any[]): MeuTipo | string {
  //   try {
  //     const resultado = schema.parse(dados);
  //     console.log(resultado);
  //     return resultado;
  //   } catch (error) {
  //     if (error instanceof z.ZodError) {
  //       console.log(error);
  //       // Se ocorrer um erro de validação, retorna a mensagem de erro
  //       return error.errors.map((e) => e.message).join(", ");
  //     }
  //     // Se ocorrer um erro desconhecido, lança o erro para ser tratado em outro lugar
  //     throw error;
  //   }
  // }

  // // Use useForm com o resolver Zod
  // const {
  //   register,
  //   handleSubmit,
  //   setValue,
  //   formState: { errors },
  // } = useForm<z.infer<typeof schema>>({
  //   mode: "all",
  //   reValidateMode: "onChange",
  //   resolver: zodResolver(schema),
  // });

  const [propertiesToValidate, setPropertiesToValidate] = useState<PropsForm[]>(
    []
  );

  type PropsForm = {
    property: PropertyValue;
    errors: string[];
  };

  useEffect(() => {
    let array: PropsForm[] = [];
    task.properties.forEach((prop) => {
      if (propertiesToValidate.includes({ property: prop, errors: [] })) return;
      array.push({ property: prop, errors: [] });
      console.log(array);
    });
    setPropertiesToValidate(array);
  }, [task.properties]);

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
            }
            break;
          case TypeOfProperty.NUMBER:
          case TypeOfProperty.PROGRESS:
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
            }
            break;
          case TypeOfProperty.DATE:
            console.log("Eu entrei nas datas meu mano luka");
            console.log(propertyForm.property.property as DateProp);
            if (!(propertyForm.property.property as DateProp).canBePass) {
              console.log("Entrei até aqui cara");
              const currentDate = new Date();
              console.log(new Date(propInput.value) < currentDate);
              if (new Date(propInput.value) < currentDate) {
                console.log("Entrei nesse ultimo if");
                propertyForm.errors.push(
                  `Essa propriedade não pode estar no passado!`
                );
              }
              setPropertiesToValidate([...propertiesToValidate]);
            }

            break;
          case TypeOfProperty.USER:
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
            }
            break;
        }
      }
    });
    return false;
  };
  async function updateTask() {
    if (!validateProps()) return;
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
                <pre>
                  {JSON.stringify(
                    propertiesToValidate.find(
                      (propV) => propV.property.property.id == prop.property.id
                    )?.errors,
                    null,
                    2
                  )}
                </pre>
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
                      <RowProperty prop={prop} task={task} />
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
