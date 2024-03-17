import { Page, PagePost, Project, TypeOfPage, TypeOfProperty } from "@/models";
import { useEffect, useRef, useState } from "react";
import { If } from "../If";
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
import { Button } from "../Button";
import Link from "next/link";
import { TypeOfPageComponent } from "../TypeOfPageComponent";
import { LocalModal } from "../Modal";
import { PageTypeIcons } from "../icons/Pages/PageTypeIcons";

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
    if (ref.current) {
      setY(ref.current.getBoundingClientRect().top);
      setX(
        ref.current.getBoundingClientRect().left +
          ref.current.getBoundingClientRect().width +
          5
      );
    }
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

  return (
    <label htmlFor={`${page.id}`} className="w-full flex-1 text-modal-grey dark:text-white  ">
      <div
        key={page.id}
        className={"w-full flex gap-2 text-modal-grey " +
          (merging ? " pointer-events-none" : "cursor-pointer")}
        onMouseOver={() => setTruncate(true)}
        onMouseLeave={() => setTruncate(modal)}
      >
        <Link href={!renaiming && !merging
              ? "/" + username + "/" + project.id + "/" + page.id
              : "#"
          }
          className=" w-full flex gap-2 "
        >
          <If condition={!merging || pageMerging}>
            <PageTypeIcons type={page.type} />
          </If>
          <div className="bg-input-grey dark:bg-back-grey text-start font-alata rounded-md h-7 px-4 py-px w-full hover:brightness-95">
            <div
              ref={inputRef}
              className={
                "appearance-none cursor-pointer bg-transparent w-full outline-none truncate text-modal-grey dark:text-white  " +
                (!page.name ? "opacity-50" : "")
              }
              onBlur={saveNewName}
              onKeyDown={saveNewName}
              suppressContentEditableWarning={true}
              contentEditable={renaiming}
            >
              {page.name ?? "Sem Nome"}
            </div>
          </div>
        </Link>
        <If condition={truncate && !merging}>
          <div
            className="bg-input-grey dark:bg-back-grey h-full rounded-full flex flex-col p-1  gap-px w-4 hover:brightness-95"
            onClick={openModal}
            ref={ref}
          >
            <div className="bg-white dark:bg-zinc-800 w-[0.35rem] h-[0.35rem] rounded-full brightness-[90%]"></div>
            <div className="bg-white dark:bg-zinc-800 w-[0.35rem] h-[0.35rem] rounded-full brightness-[90%]"></div>
            <div className="bg-white dark:bg-zinc-800 w-[0.35rem] h-[0.35rem] rounded-full brightness-[90%]"></div>
          </div>
        </If>
        <span className="bg-input-grey dark:bg-back-grey">
          <LocalModal
            condition={modal}
            setCondition={(value) => {
              setModal(value);
              setTruncate(false);
            }}
            y={y}
            x={x}
          >
            <div className="font-alata text-[14px] p-4 flex w-full justify-center items-center rounded-md">
              <div className="flex flex-col w-full text-modal-grey dark:text-white ">
                <button
                  className="w-max flex gap-3 bg-input-grey dark:bg-back-grey    text-[12px]"
                  onClick={excludePage}
                >
                  <span>[]</span>
                  <span>|</span>
                  <span>Excluir</span>
                </button>
                <button
                  className="w-max flex gap-3 bg-input-grey dark:bg-back-grey hover:text-zinc-500  text-[12px]"
                  onClick={() => {
                    setRenaiming(true);
                    setModal(false);
                    setTruncate(false);
                  }}
                >
                  <span>[]</span>
                  <span>|</span>
                  <span>Renomear</span>
                </button>
                <button
                  className="w-max flex gap-3 bg-input-grey dark:bg-back-grey hover:text-zinc-500  text-[12px]"
                  onClick={() => {
                    setPageMerging(page);
                    setModal(false);
                    setMerging(true);
                  }}
                >
                  <span>[]</span>
                  <span>|</span>
                  <span>Conectar</span>
                </button>
                <button
                  className="w-max flex gap-3 bg-input-grey dark:bg-back-grey hover:text-zinc-500  text-[12px]"
                  onClick={() => {
                    setChangingType(true);
                    setModal(false);
                  }}
                >
                  <span>[]</span>
                  <span>|</span>
                  <span>Mudar Tipo</span>
                </button>
              </div>
            </div>
          </LocalModal>
        </span>
        <span className="bg-white dark:bg-modal-grey">
          <LocalModal condition={changingType} setCondition={setChangingType} y={y} x={x}>
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
