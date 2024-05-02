import { PdfIcon } from "@/components/icons/PdfIcon";
import { Task } from "@/models";

type HistoricSectionProps = {
  task: Task;
};

export const HistoricSection = ({ task }: HistoricSectionProps) => {
  const handleClick = () => {
    console.log("Í A FUNÇÃO AQUI MAN, NÃO ESQUECE");
  };

  return (
    <div className=" flex flex-col gap-6">
      <div className="flex flex-col gap-6 h-[442px] overflow-auto pr-8 bah">
        {task.logs.map((log) => {
          return (
            <div
              key={log.id}
              className="flex flex-col w-full gap-1 items-end relative"
            >
              <p className="font-montserrat focus:font-semibold  text-p outline-none text-[#343434] dark:text-[#f2f2f2]">
                {log.action}
              </p>
              <div className="h-[2px]  w-1/2 bg-[#D9D9D9]"></div>
              <p className="font-montserrat focus:font-semibold  text-mn outline-none text-[#343434] dark:text-[#f2f2f2]">
                {log.action}
              </p>
            </div>
          );
        })}
      </div>
      <p
        onClick={handleClick}
        className="lg:text-p text-p14 w-full flex gap-2 items-center justify-center  text-white border-[1px] shadow-comment bg-primary dark:bg-secondary flex-1 font-alata px-3 py-[10px] rounded-lg"
      >
        Gerar Relatório
        <PdfIcon />
      </p>
    </div>
  );
};
