import { PdfIcon } from "@/components/icons/PdfIcon";
import { Task } from "@/models";
import { LogItem } from "./LogItem";

type HistoricSectionProps = {
  task: Task;
  isInModal: boolean;
};

export const HistoricSection = ({ task, isInModal }: HistoricSectionProps) => {
  const handleClick = () => {
    console.log("FUNÇÃO DE CHAMAR O PDF PO, NÃO ESQUECE!!");
  };

  return (
    <div className=" flex flex-col gap-6">
      <div className="flex flex-col gap-6 h-[442px] overflow-auto pr-8 bah">
        {task.logs.map((log) => {
          return (
            <LogItem item={task} isInModal={isInModal} key={log.id} log={log} />
          );
        })}
      </div>
      <p
        onClick={handleClick}
        className="lg:text-p  text-p14 w-full flex gap-2 items-center justify-center  text-white border-[1px] shadow-comment bg-primary dark:bg-secondary flex-1 font-alata px-3 py-[10px] rounded-lg"
      >
        Gerar Relatório
        <PdfIcon />
      </p>
    </div>
  );
};
