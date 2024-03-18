import { If } from "@/components/If";
import { Arrow } from "@/components/icons";
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
  openOptions?: boolean;
  fnOpenOptions?: () => void;
  openOptionsRef?: React.RefObject<HTMLDivElement>;
  link?: string;
  pointerEventsNone?: boolean;
}

export const SideBarButton = ({
  children,
  icon,
  text,
  fnClick,
  fnSecondary,
  editable,
  textRef,
  openOptions,
  fnOpenOptions,
  openOptionsRef,
  link,
  pointerEventsNone,
}: Props) => {
  return (
    <div
      className={ "h-14 w-full relative border-b-2 flex flex-col border-primary-opacity dark:border-secondary-opacity " +
        (editable ? "cursor-text" : "cursor-pointer") +
        (pointerEventsNone ? " pointer-events-none" : "")
      }
      onClick={fnClick}
    >
      <div className="flex w-full h-full justify-between items-center hover:brightness-95 dark:hover:brightness-110">
        <Link
          href={link ?? "#"}
          className="w-full h-full flex flex-row items-center px-6  bg-white dark:bg-modal-grey "
        >
          <div className="w-1/4 h-8 flex justify-center items-center">
            {icon}
          </div>
          <p
            className="p text-modal-grey dark:text-white openOptions outline-none"
            onBlur={fnSecondary}
            onKeyDown={fnSecondary}
            suppressContentEditableWarning={true}
            contentEditable={editable}
            ref={editable ? textRef : undefined}
          >
            {text ?? "Sem Nome"}
          </p>
        </Link>
        <If condition={openOptions != undefined && openOptions}>
          <div className="justify-center h-full flex flex-col bg-white dark:bg-modal-grey">
            <span
              className="rotate-90 h-8 w-8 p-2 mr-2 rounded-full bg-white dark:bg-modal-grey hover:brightness-90"
              onClick={fnOpenOptions}
              ref={openOptionsRef}
            >
              <Arrow />
            </span>
          </div>
        </If>
      </div>
      {children}
    </div>
  );
};
