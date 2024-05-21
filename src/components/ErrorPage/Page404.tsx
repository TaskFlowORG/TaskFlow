"use client";

import { useTranslation } from "react-i18next";
import { Icon404 } from "../icons/Errors/Icon404";

export const Page404 = ({ t }: { t?: any }) => {
  if (!t)
    t = (key: string) => {
      return {
        "page-not-found-title": "Oops! Page not found",
        "page-not-found":
          "The page you are trying to access does not exist or has been removed.",
        "page-not-found-cause":
          "Possible causes: \n   - You accessed a non-existent link; \n   - You tried to access something that was not registered; \n   - The page has been removed; \n   - The link is broken.",

        retry: "Retry",
      }[key];
    };
  return (
    <div className="w-full px-4 sm:px-[5%]  xl:px-[10%] 2xl:px-[15%] text-modal-grey dark:text-white h-full flex justify-center items-center">
      <div className="w-full sm:flex-row flex-col-reverse h-full none-scrollbar  sm:gap-10 lg:gap-20  flex justify-center items-center">
        <div className="w-full sm:w-[750px] h-full gap-6 flex flex-col justify-center items-center sm:items-start">
          <span className="w-full h-min">
            <h1 className="h-min text-[50px]  lg:text-[100px] w-full text-center font-alata text-primary">
              404
            </h1>
            <h2 className="h-min text-h4 text-center whitespace-pre-wrap w-full sm:text-start lg:text-h2 font-alata">
              {t("page-not-found-title")}
            </h2>
          </span>
          <h4 className="text-p lg:text-h4 text-center sm:text-start font-alata">
            {t("page-not-found")}
          </h4>
          <pre className="text-p14 lg:text-h5  whitespace-pre-wrap text-center sm:text-start font-montserrat">
            {t("page-not-found-cause")}
          </pre>
          <button
            onClick={() => window.location.reload()}
            className={` p-12 py-2 w-max rounded-lg bg-primary dark:bg-secondary 
text-p14 lg:text-h5 text-contrast font-alata whitespace-nowrap hover:brightness-110 border-none`}
          >
            {t("retry")}
          </button>
        </div>
        <div className="sm:h-max  sm:w-max w-max h-48 flex justify-end sm:mt-0 items-start sm:items-center">
          <Icon404 />
        </div>
      </div>
    </div>
  );
};
