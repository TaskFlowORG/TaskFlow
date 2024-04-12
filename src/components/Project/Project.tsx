import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "next-i18next";
import { useEffect, useRef, useState } from "react";
import { useClickAway } from "react-use";
import { set } from "zod";
import { Dashboard } from "./components";
import { If } from "../If";
import { DashboardSide } from "./components/DashBoardSide";
import { DashboardBottom } from "./components/DashBoardBottom";

export const Project = () => {
  const { t } = useTranslation();
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", () => {
      setWindowWidth(window.innerWidth);
    });
  }, []);


  return (
    <div className="w-sceen min-h-full pt-14 items-center bg-red-200 relative flex">
      <div className="w-full h-full  flex pr-12"></div>
      <If condition={windowWidth > 768}>
        <DashboardSide />
        <DashboardBottom />
      </If>
    </div>
  );
};
