import { PageContext } from "@/utils/pageContext";
import { useContext } from "react";
import { LocalModal } from "../Modal";
import { TaskModalContext } from "@/utils/TaskModalContext";
import { taskService } from "@/services";
import { Task, TaskOrdered } from "@/models";

type Props = {
  condition: boolean;
  setCondition: (value: boolean) => void;
  modalProp: boolean;
  setModalProp: (value: boolean) => void;
  user?:string
};


export const PopUpModal = ({
  condition,
  setCondition,
  modalProp,
  setModalProp,
  user
}: Props) => {


  async function createTask(){
    setCondition(false);
    setIsOpen!(true);
    let task:Task = (await taskService.insert(pageId!, user!))
    setSelectedTask!(task!)
  } 
   const { setInPage, pageId } = useContext(PageContext);
  const { setIsOpen, setSelectedTask } = useContext(TaskModalContext);

  return (
    <LocalModal condition={condition} right setCondition={setCondition}>
      <div className=" bg-white w-[300px] flex flex-col  p-4 gap-2 rounded-md">
        <p
          className="text-[14px] font-montserrat"
          onClick={() => {
            setCondition(false);
            setModalProp(true);
          }}
        >
          Cadastro de propriedade
        </p>
        <div className="h-[2px] w-full bg-input-grey"></div>

        <p
          className="text-[14px] font-montserrat"
          onClick={() => {
            createTask()

          }}
        >
          Cadastro de tarefa
        </p>
      </div>
    </LocalModal>
  );
};
