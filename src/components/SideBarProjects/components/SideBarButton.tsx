import { If } from "@/components/If";
import { Arrow } from "@/components/icons";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { ComponentProps } from "react";

interface Props {
  children?: React.ReactNode;
  icon: React.ReactNode;

  text: string;
  textRef?: React.RefObject<HTMLParagraphElement>;
  
  fnClick?: () => void;

  fnRename?: (e: any) => void;
  renaming?: boolean;

  openOptions?: boolean;
  fnOpenOptions?: () => void;
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
  openOptions,
  fnOpenOptions,
  openOptionsRef,
  link,
  pointerEventsNone,
  isHovering
}: Props) => {

  
  return (
    <div
      className={ `w-full h-min relative border-b-2 flex flex-col border-primary-opacity 
       dark:border-secondary-opacity bg-white dark:bg-modal-grey ` +
        (renaming ? "cursor-text" : "cursor-pointer") +
        (pointerEventsNone ? " pointer-events-none" : "")+
        (openOptions ? "":" hover:brightness-95 dark:hover:brightness-110")
        
      }
      onClick={fnClick}>
      <div className="flex h-14 w-full  justify-between items-center " title={text}>
        <Link href={link ?? "#"} className="h-full w-full flex gap-4 flex-row items-center px-6">
          <div className="w-12 h-12 flex justify-center items-center stroke-primary dark:stroke-secondary">
            {icon}
          </div>
          <p
            className={"p text-modal-grey w-full dark:text-white openOptions outline-none none-scrollbar " + 
            (renaming ? "overflow-x-auto whitespace-nowrap" : " truncate ")}
            onBlur={fnRename}
            onKeyDown={fnRename}
            suppressContentEditableWarning={true}
            contentEditable={renaming}
            ref={renaming ? textRef : undefined}>
            {text ?? "Sem Nome"}
          </p>
        </Link>
        <If condition={isHovering != undefined && isHovering}>
          <div className="justify-center h-full w-min  flex flex-col">
            <span
              className={"h-8 w-8 p-2 mr-2 rounded-full rotate-90  bg-white dark:bg-modal-grey " +
              (openOptions ? "":" hover:brightness-95")}
              onClick={fnOpenOptions}>
              <Arrow />
            </span>
          </div>
        </If>
      </div>
      <AnimatePresence initial={false} mode="wait">
        {openOptions &&
          <>
            <motion.span
              className=" dark:bg-back-grey w-full justify-center flex items-start overflow-y-clip"
              initial={{ height: 0 }}
              animate={{ height: "150px" }}
              exit={{ transition:{delay:0.1}, height: 0 }}
              transition={{ duration: 0.1 }}
              ref={openOptionsRef}>
              {children}
            </motion.span>
          </>}
      </AnimatePresence>
    </div>
  );
};
