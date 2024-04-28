import { pageService } from "@/services";
import { ChangeEvent, use, useContext, useState } from "react";
import { Page, PagePost, Project, TypeOfPage } from "@/models";
import { If } from "@/components/If";
import { TypeOfPageComponent } from "./TypeOfPageComponent";
import { PageComponent } from "./PageComponent";
import { Button } from "@/components/Button";
import { LocalModal } from "@/components/Modal";
import { ProjectInformations } from "./ProjectInformations";
import { Navigate } from "./Navigate";
import { any } from "zod";
import { ProjectContext } from "@/contexts";
import { useRouter } from "next/navigation";
import { useTranslation } from "next-i18next";
import { NeedPermission } from "@/components/NeedPermission";

interface Props {
  project: Project;
  user: string;
  setModalPages: (value: boolean) => void;
}


export const PageSide = (
  { project, user, setModalPages }: Props,
  { typeOfModal }: any = {}
) => {
  const [pageMerging, setPageMerging] = useState<Page>();
  const [listMerge, setListMerge] = useState<Page[]>([]);
  const [modal, setModal] = useState(false);
  const [type, setType] = useState<TypeOfPage>(TypeOfPage.KANBAN);
  const [merging, setMerging] = useState(false);
  const { setProject } = useContext(ProjectContext);
  const {t} = useTranslation();
  const route = useRouter();

  const merge = () => {
    console.log(listMerge, pageMerging);
    pageService.merge(project.id, listMerge, pageMerging!.id);
    setListMerge([]);
    setMerging(false);
    setPageMerging(undefined);
  };
  
  const insert = async () => {
    const page = await pageService.insert(project.id, new PagePost("Nova Página", type, project))
    const projectTemp = {...project};
    projectTemp.pages.push(page)
    setProject!(projectTemp)
    route.push(`/${user}/${project.id}/${page.id}`);
  };

  const changeInput = (e: ChangeEvent<HTMLInputElement>, page: Page) => {
    if (e.target.checked) listMerge.push(page);
    else listMerge.splice(listMerge.indexOf(page), 1);
  };
  return (

    <>
      <div className="w-full h-max flex flex-col gap-14">
        <Navigate modalPages setCondition={setModalPages} />
        <ProjectInformations project={project} />
      </div>
      <div className="h-full w-full flex flex-col mb-12  overflow-y-auto none-scrollbar">
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
                  onChange={(e) => changeInput(e, page)}
                  className="w-8 h-4"
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
        <div className="h-12 w-32 smm:w-40 sm:w-64 absolute bottom-2">

          <If condition={merging}>
            <div className="flex justify-between w-full h-full">
              <Button
                width="w-32"
                text={t("conect")}
                padding="p-2"
                paddingY="p-1"
                textSize="font-[14rem]"
                fnButton={() => {
                  setListMerge([]);
                  setMerging(false);
                  setPageMerging(undefined);
                }}
              />
              <Button
                width="w-32"
                text={t("conect")}
                fnButton={merge}
                padding="p-2"
                paddingY="p-1"
                textSize="font-[14rem]"
                secondary
              />
            </div>
            <NeedPermission permission="create">


            <Button
              width="w-full "
              text={t("add-page")}
              fnButton={() => setModal(!modal)}
              padding="p-2"
              paddingY="p-1"
              textSize="font-[14re]"
            />
            </NeedPermission>
          </If>
          <LocalModal condition={modal} setCondition={setModal} bottom>
              <TypeOfPageComponent
              type={type}

                changingType={modal}
                setType={setType}
                setChangingType={setModal}
                closeModals={() => setModal(false)}
                changeType={insert}
              />
          </LocalModal>
        </div>
      </div>
    </>
  );
};
