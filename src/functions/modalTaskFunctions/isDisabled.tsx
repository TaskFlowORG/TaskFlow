import { ProjectContext } from "@/contexts";
import { UserContext } from "@/contexts/UserContext";
import { useHasPermission } from "@/hooks/useHasPermission";
import { Project, Task } from "@/models";
import { TaskModalContext } from "@/utils/TaskModalContext";
import { useContext } from "react";

export const useIsDisabled = (isInModal:boolean, action: 'read' | 'create' | 'delete' | 'update') => {
  const hasPermission = useHasPermission(action)
  const { task } = useContext(TaskModalContext);
  const { user } = useContext(UserContext);
  const { project } = useContext(ProjectContext);
  return !isInModal ? false: task?.completed || task?.waitingRevision ? true:  task == undefined ? !(project?.owner.id == user?.id) : !hasPermission;
  // return isInModal || task == undefined ? project?.owner.id == user?.id : (task?.completed || task?.waitingRevision) ? false : hasPermission 
};
