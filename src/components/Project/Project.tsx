import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "next-i18next";
import { useRef, useState } from "react";
import { useClickAway } from "react-use";
import { set } from "zod";
import { Dashboard } from "./components";

export const Project = () => {
  const { t } = useTranslation();
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useClickAway(ref, () => setDashboardOpen(false));
  return (
    <div className="w-sceen h-screen pt-14 items-center relative flex">
      <div className="w-full h-full bg-red-200 flex pr-12"></div>
      <div className="w-min h-5/6 absolute right-0 flex" ref={ref}>
        <button
          onClick={() => setDashboardOpen((prev) => !prev)}
          className="w-12 h-full bg-primary dark:bg-secondarya  rounded-l-xl flex justify-center items-center"
        >
          <p className="font-montserrat rotate-90  w-24 h-6 text-contrast text-[16px]">
            {t("dashboard")}
          </p>
        </button>
        <AnimatePresence mode="wait" initial={false}>
          {dashboardOpen && (
            <>
              <motion.div
                initial={{ width: "0vw" }}
                animate={{ width: "85vw" }}
                exit={{transition: { delay: 0, duration:0.5 },  width: "0vw" }}
                transition={{ duration: 0.5 }}
                className=" bg-white dark:bg-modal-grey shadow-blur-10"
              >
                <Dashboard />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
