import {
  Date,
  DatePost,
  Limited,
  LimitedPost,
  Page,
  Project,
  Property,
  PropertyPost,
  Select,
  SelectPost,
  TypeOfProperty,
} from "@/models";
import { useCallback, useContext, useEffect, useState } from "react";
import { ModalRegisterProperty } from "../ModalRegisterProperty";
import { projectService, propertyService } from "@/services";
import { ModalProperty } from "../ModalProperty/ModalProperty";
import { useTranslation } from "next-i18next";
import { Button } from "../Button";
import { If } from "../If";
import { NeedPermission } from "../NeedPermission";
import { ProjectContext } from "@/contexts";
import { set } from "react-hook-form";
import { SideModal } from "../Modal";

type RegisterPropertyProps = {
  project: Project;
  page?: Page;
  setModalProperty: (value: boolean) => void;
  modalProperty: boolean;
};

export const RegisterProperty = ({
  project,
  page,
  setModalProperty,
  modalProperty,
}: RegisterPropertyProps) => {
  const [isInProject, setIsInProject] = useState<boolean>(true);
  const [propertiesArray, setPropertiesArray] = useState<Property[]>(
    isInProject ? project.properties : page?.properties || []
  );
  const { setProject } = useContext(ProjectContext);
  useEffect(() => {
    setPropertiesArray(
      isInProject ? project.properties : page?.properties || []
    );
  }, [isInProject, page, project]);

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
          project.id,
          new LimitedPost(
            name,
            selected,
            values.visible,
            values.obligatory,
            values.maximum,
            !isInProject ? undefined : project!,
            !isInProject && page ? [page] : []
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
          project.id,
          new SelectPost(
            name,
            selected,
            values.visible,
            values.obligatory,
            [],
            !isInProject ? undefined : project!,
            !isInProject && page ? [page] : []
          )
        );
      } else {
        propertyObj = await propertyService.saveDate(
          project.id,
          new DatePost(
            name,
            selected,
            values.visible,
            values.obligatory,
            values.pastDate,
            values.hours,
            !isInProject ? undefined : project!,
            !isInProject && page ? [page] : []
          )
        );
      }
      setPropertiesArray([...propertiesArray, propertyObj]);
      const projectTemp = await projectService.findOne(project.id);
      setProject!(projectTemp);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProperty = async (property: Property) => {
    try {
      propertyService.delete(project.id, property.id);
      setPropertiesArray(propertiesArray.filter((p) => p.id != property.id));
      const projectTemp = await projectService.findOne(project.id);
      setProject!(projectTemp);
    } catch (error) {
      console.log(error);
    }
  };
  const [modalPropertyRegister, setModalPropertyRegister] = useState(false);

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
        v = await propertyService.updateLimited(project.id, limited);
      } else if (
        [
          TypeOfProperty.CHECKBOX,
          TypeOfProperty.TAG,
          TypeOfProperty.RADIO,
          TypeOfProperty.SELECT,
        ].includes(property.type)
      ) {
        v = await propertyService.updateSelect(
          project.id,
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
          project.id,
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
      console.log("COMO ASSIM");

      const projectTemp = await projectService.findOne(project.id);
      setProject!({ ...projectTemp });
    } catch (error) {
      console.log(error);
    }
  };
  const { t } = useTranslation();

  const classesIn =
    "w-full h-8 rounded-t-md flex items-center justify-center bg-primary dark:bg-secondary text-contrast";
  const classesOut =
    "w-full h-8 rounded-t-md flex items-center justify-center bg-tranparent border-2 border-primary dark:border-secondary text-primary dark:text-secondary";

  return (
    <SideModal
      footer={
        <NeedPermission permission="create">
          <Button
            width="w-full "
            text={t("add-property")}
            fnButton={() => setModalPropertyRegister(true)}
            padding="p-2"
            paddingY="p-1"
            textSize="font-[14re]"
          />
        </NeedPermission>
      }
      header={
        <>
          <div className="h-min w-full flex justify-evenly items-center properties">
            <h4 className="h4 text-primary dark:text-secondary">
              {t("property")}
            </h4>
          </div>
          <If condition={page != undefined}>
            <div className="w-full h-min flex">
              <span
                className={isInProject ? classesIn : classesOut}
                onClick={() => setIsInProject(true)}
              >
                {t("project")}
              </span>
              <span
                className={!isInProject ? classesIn : classesOut}
                onClick={() => setIsInProject(false)}
              >
                {t("page")}
              </span>
            </div>
          </If>
          <div className={"w-full flex flex-col items-center gap-5 h-min "}>
            <ModalRegisterProperty
              postProperty={postProperty}
              open={modalPropertyRegister}
              project={project && project}
              page={page}
              close={() => {
                setModalPropertyRegister(false);
              }}
            />
          </div>
        </>
      }
      condition={modalProperty}
      setCondition={setModalProperty}
      right
    >
      <div className="w-full h-full flex flex-col overflow-y-scroll none-scrollbar">
        {propertiesArray.map((property, index) => {
          return (
            <ModalProperty
              key={index}
              property={property}
              deleteProperty={deleteProperty}
              upDateProperties={upDateProperty}
            />
          );
        })}
      </div>
    </SideModal>
  );
};
