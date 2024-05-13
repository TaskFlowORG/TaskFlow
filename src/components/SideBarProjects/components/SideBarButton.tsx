import { If } from "@/components/If";
import { Arrow } from "@/components/icons";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { ComponentProps } from "react";

interface Props {
  children?: React.ReactNode;
  icon: React.ReactNode;

  text: string;
  textRef?: React.RefObject<HTMLParagraphElement>;

  fnClick?: () => void;
  hasButton?: boolean;

  fnRename?: (e: any) => void;
  renaming?: boolean;

  openOptions?: boolean;
  fnOpenOptions?: () => void;
  iconOptions?: React.ReactNode;
  openOptionsRef?: React.RefObject<HTMLDivElement>;

  isHovering?: boolean;

  link?: string;
  pointerEventsNone?: boolean;
}

export const SideBarButton = ({
  children,
  icon,
  text,
  fnClick,
  fnRename,
  renaming,
  textRef,
  hasButton,
  openOptions,
  fnOpenOptions,
  iconOptions = <Arrow className="rotate-90" />,
  openOptionsRef,
  link,
  pointerEventsNone,
  isHovering,
}: Props) => {
  const { t } = useTranslation();

  return (
    <div
    ref={openOptionsRef}

      className={
        `w-full h-min relative border-b-2 flex flex-col border-primary-opacity 
       dark:border-secondary-opacity bg-white dark:bg-modal-grey ` +
        (pointerEventsNone ? " pointer-events-none" : "") +
        (openOptions ? "" : " hover:brightness-95 dark:hover:brightness-110")
      }
    >
      <div
        
        className={"flex  h-14 w-full justify-between items-center " + 
        (renaming ? "cursor-text" : "cursor-pointer") + 
        (openOptions ? " border-b-2 border-zinc-200 dark:border-zinc-800" : "") }
        title={text}
      onClick={fnClick}

      >
        <Link
          href={link ?? "#"}
          className="h-full w-full flex gap-4 flex-row items-center px-6"
        >
          <div className="w-12 h-12 hidden sm:flex aspect-square justify-center items-center stroke-primary dark:stroke-secondary">
            <div className={"w-5 aspect-square " }>
            {icon}
            </div>

          </div>
          <p
            className={
              "text-p font-montserrat text-modal-grey dark:text-white openOptions  outline-none none-scrollbar " +
              (renaming ? "overflow-x-auto whitespace-nowrap " : " truncate ") +
              (isHovering != undefined && isHovering && hasButton ? "w-[2rem] smm:w-[4rem] sm:w-[7rem]" : "smm:w-[6rem] sm:w-[9rem]")
            }
            onBlur={fnRename}
            onKeyDown={fnRename}
            suppressContentEditableWarning={true}
            contentEditable={renaming}
            ref={renaming ? textRef : undefined}
          >
            {text ?? t("withoutname")}
          </p>
        </Link>
        <If condition={isHovering != undefined && isHovering}>
          <div className="justify-center h-full w-8  flex flex-col">
            <If condition={hasButton != undefined && hasButton}>
              <span
                className={
                  "h-8 w-8 p-2 mr-2 rounded-full bg-white dark:bg-modal-grey duration-300 " +
                  (openOptions ? "rotate-180" : " hover:brightness-95")
                }
                onClick={fnOpenOptions}
              >
                {iconOptions}
              </span>
            </If>
          </div>
        </If>
      </div>
      <AnimatePresence initial={false} mode="wait">
        {openOptions && (
          <>
            <motion.span
              className=" dark:bg-modal-grey w-full justify-center flex items-start overflow-y-clip"
              initial={{ height: 0 }}
              animate={{ height: "150px" }}
              exit={{ transition: { delay: 0.1 }, height: 0 }}
              transition={{ duration: 0.1 }}
            >
              {children}
            </motion.span>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
