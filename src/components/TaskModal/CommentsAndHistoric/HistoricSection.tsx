import { PdfIcon } from "@/components/icons/PdfIcon";
import { Project, Task, User } from "@/models";
import { LogItem } from "./LogItem";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Report } from "@/components/Report";
import { useTheme } from "next-themes";
import { useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";

type HistoricSectionProps = {
  task: Task | Project;
  isInModal: boolean;
  user: User;
};

export const HistoricSection = ({
  task,
  isInModal,
  user,
}: HistoricSectionProps) => {

  const {t} = useTranslation()

  return (
    <div className={" flex flex-col gap-6 h-full justify-between " + 
    (isInModal ? "md:max-h-[calc(100%_-_185px)] max-h-full":"md:max-h-[calc(100%_-_67px)] max-h-full")}>
      <div className="flex flex-col gap-6  overflow-auto pr-8 bah thin-scrollbar h-full">
        {(task as Task).logs?.map((log) => {
          return (
            <LogItem item={task} isInModal={isInModal} key={log.id} log={log} />
          );
        })}
      </div>
      <PDFDownloadLink
        className="lg:text-p  text-p14 w-full flex gap-2 items-center justify-center  text-contrast border-[1px] shadow-comment bg-primary dark:bg-secondary flex-1 font-alata px-3 py-[10px] rounded-lg"
        document={<Report logged={task} user={user} isInProject={!isInModal} />}
        fileName={`${isInModal? t("task") : t("project")} #${task.id} - By ${user.name} ${user.surname}.pdf`}
      >
        {t('generate-report')}
        <PdfIcon />
      </PDFDownloadLink>
    </div>
  );
};
