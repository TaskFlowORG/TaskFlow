import { If } from "@/components/If";
import { archiveToSrc } from "@/functions";
import { Project } from "@/models";
import { useTranslation } from "next-i18next";
import Image from "next/image";
interface Props {
  project?: Project;
}
export const ProjectInformations = ({ project }: Props) => {
  const src = archiveToSrc(project?.picture!);
  const {t} = useTranslation();

  return (
      <div className="w-full h-16 flex items-center justify-around rounded-md">
          <div className="bg-zinc-200 dark:bg-zinc-500 overflow-clip relative w-16 h-16 bg-clip-border rounded-md"><Image fill alt="Project Image" src={src} /></div>
        <div className="w-[calc(100%_-100px)]">
          <p
            className="text-h4 font-alata text-primary truncate dark:text-secondary w-full"
            style={{ opacity: project?.name ? 1 : 0.5 }}
          >
            {project?.name ?? t("withoutname")}
          </p>
          <p
            className="text-p font-montserrat text-modal-grey dark:text-white w-full truncate"
            style={{ opacity: project?.description ? 1 : 0.5 }}
          >
            {project?.description ?? t("withoutdescription")}
          </p>
        </div>

      </div>
  );
};
