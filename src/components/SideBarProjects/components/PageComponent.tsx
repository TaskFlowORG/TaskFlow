import { Page, PagePost, Project, TypeOfPage, TypeOfProperty } from "@/models";
import { useContext, useEffect, useRef, useState } from "react";
import { If } from "../../If";
import { pageService, projectService } from "@/services";
import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { TypeOfPageComponent } from "./TypeOfPageComponent";
import { LocalModal } from "../../Modal";
import { PageTypeIcons } from "../../icons/Pages/PageTypeIcons";
import { SideBarButton } from "./SideBarButton";
import { useClickAway } from "react-use";
import { ButtonPageOption } from "./ButtonPageOption";
import {
  Arrow,
  ChangeType,
  ConectPage,
  EditIcon,
  IconTrashBin,
} from "@/components/icons";
import { ProjectContext } from "@/contexts";
import { set } from "zod";
import { useTranslation } from "next-i18next";
import { useHasPermission } from "@/hooks/useHasPermission";
import { NeedPermission } from "@/components/NeedPermission";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UserContext } from "@/contexts/UserContext";
import { TaskModalContext } from "@/utils/TaskModalContext";
import { PageContext } from "@/utils/pageContext";

interface Props {
  page: Page;
  username: string;
  project: Project;
  merging: boolean;
  listMerge: Page[];
  setMerging: (value: boolean) => void;
  setPageMerging: (value: Page) => void;
  pageMerging: boolean;
}

export const PageComponent = ({
  page,
  username,
  project,
  merging,
  setMerging,
  listMerge,
  setPageMerging,
  pageMerging,
}: Props) => {
  const [modal, setModal] = useState(false);
  const [truncate, setTruncate] = useState(false);
  const [renaiming, setRenaiming] = useState(false);
  const [changingType, setChangingType] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState<TypeOfPage>(TypeOfPage.KANBAN);
  const [y, setY] = useState<number>(0);
  const [x, setX] = useState<number>(0);
  const ref = useRef<HTMLDivElement>(null);
  const { setProject } = useContext(ProjectContext);
  const {pageId} = useContext(PageContext)

  useEffect(() => {
    setTruncate(false);
  }, [merging]);

  const openModal = () => {
    setModal(true);
  };

  const excludePage = async () => {
    await pageService.delete(project.id, page.id);
    const projectTemp = { ...project };
    projectTemp.pages.splice(
      project.pages.findIndex((pg) => pg.id == page.id),
      1
    );
    setModal(false);
    setTruncate(false);
    setProject!(projectTemp);
    console.log("APAGEI");
  };

  const saveNewName = (e: any) => {
    if (!e.key || e.key === "Enter") {
      pageService.updateName(
        project.id,
        inputRef.current?.textContent ?? null,
        page.id
      );
      setRenaiming(false);
      page.name = inputRef.current?.textContent ?? page.name;
    }
  };
  const router = useRouter();
  useEffect(() => {
    if (renaiming) {
      inputRef.current?.focus();
    }
  }, [renaiming]);

  const {user} = useContext(UserContext);

  const changeType = async () => {
    if(page.type == type) return;
    const pageInsert = await pageService.insert(
      project.id,
      new PagePost(page.name, type, project)
    );
    router.push(`/${username}/${project.id}/${pageInsert.id}`);
     await pageService.merge(project.id, [pageInsert], page.id)
    await pageService.delete(project.id, page.id);
    setTruncate(false);
    setModal(false);
    setChangingType(false);
    const projecttemp = await  projectService.findOne(project.id);
    setProject!(projecttemp)
  };

  useClickAway(ref, () => {
    setModal(false);
    setTruncate(false);
  });

  const { t } = useTranslation();
  const canDelete = useHasPermission("delete");
  const canUpdate = useHasPermission("update");

  return (
    <label
      htmlFor={`${page.id}`}
      className="w-full flex-1 text-modal-grey h-min dark:text-white"
    >
      <div
        key={page.id}
        className={"w-full flex gap-2 text-modal-grey h-min "}
        onMouseOver={() => setTruncate(true)}
        onMouseLeave={() => setTruncate(modal)}
      >
        <SideBarButton
          icon={<PageTypeIcons type={page.type} />}
          text={page.name}
          renaming={renaiming}
          textRef={inputRef}
          openOptions={modal}
          openOptionsRef={ref}
          fnOpenOptions={
            canUpdate ? openModal : canDelete ? excludePage : undefined
          }
          hasButton={canUpdate || canDelete}
          fnRename={saveNewName}
          iconOptions={
            canUpdate ? (
              <Arrow className="rotate-90" />
            ) : canDelete ? (
              <span className="stroke-primary dark:stroke-secondary">
                <IconTrashBin />
              </span>
            ) : (
              <></>
            )
          }
          pointerEventsNone={merging}
          isHovering={truncate && !renaiming && !merging}
          link={
            !renaiming && !merging
              ? "/" + username + "/" + project.id + "/" + page.id
              : undefined
          }
        >
          <div className="flex w-full px-6  h-full justify-start">
            <div
              className="flex flex-col w-min  border-l-2 border-zinc-200 dark:border-zinc-800
             h-full justify-center pb-2 px-3 gap-2 text-modal-grey dark:text-white "
            >
              <NeedPermission permission="delete">
                <Link  href={pageId == page.id ? `/${username}/${project.id}` :  `/${username}/${project.id}/${pageId}`}>
                  <ButtonPageOption
                    fnButton={excludePage}
                    icon={<IconTrashBin />}
                    text={t("delete")}
                  />
                </Link>
              </NeedPermission>
              <ButtonPageOption
                fnButton={() => {
                  setRenaiming(true);
                  setModal(false);
                  setTruncate(false);
                }}
                icon={<EditIcon />}
                text={t("rename-page")}
              />
              <ButtonPageOption
                fnButton={() => {
                  setPageMerging(page);
                  setModal(false);
                  setMerging(true);
                }}
                icon={<ConectPage />}
                text={t("merge")}
              />
              <ButtonPageOption
                fnButton={(e) => {
                  setX(e.clientX);
                  setY(e.clientY - 175);
                  setChangingType(true);
                }}
                icon={<ChangeType />}
                text={t("change-type")}
              />
            </div>
          </div>
        </SideBarButton>
        <span className="bg-white dark:bg-modal-grey">
          <LocalModal
            condition={changingType}
            setCondition={setChangingType}
            y={y}
            x={x}
            bottom
          >
            <TypeOfPageComponent
              changingType={changingType}
              closeModals={() => {
                setModal(false);
                setTruncate(false);
                setChangingType(false);
              }}
              type={type}
              setChangingType={setChangingType}
              changeType={changeType}
              setType={setType}
            />
          </LocalModal>
        </span>
      </div>
    </label>
  );
};
