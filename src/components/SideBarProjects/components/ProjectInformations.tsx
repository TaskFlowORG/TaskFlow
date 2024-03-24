import { If } from "@/components/If";
import { archiveToSrc } from "@/functions";
import { Project } from "@/models";
interface Props {
  project?: Project;
}
export const ProjectInformations = ({ project }: Props) => {
  const src = archiveToSrc(project?.picture!);
  return (
    <div className="w-full h-16 flex items-center justify-around rounded-md">
      <If condition={src != ""}>
        <img src={src} />
        <div className="bg-zinc-200 dark:bg-zinc-500   w-16 h-16 rounded-md"></div>
      </If>
      <div>
        <p
          className="h4 text-primary truncate dark:text-secondary"
          style={{ opacity: project?.name ? 1 : 0.5 }}
        >
          {project?.name ?? "Sem nome"}
        </p>
        <p
          className="p text-modal-grey dark:text-white truncate"
          style={{ opacity: project?.description ? 1 : 0.5 }}
        >
          {project?.description ?? "Sem descrição"}
        </p>
      </div>
    </div>
  );
};
