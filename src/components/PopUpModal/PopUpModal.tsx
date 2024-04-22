import { PageContext } from "@/utils/pageContext";
import { useContext } from "react";
import { LocalModal } from "../Modal";
import { TaskModalContext } from "@/utils/TaskModalContext";
import { projectService, taskService } from "@/services";
import { Task, TaskOrdered } from "@/models";
import { ProjectContext } from "@/contexts";
import { useTranslation } from "next-i18next";

type Props = {
  condition: boolean;
  setCondition: (value: boolean) => void;
  modalProp: boolean;
  setModalProp: (value: boolean) => void;
  user?: string;
};

export const PopUpModal = ({
  condition,
  setCondition,
  modalProp,
  setModalProp,
  user,
}: Props) => {
  const { setInPage, pageId } = useContext(PageContext);
  const { setIsOpen, setSelectedTask } = useContext(TaskModalContext);
  const { project, setProject } = useContext(ProjectContext);
  const {t} = useTranslation()

  async function createTask() {
    setCondition(false);
    setIsOpen!(true);
    if (!project || !pageId) return;
    let task: Task = await taskService.insert(project.id, pageId);
    let projectPromise = await projectService.findOne(project.id)
    setProject!(projectPromise)
    task.comments = []
    setSelectedTask!(task!);
  }

  return (
    <LocalModal condition={condition} right bottom setCondition={setCondition}>
      <div className=" bg-white dark:bg-modal-grey text-[#343434] dark:text-white w-[300px] flex flex-col  p-4 gap-2 rounded-md">
        <p
          className="text-[14px] font-montserrat"
          onClick={() => {
            setCondition(false);
            setModalProp(true);
          }}
        >
          {t('property-registration')}
        </p>
        <div className="h-[2px] w-full bg-input-grey"></div>

        <p
          className="text-[14px] font-montserrat"
          onClick={() => {
            createTask();
          }}
        >
          {t('task-registration')}
        </p>
      </div>
    </LocalModal>
  );
};
