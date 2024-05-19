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
import { ValueSelector } from "../ValueSelector";

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
  const { project, setProject } = useContext(ProjectContext);

  const clickComplete = async (e: any) => {
    if (project?.owner.id != user?.id) return;
    e.stopPropagation();
    e.preventDefault();
    if (task.completed || !project || !setProject) return;
    const updatedTask = await taskService.complete(task.id, project.id);
    setLocalTask(updatedTask);
    const pages = project.pages;
    const pageWithTask = pages.find((page) =>
      page.tasks.find((t) => t.id === task.id)
    );
    if (pageWithTask) {
      const taskIndex = pageWithTask.tasks.findIndex(
        (t) => t.task.id === task.id
      );
      pageWithTask.tasks[taskIndex].task = updatedTask;
      const pageIndex = pages.findIndex((p) => p.id === pageWithTask.id);
      pages[pageIndex] = pageWithTask;
      setProject({ ...project, pages });
    }
  };

  useEffect(() => {
    setLocalTask(task);
  }, [task]);

  return (
    <>
      <div className="flex justify-between items-center gap-2">
        <If condition={localTask.completed || localTask.waitingRevision}>
          <span
            className={
              "w-8 relative h-8 " +
              (localTask.waitingRevision && !localTask.completed
                ? "animate-pulse"
                : "")
            }
            onMouseUp={clickComplete}
          >
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

        {task.properties?.find(
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
          return (
            <ValueSelector
              property={property}
              key={property.id}
              showNames={user.configuration.showPropertiesName}
            />
          );
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
