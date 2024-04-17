import { useContext, useEffect, useState } from "react";
import { RangeInput } from "../RangeInput";
import { SectionFilter } from "./SectionFilter";
import { ProjectSimple } from "@/models";
import { UserContext } from "@/contexts/UserContext";
import { Button } from "../Button";
import { ProjectContext } from "@/contexts";

interface FilterProjectProps {
  projects?: ProjectSimple[];
  generateList: (projects?: ProjectSimple[]) => void;
}

export const FilterProject: React.FC<FilterProjectProps> = ({
  projects,
  generateList,
}) => {
  const [progress, setProgress] = useState<number | null>(null);
  const [qttyPages, setQttyPages] = useState<number | null>(null);
  const [qttyProperties, setQttyProperties] = useState<number | null>(null);
  const [qttyGroups, setQttyGroups] = useState<number | null>(null);
  const [isOwner, setIsOwner] = useState<boolean>();
  const { user } = useContext(UserContext);
  const{project} = useContext(ProjectContext);

  const cleanFilter = () => {
    setProgress(null);
    setQttyPages(null);
    setQttyProperties(null);
    setQttyGroups(null);
    setIsOwner(undefined);
  };

  useEffect(() => {
    generateList(
      projects?.filter((p) => {
        const progressIsOk = !progress || p.progress >= progress;
        const qttyPagesIsOk = !qttyPages || p.qttyPages >= qttyPages;
        const qttyGroupsIsOk = !qttyGroups || p.groups.length >= qttyGroups;
        const qttyPropertiesIsOk =
          !qttyProperties || p.qttyProperties >= qttyProperties;
        const ownerIsOk =
          isOwner === undefined ||
          (isOwner && p.owner?.username === user?.username) ||
          (!isOwner && p.owner?.username !== user?.username);
        return (
          progressIsOk &&
          ownerIsOk &&
          qttyPagesIsOk &&
          qttyPropertiesIsOk &&
          qttyGroupsIsOk
        );
      })
    );
  }, [progress, qttyPages, qttyProperties, qttyGroups, isOwner]);

  const maxPages = Math.max(
    ...projects?.map((p) => p.qttyPages ?? 0) ?? [0]
  );
  const maxProperties = Math.max(
    ...projects?.map((p) => p.qttyProperties ?? 0) ?? [0]
  );
  const maxGroups = Math.max(
    ...projects?.map((p) => p.groups.length) ?? [0]
  );

  return (
    <div className="h-min w-60 p-4 rounded-md text-[16px] overflow-y-auto 
    bg-input-grey dark:bg-modal-grey text-modal-grey dark:text-white">
      <div className="flex flex-col gap-2">
        <SectionFilter
          number={progress}
          percentage
          max={100}
          setNumber={setProgress}
          step={0.01}
          title="Progresso"
        />
        <SectionFilter
          number={qttyPages}
          max={maxPages}
          setNumber={setQttyPages}
          step={1}
          title="Quantidade de Páginas"
        />
        <SectionFilter
          number={qttyProperties}
          max={maxProperties}
          setNumber={setQttyProperties}
          step={1}
          title="Quantidade de Propriedades"
        />
        <SectionFilter
          number={qttyGroups}
          max={maxGroups}
          setNumber={setQttyGroups}
          step={1}
          title="Quantidade de Grupos"
        />
      </div>
      <p>Dono/Membro</p>
      <div className="flex justify-between h-min items-center">
        <input
          onChange={(e) => setIsOwner(undefined)}
          type="radio"
          name="filterOwner"
          checked={isOwner === undefined}
          id="all"
        />
        <label htmlFor="all">Todos</label>
        <input
          onChange={(e) => setIsOwner(true)}
          type="radio"
        checked={isOwner === true}
          name="filterOwner"
          id="owner"
        />
        <label htmlFor="owner">Dono</label>
        <input
          onChange={(e) => setIsOwner(false)}
          type="radio"
            checked={isOwner === false}
          name="filterOwner"
          id="member"
        />
        <label htmlFor="member">Membro</label>
      </div>
      <span className="w-full flex justify-end pt-2">
        
      <Button fnButton={cleanFilter} paddingY="py-2" font="text-[13px]" text={"Limpar"} />{" "}
      </span>
    </div>
  );
};
