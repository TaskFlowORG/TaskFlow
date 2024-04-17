import { Page, PagePost, Project, TypeOfPage, TypeOfProperty } from "@/models";
import { useContext, useEffect, useRef, useState } from "react";
import { If } from "../../If";
import { pageService } from "@/services";
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
  ChangeType,
  ConectPage,
  EditIcon,
  IconTrashBin,
} from "@/components/icons";
import { ProjectContext } from "@/contexts";
import { set } from "zod";
import { useTranslation } from "next-i18next";

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
  

  useEffect(() => {
    setTruncate(false);
  }, [merging]);

  const openModal = () => {
    setModal(true);
  };

  const excludePage = () => {
    pageService.delete(project.id, page.id);
    const projectTemp = { ...project };
    projectTemp.pages.splice(project.pages.indexOf(page), 1);
    setProject!(projectTemp);
    setModal(false);
    setTruncate(false);
  };

  const saveNewName = (e: any) => {
    if (!e.key || e.key === "Enter") {
      console.log(inputRef.current?.textContent);
      pageService.updateName(
        project.id,
        inputRef.current?.textContent ?? null,
        page.id
      );
      setRenaiming(false);
      page.name = inputRef.current?.textContent ?? page.name;
    }
  };

  useEffect(() => {
    if (renaiming) {
      inputRef.current?.focus();
    }
  }, [renaiming]);

  const changeType = async () => {
    const pagePromise = await pageService.insert(
      project.id,
      new PagePost(page.name, type, project)
    );

    const projectTemp = { ...project };
    projectTemp.pages.splice(project.pages.indexOf(page), 1);
    projectTemp.pages.push(pagePromise);
    setProject!(projectTemp);
    pageService.merge(project.id, [pagePromise], page.id);
    pageService.delete(project.id, page.id);

    setTruncate(false);
    setModal(false);
    setChangingType(false);
  };

  useClickAway(ref, () => {
    setModal(false);
    setTruncate(false);
  });

  const { t } = useTranslation();

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
          fnOpenOptions={openModal}
          fnRename={saveNewName}
          pointerEventsNone={merging}
          isHovering={truncate && !renaiming && !merging}
          link={
            !renaiming && !merging
              ? "/" + username + "/" + project.id + "/" + page.id
              : undefined
          }
        >
          <div className="flex w-full  h-full justify-center ">
            <div className="flex flex-col w-min px-8 h-full justify-center pb-2  gap-2 text-modal-grey dark:text-white ">
              <ButtonPageOption
                fnButton={excludePage}
                icon={<IconTrashBin />}
                text={t("delete-page")}
              />
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
                fnButton={e => {
                  setX(e.clientX);
                  setY(e.clientY);
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
          >
            <TypeOfPageComponent
              changingType={changingType}
              closeModals={() => {
                setModal(false);
                setTruncate(false);
                setChangingType(false);
              }}
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
