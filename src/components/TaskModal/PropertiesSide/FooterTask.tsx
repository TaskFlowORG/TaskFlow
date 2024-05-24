import { IconTrashBin } from "@/components/icons";
import { Buttons } from "../Buttons";
import { NeedPermission } from "@/components/NeedPermission";
import { useContext } from "react";
import { TaskModalContext } from "@/utils/TaskModalContext";
import { isProject } from "@/functions/modalTaskFunctions/isProject";
import { Task } from "@/models";
import { ProjectContext } from "@/contexts";
import { UserContext } from "@/contexts/UserContext";
import { useIsDisabled } from "@/functions/modalTaskFunctions/isDisabled";

type Props = {
  updateTask: () => void;
  deleteTask: () => void;
};

export const FooterTask = ({ deleteTask, updateTask }: Props) => {
  const { task } = useContext(TaskModalContext);
  const { project } = useContext(ProjectContext);
  const { user } = useContext(UserContext);
  const isDisabled = useIsDisabled(true, "delete");
  return (
    <div className="flex justify-between items-center w-full  pt-4 md:pt-6 lg:pt-0">
      {!isDisabled && (
        <NeedPermission permission="delete">
          <div
            className="p-2 mr-1 self-end justify-center min-h-full items-center flex rounded-lg bg-primary dark:bg-secondary"
            onClick={deleteTask}
          >
            <div className=" w-3 md:w-[18px] aspect-square  stroke-contrast">
              <IconTrashBin></IconTrashBin>
            </div>
          </div>
        </NeedPermission>
      )}
      {((!(task as Task)?.completed && task && !isProject(task)) ||
        (!(task as Task)?.completed && project?.owner?.id == user?.id)) && (
        <NeedPermission permission="update">
          <Buttons updateTask={updateTask} />
        </NeedPermission>
      )}
    </div>
  );
};
