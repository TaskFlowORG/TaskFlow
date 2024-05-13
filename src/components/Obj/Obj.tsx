"use client";

import { archiveToSrc } from "@/functions";
import { Group, OtherUser, TaskPage, User } from "@/models";
import { SimpleGroup } from "@/models/user/group/SimpleGroup";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { ComponentProps, useState } from "react";
import { SelectTypeObj } from "./components";
import { IconPlus } from "../icons/GeneralIcons/IconPlus";

interface Props {
  objs: SimpleGroup[] | OtherUser[] | TaskPage[] | string[];
  max: number;
  functionObj: (o: Object) => void;
  color?: boolean;
  mawWidth?: string;
  isGroup?: boolean;
  isString?: boolean;
  isTaskPage?: boolean;
  isOtherUser?: boolean;
  white?: boolean;
}

export const Obj = ({
  objs = [],
  max,
  functionObj,
  color,
  mawWidth = "w-32",
  isGroup,
  isTaskPage,
  isString,
  isOtherUser,
}: Props) => {
  const [isHovering, setIsHovering] = useState<boolean>(false);

  const showed = objs.filter((o, index) => index <= max);
  const hidden = objs.filter((o, index) => index > max);

  const mrs = isHovering ? " -mr-2" : "xl:-mr-4 lg:-mr-3 sm:-mr-2 -mr-[0.35rem]";
  const classes =
    `rounded-full xl:w-8  sm:w-5 smm:w-3 w-2 xl:h-8  sm:h-5 smm:h-3 h-2 cursor-pointer 
    overflow-clip flex shadow-[0_0_4px_1px_rgba(0,0,0,0.1)] items-center ${mrs}
   justify-center ` +
    (color ? "bg-input-grey dark:bg-modal-grey text-primary dark:text-white" : " bg-primary dark:bg-secondary text-contrast ");

  return (
    <AnimatePresence initial={false}>
      <div
        className={
          "flex justify-center xl:pr-4  lg:pr-3 md:pr-2 pr-1 flex-wrap " +
          mawWidth
        }
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        style={isHovering ? {position:"absolute", right:0}:{}}
      >
        {showed.map((o, index) => (
          <SelectTypeObj
            functionObj={functionObj}
            index={index}
            isGroup={isGroup}
            isOtherUser={isOtherUser}
            isString={isString}
            isTaskPage={isTaskPage}
            key={index}
            o={o}
            classes={classes}
          />
        ))}
        {hidden.length > 0 && !isHovering && (
          <div className={classes+ " rotate-45 p-1 bg-white dark:bg-modal-grey"} title="+">
            <IconPlus />
          </div>
        )}
        {isHovering && (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "min-content" }}
            exit={{ transition: { delay: 0.1, duration: 0.1 }, width: 0 }}
            transition={{ duration: 0.1 }}
            className="flex justify-center"
          >
            {hidden.map((o, index) => (
              <SelectTypeObj
                functionObj={functionObj}
                index={index}
                isGroup={isGroup}
                isOtherUser={isOtherUser}
                isString={isString}
                isTaskPage={isTaskPage}
                key={index}
                o={o}
                classes={classes}
              />
            ))}
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
};
