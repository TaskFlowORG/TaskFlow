import { ProjectContext } from "@/contexts";
import { ArchiveValued, PropertyValue, Task } from "@/models";
import { propertyValueService } from "@/services";
import { PageContext } from "@/utils/pageContext";
import { useContext, useEffect, useState } from "react";

interface Props {
  id: number;
  name: string;
  value: any;
  isInModal?: boolean;
  propertyValue: PropertyValue;
  task: Task;
}

export const FileFilter = ({ propertyValue, task, value }: Props) => {
  const [file, setFile] = useState<any | null>(null);

  const { project, setProject } = useContext(ProjectContext);
  const { pageId } = useContext(PageContext);

  useEffect(() => {
    setFile(value);
  }, [value, propertyValue, task]);

  const handleFileChange = async (event: any) => {
    // Obtém o arquivo do evento
    const selectedFile = event.target.files[0];
    propertyValue.value = await propertyValueService.updateArchiveInTask(
      selectedFile,
      project!.id,
      propertyValue.id
    );
    console.log(
      "e nkjdfbjk mz kcjgnfjk ndfjkg ndmkf nfkmdf ngnkfd jfd sdf d sd  sfd fd fds g s s "
    );
    setFile(propertyValue.value.value);
    let page = project?.pages.find((page) => page.id == pageId);
    let taskPage = page?.tasks.find((taskD) => taskD.task.id == task.id);
    taskPage!.task = task;
    setProject!({ ...project! });
    // Atualiza o estado com o arquivo selecionado
    console.log(propertyValue.value.value.name);
  };

  return (
    <div className="flex items-center justify-end gap-8  pr-1 w-full">
      {file && (
        <>
          <div className="flex gap-2">
            <span>i</span>
            <p>{file && (value.name ?? propertyValue.value.value.name)}</p>
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
          Browse files
          <input
            onChange={handleFileChange}
            type="file"
            className="opacity-0 w-full absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
          />
        </button>
      )}
    </div>
  );
};
