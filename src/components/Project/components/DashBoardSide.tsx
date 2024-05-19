import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import { Dashboard } from "./Dashboard";
import { useTranslation } from "next-i18next";
import { useClickAway } from "react-use";

export const DashboardSide = () => {
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  useClickAway(ref, () => setDashboardOpen(false));
  return (
    <div className="w-min h-5/6 z-50 fixed right-0 flex" ref={ref}>
      <button
        onClick={() => setDashboardOpen((prev) => !prev)}
        className="w-12 h-full bg-primary dark:bg-secondary dashboard-button  rounded-l-xl flex justify-center items-center"
      >
        <p className="font-alata rotate-90  w-24 h-6 text-contrast text-p">
          {t("dashboard")}
        </p>
      </button>
      <AnimatePresence mode="wait" initial={false}>
        {dashboardOpen && (
          <>
            <motion.div
              initial={{ width: "0vw" }}
              animate={{ width: "85vw" }}
              exit={{
                transition: { delay: 0, duration: 0.1 },
                width: "0vw",
              }}
              transition={{ duration: 0.1 }}
              className=" bg-white dark:bg-modal-grey overflow-hidden shadow-blur-10"
            >
              <Dashboard />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
