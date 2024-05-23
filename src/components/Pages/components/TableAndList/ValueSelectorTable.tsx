import { CardSelect } from "@/components/CardContent/CardProperties/CardSelect";
import { Tag } from "@/components/CardContent/CardProperties/Tag";
import { If } from "@/components/If";
import { Obj } from "@/components/Obj";
import { ValueSelector } from "@/components/ValueSelector";
import { IconArchive } from "@/components/icons";
import { ProjectContext } from "@/contexts";
import { UserContext } from "@/contexts/UserContext";
import { generateContrast } from "@/functions";
import {
  Property,
  PropertyValue,
  TypeOfProperty,
  OtherUser,
  Option,
  TaskOrdered,
  ArchiveValued,
  Archive,
  TimeValued,
  Task,
  TaskPage,
} from "@/models";
import { taskService } from "@/services";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";

interface Props {
  justName: boolean;
  property?: Property;
  propVl?: PropertyValue;
  l: TaskOrdered;
}
export const ValueSelectorTable = ({
  justName,
  property,
  propVl,
  l,
}: Props) => {
  function generateList(
    value: PropertyValue | null | undefined
  ): Array<Option> {
    let list = new Array<Option>();
    if (!value) return list;
    if (
      value.property.type == TypeOfProperty.CHECKBOX ||
      value.property.type == TypeOfProperty.TAG
    ) {
      let val = value.value.value as Option[];
      for (let opt of val) {
        list.push(opt);
      }
    }
    return list;
  }
  const { project, setProject } = useContext(ProjectContext);
  const { t } = useTranslation();

  const [localTask, setLocalTask] = useState<Task>(l.task);

  useEffect(() => {
    setLocalTask(l.task);
  }, [l]);

  const { user } = useContext(UserContext);

  const clickComplete = async (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    if (project?.owner.id != user?.id) return;
    if (localTask.completed || !project || !setProject) return;
    const updatedTask = await taskService.complete(localTask.id, project.id);
    const pages = project.pages;
    setLocalTask(updatedTask);
    const pageWithTask = pages.find((page) =>
      page.tasks.find((t) => t.id === localTask.id)
    );
    if (pageWithTask) {
      const taskIndex = pageWithTask.tasks.findIndex(
        (t) => t.task.id === localTask.id
      );
      pageWithTask.tasks[taskIndex].task = updatedTask;
      const pageIndex = pages.findIndex((p) => p.id === pageWithTask.id);
      pages[pageIndex] = pageWithTask;
      setProject({ ...project, pages });
    }
  };

  return justName ? (
    <div
      className={
        "py-4 px-3 ml-4 gap-6 h-12 sm:h-16 select-none  justify-start items-center flex w-[98%]" +
        (localTask.name
          ? " text-zinc-600 dark:text-zinc-200"
          : " text-zinc-400 dark:text-zinc-500")
      }
    >
      <div className="bg-zinc-200 p-[0.35rem] text-white dark:text-zinc-200 dark:bg-zinc-600 w-min flex flex-col text-[0.5rem] rounded-full">
        <p>^</p>
        <p className="rotate-180">^</p>
      </div>
      <If condition={localTask.completed || localTask.waitingRevision}>
        <span
          className={
            "w-6 relative h-6 " +
            (localTask.waitingRevision && !localTask.completed
              ? "animate-pulse"
              : "")
          }
          onMouseUp={clickComplete}
        >
          <Image src="/Assets/completed.svg" alt="Completed" layout="fill" />
        </span>
      </If>
      <span className="w-min truncate text-mn font-montserrat">
        {localTask.name || t("withoutname")}
      </span>
    </div>
  ) : (
    <div
      className={
        "flex text-mn p ml-4 gap-4 p-3 h-14 w-[90%] [&_*]:text-mn [&_*]:font-montserrat items-center justify-start " +
        (propVl?.value.value
          ? " text-zinc-600 dark:text-zinc-200"
          : " text-zinc-400 dark:text-zinc-500")
      }
    >
      <ValueSelector property={propVl!} />

      <If condition={property?.type == TypeOfProperty.PROGRESS}>
        <div className="h-min w-min truncate">
          {propVl?.value.value ? propVl?.value.value + "%" : t("withoutvalue")}
        </div>
      </If>

      <If condition={property?.type == TypeOfProperty.USER}>
        <div className="relative w-full h-min">
          <Obj
            objs={propVl?.value.value as Array<OtherUser>}
            max={2}
            isOtherUser
            functionObj={() => {}}
          />
        </div>
      </If>
    </div>
  );
};