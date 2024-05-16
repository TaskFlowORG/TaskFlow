import { IconPlus } from "@/components/icons/GeneralIcons/IconPlus";
import { OtherUser, TaskPage } from "@/models";
import { SimpleGroup } from "@/models/user/group/SimpleGroup";
import { useTranslation } from "next-i18next";
import { ImageObj } from "./ImageObj";

interface SelectTypeObjProps {
  isTaskPage?: boolean;
  isOtherUser?: boolean;
  isGroup?: boolean;
  isString?: boolean;
  classes?: string;
  setOtherUser?: (o: OtherUser) => void;
  setX?: (x: number) => void;
  setY?: (y: number) => void;
  index: number;
  o: any; // replace 'any' with the actual type if known
  functionObj: (o: any) => void; // replace 'any' with the actual type if known
}

export const SelectTypeObj = ({
  isTaskPage,
  isOtherUser,
  isGroup,
  setOtherUser,
  setX,
  setY,

  classes,
  isString,
  index,
  o,
  functionObj,
}: SelectTypeObjProps) => {
  const { t } = useTranslation();

  if (isTaskPage) {
    return (
      <div
        onMouseUp={(e) => {
          e.preventDefault();
          functionObj(o);
        }}
        className={
          classes +
          ((o as TaskPage).task.completed ||
          (o as TaskPage).task.waitingRevision
            ? " border-green-500 border-2"
            : "") +
          ((o as TaskPage).task.waitingRevision
            ? " animation-delay-1000 animate-border-pulser "
            : "")
        }
        key={index}
        title={(o as TaskPage).task.name ?? t("withoutname")}
      ></div>
    );
  } else if (isOtherUser) {
    return (
      <div
        onMouseUp={(e) => {
          e.preventDefault();
          e.stopPropagation();
          functionObj(o);
          if (!setOtherUser || !setX || !setY) return;
          setX(e.clientX);
          setY(e.clientY);
          setOtherUser(o as OtherUser);
        }}
        className={classes + " relative"}
        key={index}
        title={(o as OtherUser).name ?? t("withoutname")}
      >
        {" "}
        {(o as OtherUser).picture && (
          <ImageObj obj={o as OtherUser} />
        )}
      </div>
    );
  } else if (isGroup) {
    return (
      <div
        onMouseUp={(e) => {
          e.preventDefault();
          functionObj(o);
        }}
        className={classes+ " relative"}
        key={index}
        title={(o as SimpleGroup).name ?? t("withoutname")}
      >
        {(o as SimpleGroup).picture && (
          <ImageObj obj={o as SimpleGroup} />
        )}
      </div>
    );
  } else if (isString) {
    if ((o as string) == "+") {
      return (
        <div className={classes + " relative"} style={{ backgroundColor: o }}>
          <p className="absolute top-0 h-full w-full rotate-45 p-1">
            {" "}
            <IconPlus />
          </p>
          <input
            type="color"
            onChange={(e) => functionObj(e.target.value)}
            className="w-full h-full opacity-0"
            style={{ backgroundColor: o as string }}
            key={index}
            title={o as string}
          />
        </div>
      );
    }
    return (
      <div
        onMouseUp={(e) => {
          e.preventDefault();
          functionObj(o);
        }}
        className={classes}
        style={{ backgroundColor: o as string }}
        key={index}
        title={o as string}
      />
    );
  }
};
