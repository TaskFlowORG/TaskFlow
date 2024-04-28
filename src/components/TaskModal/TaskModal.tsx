import { CenterModal } from "../Modal";
import { Task, User } from "@/models";
import { TaskModalContent } from "./TaskModalContent";

type isOpenBro = {
  isOpen: boolean;
  setIsOpen: (boolean: boolean) => void;
  task: Task;
  user: User;
};

export const TaskModal = ({ setIsOpen, isOpen, task, user }: isOpenBro) => {
  return (
    <CenterModal
      // stylesTailwind={" w-[1308px] w-max p-12"}
      stylesTailwind={"2xl:w-[1308px] xl:w-[1000px] w-max  shadow-blur-10 p-12"}
      condition={isOpen}
      setCondition={() => {
        setIsOpen(false);
      }}
    >
      <TaskModalContent
        task={task}
        user={user}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isInModal={true}
      />
    </CenterModal>
  );
};
