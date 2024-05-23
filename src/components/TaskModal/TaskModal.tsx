import { CenterModal } from "../Modal";
import { Project, Task, User } from "@/models";
import { TaskModalContent } from "./TaskModalContent";

type isOpenBro = {
  isOpen: boolean;
  setIsOpen: (boolean: boolean) => void;
  task: Task | Project;
  user: User;
};

export const TaskModal = ({ setIsOpen, isOpen, task, user }: isOpenBro) => {
  return (
    <CenterModal
      // stylesTailwind={" w-[1308px] w-max p-12"}
      stylesTailwind={
        "2xl:max-w-[1308px] xl:max-w-[1000px] w-max h-[70%] md:w-3/5 lg:w-[85%] lg:h-min w-[85%] shadow-blur-10 p-12"
      }
      condition={isOpen}
      setCondition={() => {
        setIsOpen(false);
      }}
    >
      {task && (
        <TaskModalContent
          task={task}
          user={user}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          isInModal={true}
        />
      )}
    </CenterModal>
  );
};