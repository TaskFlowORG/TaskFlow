import { pageService } from "@/services";
import { useState } from "react";
import { Page, PagePost, Project, TypeOfPage } from "@/models";
import { If } from "@/components/If";
import { TypeOfPageComponent } from "@/components/TypeOfPageComponent";
import { PageComponent } from "@/components/PageComponent";
import { Button } from "@/components/Button";
import { LocalModal } from "@/components/Modal";
import { ProjectInformations } from "./ProjectInformations";
import { Navigate } from "./Navigate";
import { any } from "zod";

interface Props {
  project: Project;
  user: string;
  setModalPages: (value: boolean) => void;
}

export const PageSide = ({ project, user, setModalPages }: Props, {typeOfModal}:any={}) => {
  const [pageMerging, setPageMerging] = useState<Page>();
  const [listMerge, setListMerge] = useState<Page[]>([]);
  const [modal, setModal] = useState(false);
  const [type, setType] = useState<TypeOfPage>(TypeOfPage.KANBAN);
  const [merging, setMerging] = useState(false);

  const merge = () => {
    console.log(listMerge, pageMerging);
    pageService.merge(listMerge, pageMerging!.id);
    setListMerge([]);
    setMerging(false);
    setPageMerging(undefined);
  };

  const insert = async () => {
    await pageService.insert(new PagePost("Nova Página", type, project));
  };
  return (
    <span className="flex flex-col max-h-screen gap-14 pt-[4.5rem] h-full p-4 bg-white dark:bg-modal-grey shadow-blur-10 w-96 px-16">
        <Navigate modalPages setCondition={setModalPages} />
      <ProjectInformations project={project} />
      <div className="flex flex-col w-72 justify-center items-center h-4/6 gap-8     ">
        <div className=" flex items-start  h-[95%] w-full overflow-y-auto">
          <div className="flex flex-col gap-3 items-start max-w-full h-min w-full">
            {project?.pages.map((page) => {
              return (
                <div
                  key={page.id}
                  className="flex gap-[1.15rem] w-full items-center"
                >
                  <If condition={merging && pageMerging != page}>
                    <input
                      type="checkbox"
                      id={`${page.id}`}
                      value={page.id}
                      onChange={(e) => {
                        if (e.target.checked) {
                          listMerge.push(page);
                        } else {
                          listMerge.splice(listMerge.indexOf(page), 1);
                        }
                      }}
                      className="w-5 h-5"
                    />
                  </If>
                  <PageComponent
                    page={page}
                    username={user}
                    project={project}
                    merging={merging}
                    pageMerging={page == pageMerging}
                    setMerging={setMerging}
                    listMerge={listMerge}
                    setPageMerging={setPageMerging}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="h-min relative">
          <If condition={merging}>
            <div className="flex">
              <Button
                width="w-64"
                text="Cancelar"
                fnButton={() => {
                  setListMerge([]);
                  setMerging(false);
                  setPageMerging(undefined);
                }}
                padding="p-2"
                paddingY="p-1"
                textSize="font-[14re]"
              />
              <Button
                width="w-64"
                text="Conectar"
                fnButton={merge}
                padding="p-2"
                paddingY="p-1"
                textSize="font-[14re]"
                secondary
              />
            </div>
            <Button
              width="w-64 "
              text="Adicionar Página"
              fnButton={() => setModal(true)}
              padding="p-2"
              paddingY="p-1"
              textSize="font-[14re]"
            />
          </If>
          <LocalModal condition={modal} setCondition={setModal} bottom>
            <TypeOfPageComponent
              changingType={modal}
              setType={setType}
              setChangingType={setModal}
              closeModals={() => setModal(false)}
              changeType={insert}
            />
          </LocalModal>
        </div>
      </div>
    </span>
  );
};
