import { ProjectContext } from "@/contexts";
import {
  Archive,
  Limited,
  Project,
  Property,
  PropertyValue,
  Task,
} from "@/models";
import { projectService, propertyValueService } from "@/services";
import { PageContext } from "@/utils/pageContext";
import { useContext, useEffect, useState } from "react";
import { archiveToDownload } from "@/functions";

import { useTranslation } from "next-i18next";
import { NeedPermission } from "../NeedPermission";
import { useHasPermission } from "@/hooks/useHasPermission";
import { valuesOfObjects } from "@/functions/modalTaskFunctions/valuesOfObjects";
import { isProject } from "@/functions/modalTaskFunctions/isProject";
import Image from "next/image";
import { TaskModalContext } from "@/utils/TaskModalContext";
import { DownloadIcon } from "./DownloadIcon";

interface Props {
  id: number;
  name: string;
  value: Archive;
  isInModal?: boolean;
  propertyValue: PropertyValue;
  task: Task | Project;
  property: Property;
}

export const FileFilter = ({ propertyValue, property, task, value }: Props) => {
  const [file, setFile] = useState<Archive | null>(null);
  const [src, setSrc] = useState("");
  const [name, setName] = useState<string>("");
  const [error, setError] = useState(false);

  const { setSelectedTask } = useContext(TaskModalContext);

  const { project, setProject } = useContext(ProjectContext);
  const { pageId } = useContext(PageContext);
  const { t } = useTranslation();
  const hasPermission = useHasPermission("update");

  const handleFileChange = async (event: any) => {
    // Obtém o arquivo do evento
    const selectedFile: File = event.target.files[0];
    let size = event.target.files[0].size / (1024 * 1024);
    if (
      (property as Limited).maximum != undefined &&
      size > (property as Limited).maximum
    ) {
      setError(true);
    } else {
      setError(false);

      // setName(bah.value.name);
      // setSrc(archiveToDownload(bah.value));
      if (!isProject(task)) {
        let bah = await propertyValueService.updateArchiveInTask(
          selectedFile,
          project!.id,
          propertyValue.id!
        );

        setName(selectedFile.name);
        propertyValue.value = bah;
        let page = project?.pages.find((page) => page.id == pageId);
        let taskPage = page?.tasks.find((taskD) => taskD.task.id == task.id);
        let propValued = valuesOfObjects(task).find(
          (prop) => prop.property.id == property.id
        );
        if (propValued?.value) {
          propValued.value = propertyValue.value;
        }
        taskPage!.task = task as Task;
        setSelectedTask!({ ...task } as Task);
        setSrc(archiveToDownload(bah.value));
        setProject!({ ...project! });
      } else {
        let bah = await propertyValueService.updateArchive(
          selectedFile,
          project!.id,
          propertyValue.id!
        );
        console.log(bah)
        setName(selectedFile.name);
        propertyValue.value = bah;
        let propValued = valuesOfObjects(task).find(
          (prop) => prop.property.id == property.id
        );
        if (propValued?.value) {
          propValued.value = propertyValue.value;
        }
        if (propValued?.value) {
          propValued.value = propertyValue.value;
        }

        setSrc(archiveToDownload(bah.value));
        setProject!({ ...project! });
      }

      // Atualiza o estado com o arquivo selecionado
    }
  };

  useEffect(() => {
    setFile(value);
    setSrc(archiveToDownload(value));
  }, [value]);
  useEffect(() => {
    setFile(value);
  }, [value, propertyValue, task, handleFileChange]);

  return (
    <>
      <div className="flex items-center justify-end gap-8  pr-1 w-min">
        {file && (
          <>
            <div className="flex gap-2 items-center">
              <a
                className="w-4 aspect-square text-primary dark:text-secondary"
                href={src}
                download={value.name}
              >
                <DownloadIcon></DownloadIcon>
              </a>

              <p className="text-black dark:text-white text-p14  w-[200px] truncate ">
                {file.name ? file.name : name}
              </p>
            </div>
            <NeedPermission permission="update">
              <button className="w-[23px] aspect-square bg-primary dark:bg-secondary rounded-md relative flex items-center justify-center  text-white">
                <Image src="/change.svg" width={8} height={8} alt="change" />
                <input
                  onChange={handleFileChange}
                  type="file"
                  className="opacity-0 w-8 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
                />
              </button>
            </NeedPermission>
          </>
        )}

        {!file && hasPermission && (
          <button className="py-1 truncate  flex  px-2 bg-primary dark:bg-secondary rounded-lg relative  text-contrast">
            {t("browse-files")}
            <input
              onChange={handleFileChange}
              type="file"
              className="opacity-0 w-full absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
            />
          </button>
        )}
      </div>
      {error && (
        <p className="text-xs text-red-600 dark:text-pink-500 font-montserrat">
          {t("file-size-exceeded")}
        </p>
      )}
    </>
  );
};
