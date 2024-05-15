"use client";
import { CardDate } from "./CardProperties/CardDate";

import { CardTag } from "./CardProperties/CardTags";
import { CardRadio } from "./CardProperties/CardRadio";
import { CardText } from "./CardProperties/CardText";
import { MouseEventHandler, useContext, useEffect, useState } from "react";
import { CardSelect } from "./CardProperties/CardSelect";
import { ProgressBar } from "../ProgressBar";
import {
  ArchiveValued,
  MultiOptionValued,
  PropertyValue,
  Task,
  TextValued,
  TypeOfProperty,
  UniOptionValued,
  User,
} from "@/models";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { If } from "../If";
import { taskService } from "@/services";
import { ProjectContext } from "@/contexts";
import { UserContext } from "@/contexts/UserContext";
import { CardUser } from "./CardProperties/CardUser";
import { CardNumber } from "./CardProperties/CardNumber";
import { CardProgress } from "./CardProperties/CardProgress";
import { CardCheckbox } from "./CardProperties/CardCheckbox";
import { CardFile } from "./CardProperties/CardFile";
import { CardTime } from "./CardProperties/CardTime";

interface Props {
  task: Task;
  min?: boolean;
  user: User;
}
export const CardContent = ({ task, user }: Props) => {
  function is(property: PropertyValue, type: TypeOfProperty) {
    return property.property.type == type && property.property.visible == true;
  }
  const { t } = useTranslation();
  const [localTask, setLocalTask] = useState<Task>(task);
  const {project, setProject} = useContext(ProjectContext)

  const clickComplete = async (e:any) => {
    if(project?.owner.id != user?.id) return;
    e.stopPropagation();
    e.preventDefault();
    console.log("clickComplete", e)
    if(task.completed || !project || !setProject) return
    const updatedTask = await taskService.complete(task.id,project.id)
    setLocalTask(updatedTask)
    const pages = project.pages
    const pageWithTask = pages.find(page => page.tasks.find(t => t.id === task.id))
    if(pageWithTask){
      const taskIndex = pageWithTask.tasks.findIndex(t => t.task.id === task.id)
      pageWithTask.tasks[taskIndex].task = updatedTask
      const pageIndex = pages.findIndex(p => p.id === pageWithTask.id)
      pages[pageIndex] = pageWithTask
      setProject({...project, pages})
    }


  }

  useEffect(() => {
    setLocalTask(task);
  }, [task]);


  return (
    <>
      <div className="flex justify-between items-center gap-2">
        <If condition={localTask.completed || localTask.waitingRevision}>

        <span className={"w-8 relative h-8 " + (localTask.waitingRevision && !localTask.completed ? "animate-pulse" : "")}
        onMouseUp={clickComplete}>
          <Image src="/Assets/completed.svg" alt="Completed" layout="fill" />
        </span>
        </If>
        <h4
          style={{ opacity: localTask.name ? 1 : 0.25 }}
          className="text-h5 font-alata w-full truncate text-black dark:text-white"
        >

          {task.name != null
            ? task.name.length > 0
              ? task.name
              : t("withoutname")
            : t("withoutname")}
        </h4>

        {task.properties.find(
          (prop) => prop.property.type == TypeOfProperty.USER
        ) && (
          <CardUser
            users={
              task.properties.find(
                (prop) => prop.property.type == TypeOfProperty.USER
              )?.value.value
            }
          />
        )}
      </div>
      <div className="flex flex-wrap gap-1 w-full [&_*]:font-montserrat justify-between">
        {localTask.properties?.map((property) => {
          if (
            is(property, TypeOfProperty.TEXT) &&
            (property.value as TextValued).value
          ) {
            return (
              <CardText
                showNameProperty={user.configuration.showPropertiesName}
                property={property.property.name}
                key={property.property.id.toString()}
                text={(property.value as TextValued).value}
              />
            );
          } else if (
            is(property, TypeOfProperty.DATE) &&
            property.value.value
          ) {
            return (
              <CardDate
                showNameProperty={user.configuration.showPropertiesName}
                key={property.property.id.toString()}
                date={property.value.value}
                property={property.property.name}
              />
            );
          } else if (
            is(property, TypeOfProperty.SELECT) &&
            (property.value as UniOptionValued).value?.name
          ) {
            return (
              <CardSelect
                showNameProperty={user.configuration.showPropertiesName}
                property={property.property.name}
                color={(property.value as UniOptionValued).value?.color}
                key={property.property.id.toString()}
                value={(property.value as UniOptionValued).value?.name}
              />
            );
          } else if (
            is(property, TypeOfProperty.CHECKBOX) &&
            (property.value as MultiOptionValued).value.length > 0
          ) {
            return (
              <CardCheckbox
                showNameProperty={user.configuration.showPropertiesName}
                nameProperty={property.property.name}
                key={property.property.id.toString()}
                tags={(property.value as MultiOptionValued).value}
              />
            );
          } else if (
            is(property, TypeOfProperty.TAG) &&
            (property.value as MultiOptionValued).value.length > 0
          ) {
            return (
              <CardTag
                showNameProperty={user.configuration.showPropertiesName}
                nameProperty={property.property.name}
                key={property.property.id.toString()}
                tags={(property.value as MultiOptionValued).value}
              />
            );
          } else if (
            is(property, TypeOfProperty.RADIO) &&
            property.value.value
          ) {
            return (
              <CardRadio
              color={(property.value as UniOptionValued).value?.color}
                showNameProperty={user.configuration.showPropertiesName}
                key={property.property.id.toString()}
                property={property.property.name}
                value={(property.value as UniOptionValued).value?.name}
              />
            );
          }  else if (is(property, TypeOfProperty.ARCHIVE)) {
            return (
              <CardFile
                showNameProperty={user.configuration.showPropertiesName}
                property={property.property.name}
                key={property.property.id.toString()}
                name={(property.value as ArchiveValued).value?.name as string}
              />
            );
          } else if (is(property, TypeOfProperty.NUMBER)) {
            return (
              <CardNumber
                showNameProperty={user.configuration.showPropertiesName}
                key={property.property.id.toString()}
                property={property.property.name}
                number={property.value.value}
              />
            );
          } else if (is(property, TypeOfProperty.TIME)) {
            return (
              <CardTime
                showNameProperty={user.configuration.showPropertiesName}
                key={property.property.id.toString()}
                property={property.property.name}
                time={property.value.value}
              />
            );
          }
        })}
        {task.properties?.map((property) => {
          if (is(property, TypeOfProperty.PROGRESS)) {
            return (
              <CardProgress
                showNameProperty={user.configuration.showPropertiesName}
                key={property.property.id.toString()}
                property={property.property.name}
                percent={property.value.value}
              />
            );
          }
        })}
      </div>
    </>
  );
};
