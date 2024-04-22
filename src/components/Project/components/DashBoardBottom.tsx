import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import { Dashboard } from "./Dashboard";
import { useTranslation } from "next-i18next";
import { useClickAway } from "react-use";

export const DashboardBottom = () => {
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  useClickAway(ref, () => setDashboardOpen(false));
  return (
    <div className=" h-min fixed w-full z-50 bottom-0 flex flex-col" ref={ref}>
      <button
        onClick={() => setDashboardOpen((prev) => !prev)}
        className="w-full h-12 bg-primary dark:bg-secondary dashboard-button  rounded-t-xl flex justify-center items-center"
      >
        <p className="font-montserrat  w-24 h-6 text-contrast text-[16px]">
          {t("dashboard")}
        </p>
      </button>
      <AnimatePresence mode="wait" initial={false}>
        {dashboardOpen && (
          <>
            <motion.div
              initial={{ height: "0vh" }}
              animate={{ height: "70vh" }}
              exit={{
                transition: { delay: 0, duration: 0.1 },
                height: "0vh",
              }}
              transition={{ duration: 0.1 }}
              className=" bg-white overflow-hidden dark:bg-modal-grey shadow-blur-10 relative pt-6 pb-4"
            >
              <Dashboard />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
