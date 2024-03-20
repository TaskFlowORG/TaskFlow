import { Page, PagePost, Project, TypeOfPage, TypeOfProperty } from "@/models";
import { useEffect, useRef, useState } from "react";
import { If } from "../../If";
import { pageService } from "@/services";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectCards,
  EffectCoverflow,
  Thumbs,
  Controller,
  HashNavigation,
  Manipulation,
  Parallax,
  Virtual,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useTheme } from "next-themes";
import { Button } from "../../Button";
import Link from "next/link";
import { TypeOfPageComponent } from "./TypeOfPageComponent";
import { LocalModal } from "../../Modal";
import { PageTypeIcons } from "../../icons/Pages/PageTypeIcons";
import { SideBarButton } from "./SideBarButton";
import { AnimatePresence, motion } from "framer-motion";
import { useClickAway } from "react-use";
import { ButtonPageOption } from "./ButtonPageOption";
import { IconTrash } from "@/components/icons/ModalPropertys/Trash";
import { ChangeType, ConectPage, EditIcon, IconTrashBin } from "@/components/icons";

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
  useEffect(() => {
    setTruncate(false);
  }, [merging]);

  const openModal = () => {
    setModal(true);
  };

  const excludePage = () => {
    pageService.delete(page.id);
    setModal(false);
    setTruncate(false);
  };

  const saveNewName = (e: any) => {
    if (!e.key || e.key === "Enter") {
      console.log(inputRef.current?.textContent);
      pageService.upDateName(inputRef.current?.textContent ?? null, page.id);
      setRenaiming(false);
    }
  };

  useEffect(() => {
    if (renaiming) {
      inputRef.current?.focus();
    }
  }, [renaiming]);

  const changeType = async () => {
    const pagePromise = await pageService.insert(
      new PagePost(page.name, type, project)
    );
    pageService.merge([pagePromise], page.id);
    pageService.delete(page.id);
    setTruncate(false);
    setModal(false);
    setChangingType(false);
  };

  useClickAway(ref, () => {
    setModal(false);
    setTruncate(false);
  });

  return (
    <label
      htmlFor={`${page.id}`}
      className="w-full flex-1 text-modal-grey dark:text-white  "
    >
      <div
        key={page.id}
        className={"w-full flex gap-2 text-modal-grey "}
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
          <div className="flex flex-col w-full px-8 items-start  gap-2 text-modal-grey dark:text-white ">
            <ButtonPageOption
              fnButton={excludePage}
              icon={<IconTrashBin />}
              text="Excluir"
            />
            <ButtonPageOption
              fnButton={() => {
                setRenaiming(true);
                setModal(false);
                setTruncate(false);
              }}
              icon={<EditIcon />}
              text="Renomear"
            />
            <ButtonPageOption
              fnButton={() => {
                setPageMerging(page);
                setModal(false);
                setMerging(true);
              }}
              icon={<ConectPage />}
              text="Conectar"
            />
            <ButtonPageOption
              fnButton={() => {
                setChangingType(true);
                setModal(false);
              }}
              icon={<ChangeType />}
              text="Mudar Tipo"
            />
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