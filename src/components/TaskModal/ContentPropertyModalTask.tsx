import {
  Date,
  Limited,
  Property,
  Select,
  Task,
  TypeOfProperty,
} from "@/models";
import { useForm } from "react-hook-form";
import { ContentModalProperty } from "../ContentModalProperty";
import { propertyService, taskService } from "@/services";
import { ProjectContext } from "@/contexts";
import { useContext, useState } from "react";
import { IconSave } from "../icons/Slidebarprojects/IconSave";
import { ModalDeleteProperty } from "../ModalDeleteProperty";
import { IconTrashBin } from "../icons";
import { PageContext } from "@/utils/pageContext";

type Props = {
  property: Property;
  task: Task;
  closeOption: () => void;
};
export const ContentPropertyModalTask = ({
  property,
  task,
  closeOption,
}: Props) => {
  const { setProject, project } = useContext(ProjectContext);
  const { pageId } = useContext(PageContext);
  const [modalDelete, setModalDelete] = useState(false);

  const deleteProperty = async (property: Property) => {
    try {
      let propertyV = task.properties.find(
        (prop) => property.id == prop.property.id
      );
      task.properties.splice(task.properties.indexOf(propertyV!, 1));
      let taskReturned = await taskService.upDate(task, project!.id);
      let page = project?.pages.find((page) => pageId == page.id);
      let taskR = page?.tasks.find((taskD) => taskD.task.id == task.id);

      taskR!.task = taskReturned;

      setProject!({ ...project! });
    } catch (error) {
      console.log(error);
    }
  };

  const upDateProperty = async (property: Property, getValues: any) => {
    try {
      let v;
      if (
        [
          TypeOfProperty.TIME,
          TypeOfProperty.USER,
          TypeOfProperty.ARCHIVE,
          TypeOfProperty.NUMBER,
          TypeOfProperty.PROGRESS,
          TypeOfProperty.TEXT,
        ].includes(property.type)
      ) {
        const limited = new Limited(
          property.id,
          property.name,
          property.type,
          getValues.visible,
          getValues.obligatory,
          getValues.maximum
        );
        v = await propertyService.updateLimited(project!.id, limited);
      } else if (
        [
          TypeOfProperty.CHECKBOX,
          TypeOfProperty.TAG,
          TypeOfProperty.RADIO,
          TypeOfProperty.SELECT,
        ].includes(property.type)
      ) {
        v = await propertyService.updateSelect(
          project!.id,
          new Select(
            property.id,
            property.name,
            property.type,
            getValues.visible,
            getValues.obligatory,
            (property as Select).options
          )
        );
      } else {
        v = await propertyService.updateDate(
          project!.id,
          new Date(
            property.id,
            property.name,
            property.type,
            getValues.visible,
            getValues.obligatory,
            getValues.pastDate,
            getValues.hours,
            getValues.deadline,
            getValues.schedule,
            getValues.color
          )
        );
      }
      let propertyV = task.properties.find(
        (prop) => property.id == prop.property.id
      );
      propertyV!.property = v;

      setProject!({ ...project! });
    } catch (error) {
      console.log(error);
    }
  };

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      visible: property.visible,
      obligatory: property.obligatory,
      maximum: (property as Limited).maximum,
      pastDate: (property as Date).canBePass,
      schedule: (property as Date).scheduling,
      hours: (property as Date).includesHours,
      deadline: (property as Date).deadline,
    },
  });
  return (
    <div className="flex flex-col">
      <ContentModalProperty
        register={register}
        property={property}
        type={property.type}
      ></ContentModalProperty>
      <div className="flex justify-between">
        <button
          className="w-5 h-5/6 flex justify-center items-center rounded-sm stroke-primary dark:stroke-secondary"
          onClick={() => {
            setModalDelete(true);
          }}
        >
          {" "}
          <IconTrashBin />
        </button>
        <button
          className="w-5 h-5/6 flex justify-center items-center rounded-sm"
          onClick={() => {
            try {
              upDateProperty(property, getValues());
              // setOpenOptions(false);
            } catch (e) {
              console.log(e);
            }
          }}
        >
          <IconSave />
        </button>
      </div>
      {modalDelete && (
        <ModalDeleteProperty
          property={property}
          deleteProperty={deleteProperty}
          isClosed={modalDelete}
          close={setModalDelete}
          closeProperty={() => closeOption}
        />
      )}
    </div>
  );
};
