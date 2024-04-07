import { archiveToSrc } from "@/functions";
import { OtherUser, TaskPage } from "@/models";
import { SimpleGroup } from "@/models/user/group/SimpleGroup";

interface SelectTypeObjProps {
  isTaskPage?: boolean;
  isOtherUser?: boolean;
  isGroup?: boolean;
  isString?: boolean;
  classes?: string;
  index: number;
  o: any; // replace 'any' with the actual type if known
  functionObj: (o: any) => void; // replace 'any' with the actual type if known
}

export const SelectTypeObj = ({
  isTaskPage,
  isOtherUser,
  isGroup,
  classes,
  isString,
  index,
  o,
  functionObj,
}: SelectTypeObjProps) => {
  if (isTaskPage) {
    return (
      <div
        onClick={(e) => {
          e.preventDefault();
          functionObj(o);
        }}
        className={classes}
        key={index}
        title={(o as TaskPage).task.name ?? "Sem Nome"}
      ></div>
    );
  } else if (isOtherUser) {
    return (
      <div
        onClick={(e) => {
          e.preventDefault();
          functionObj(o);
        }}
        className={classes}
        key={index}
        title={(o as OtherUser).name ?? "Sem Nome"}
      >
        {" "}
        {(o as OtherUser).picture && (
          <img src={archiveToSrc((o as OtherUser).picture)} />
        )}
      </div>
    );
  } else if (isGroup) {
    return (
      <div
        onClick={(e) => {
          e.preventDefault();
          functionObj(o);
        }}
        className={classes}
        key={index}
        title={(o as SimpleGroup).name ?? "Sem Nome"}
      >
        {(o as SimpleGroup).picture && (
          <img src={archiveToSrc((o as SimpleGroup).picture)} />
        )}
      </div>
    );
  } else if (isString) {
    if ((o as string) == "+") {
        console.log("sjhdjlkf")
      return (
        <div className={classes + " relative"} style={{ backgroundColor: o }}>
        <p className="absolute -top-2">+</p>
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
        onClick={(e) => {
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
