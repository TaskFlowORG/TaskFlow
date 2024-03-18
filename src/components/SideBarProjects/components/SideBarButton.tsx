import { If } from "@/components/If";
import Link from "next/link";
import { ComponentProps } from "react";

interface Props {
  children?: React.ReactNode;
  icon: React.ReactNode;
  text: string;
  fnClick?: () => void;
  fnSecondary?: (e: any) => void;
  editable?: boolean;
  textRef?: React.RefObject<HTMLParagraphElement>;
  truncate?: boolean;
  fnTruncate?: () => void;
  truncateRef?: React.RefObject<HTMLDivElement>;
  link?: string;
  pointerEventsNone?:boolean
}

export const SideBarButton = ({
  children,
  icon,
  text,
  fnClick,
  fnSecondary,
  editable,
  textRef,
  truncate,
  fnTruncate,
  truncateRef,
    link,
    pointerEventsNone
}: Props) => {
  return (
    <div className={"h-14 w-full relative border-b-2 border-primary-opacity dark:border-secondary-opacity " + 
    (editable ? "cursor-text": "cursor-pointer") + (pointerEventsNone ? " pointer-events-none":"")} onClick={fnClick}>
      <div className="flex w-full h-full justify-between items-center hover:brightness-95 dark:hover:brightness-110">
      <Link href={link ?? "#"} className="w-full h-full flex flex-row items-center px-6  bg-white dark:bg-modal-grey " >
        <div className="w-1/4 h-8 flex justify-center items-center">
          {icon}
        </div>
        <p
          className="p text-modal-grey dark:text-white truncate outline-none"
          onBlur={fnSecondary}
          onKeyDown={fnSecondary}
          suppressContentEditableWarning={true}
          contentEditable={editable}
          ref={editable ? textRef : undefined}
        >
          {text ?? "Sem Nome"}
        </p>
      </Link>
        <If condition={truncate != undefined && truncate}>
          <div
            className="bg-zinc-200 dark:bg-zinc-800 justify-center h-full rounded-sm flex flex-col p-1  gap-2 w-4 hover:brightness-95"
            onClick={fnTruncate}
            ref={truncateRef}
          >
            <div className="bg-white dark:bg-zinc-300 aspect-square w-2 rounded-full"></div>
            <div className="bg-white dark:bg-zinc-300 aspect-square w-2 rounded-full"></div>
            <div className="bg-white dark:bg-zinc-300 aspect-square w-2 rounded-full"></div>
          </div>
        </If>
      </div>
      {children}
    </div>
  );
};
