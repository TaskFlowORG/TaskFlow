import { ProjectContext } from "@/contexts";
import { Archive, Limited, Property, PropertyValue, Task } from "@/models";
import { propertyValueService } from "@/services";
import { PageContext } from "@/utils/pageContext";
import { useContext, useEffect, useState } from "react";
import { archiveToDownload } from "@/functions";

import { useTranslation } from "next-i18next";

interface Props {
  id: number;
  name: string;
  value: Archive;
  isInModal?: boolean;
  propertyValue: PropertyValue;
  task: Task;
  property:Property;
}

export const FileFilter = ({ propertyValue, property, task, value }: Props) => {
  const [file, setFile] = useState<Archive | null>(null);
  const [src, setSrc] = useState("");
  const [name, setName] = useState<string>("");
  const [error, setError] = useState(false);

  const { project, setProject } = useContext(ProjectContext);
  const { pageId } = useContext(PageContext);
  const { t } = useTranslation();

  const handleFileChange = async (event: any) => {
    // Obtém o arquivo do evento
    const selectedFile = event.target.files[0];
    console.log(event.target.files[0].size);
    let size = event.target.files[0].size / (1024 * 1024);
    console.log(size, "Soy o tamanho total");
    console.log(
      (property as Limited)?.maximum,
      "Soy o tamanho que devia"
    );
    if (size > (property as Limited)?.maximum) {
      console.log("Eu entrei aqui bro, rrelaxa pra karalho");
      setError(true);
    } else {
      setError(false);
      // console.log(size);
      let bah = await propertyValueService.updateArchiveInTask(
        selectedFile,
        project!.id,
        propertyValue.id!
      );
      propertyValue.value = bah;
      console.log(
        "e nkjdfbjk mz kcjgnfjk ndfjkg ndmkf nfkmdf ngnkfd jfd sdf d sd  sfd fd fds g s s ",
        bah
      );
      setName(bah.value.name);
      setSrc(archiveToDownload(bah.value));
      let page = project?.pages.find((page) => page.id == pageId);
      let taskPage = page?.tasks.find((taskD) => taskD.task.id == task.id);
      taskPage!.task = task;
      // setSrc(archiveToDownload(bah.value));
      setProject!({ ...project! });
      // Atualiza o estado com o arquivo selecionado
      console.log(propertyValue.value.value.name);
    }
  };

  useEffect(() => {
    setFile(value);
  }, []);
  useEffect(() => {
    setFile(value);
    console.log("value", value);
  }, [value, propertyValue, task, handleFileChange]);

  return (
    <>
      <div className="flex items-center justify-end gap-8  pr-1 ">
        {file && (
          <>
            <div className="flex gap-2">
              <a
                href={
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZEAAACrCAYAAACnt6EoAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJ6SURBVHhe7dUxAYAwEMDABxF4rAXM0wUDzXy3REKuZ73fAEBw/wWAYyYCQGYiAGQmAkBmIgBkJgJAZiIAZCYCQGYiAGQmAkBmIgBkJgJAZiIAZCYCQGYiAGQmAkBmIgBkJgJAZiIAZCYCQGYiAGQmAkBmIgBkJgJAZiIAZCYCQGYiAGQmAkBmIgBkJgJAZiIAZCYCQGYiAGQmAkBmIgBkJgJAZiIAZCYCQGYiAGQmAkBmIgBkJgJAZiIAZCYCQGYiAGQmAkBmIgBkJgJAZiIAZCYCQGYiAGQmAkBmIgBkJgJAZiIAZCYCQGYiAGQmAkBmIgBkJgJAZiIAZCYCQGYiAGQmAkBmIgBkJgJAZiIAZCYCQGYiAGQmAkBmIgBkJgJAZiIAZCYCQGYiAGQmAkBmIgBkJgJAZiIAZCYCQGYiAGQmAkBmIgBkJgJAZiIAZCYCQGYiAGQmAkBmIgBkJgJAZiIAZCYCQGYiAGQmAkBmIgBkJgJAZiIAZCYCQGYiAGQmAkBmIgBkJgJAZiIAZCYCQGYiAGQmAkBmIgBkJgJAZiIAZCYCQGYiAGQmAkBmIgBkJgJAZiIAZCYCQGYiAGQmAkBmIgBkJgJAZiIAZCYCQGYiAGQmAkBmIgBkJgJAZiIAZCYCQGYiAGQmAkBmIgBkJgJAZiIAZCYCQGYiAGQmAkBmIgBkJgJAZiIAZCYCQGYiAGQmAkBmIgBkJgJAZiIAZCYCQGYiAGQmAkBmIgBkJgJAZiIAZCYCQGYiAGQmAkBmIgBkJgJAZiIAZCYCQGYiAGQmAkBmIgBkJgJAZiIAZCYCQGYiAGQmAkBmIgBkJgJAZiIAZCYCQDSzAZxLA07oB5cZAAAAAElFTkSuQmCC"
                }
              >
                i
              </a>
              <p>{file.name ? value.name : "To sem nome caraio"}</p>
            </div>
            <button className="w-[23px] aspect-square bg-primary dark:bg-secondary rounded-md relative flex items-center justify-center  text-white">
              <img src="/change.svg" width={8} height={8} alt="" />
              <input
                onChange={handleFileChange}
                type="file"
                className="opacity-0 w-8 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
              />
            </button>
          </>
        )}

        {!file && (
          <button className="py-1 truncate  flex  px-2 bg-primary dark:bg-secondary rounded-lg relative  text-white">
            {t("browse-files")}
            <input
              onChange={handleFileChange}
              type="file"
              className="opacity-0 w-full absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
            />
          </button>
        )}
      </div>
      {error &&  <p className="text-xs text-red-600 font-montserrat"> Tamanho de arquivo maior que o permitido! </p>}
    </>
  );
};
