"use client";

import { useTranslation } from "react-i18next";
import { Icon404 } from "../icons/Errors/Icon404";

export const Page404 = ({ t }: { t?: any }) => {
  if(!t)t = (key: string) => {
    return{
      "page-not-found-title": "Oops! Page not found",
      "page-not-found": "The page you are trying to access does not exist or has been removed.",
      "page-not-found-cause": "Possible causes: \n   - You accessed a non-existent link; \n   - You tried to access something that was not registered; \n   - The page has been removed; \n   - The link is broken.",
 
      "retry": "Retry",
    }[key]
  }
  return (
    <div className="w-full text-modal-grey dark:text-white h-full flex justify-center items-center">
      <div className="w-full h-min flex justify-center items-center">
        <div className="w-[32rem] h-full gap-6 flex flex-col justify-center items-start">
          <span>
            <h1 className="h-min text-[100px] w-full text-center font-alata text-primary">
              404
            </h1>
            <h2 className="h-min text-h2 font-alata">
              { t("page-not-found-title")}
            </h2>
          </span>
          <h4 className="text-h4 font-alata">
            { t("page-not-found")}
          </h4>
          <pre className="text-h5 font-montserrat">
            { t("page-not-found-cause")}
          </pre>
          <button
            onClick={() => window.location.reload()}
            className={` p-12 py-2 w-max rounded-lg bg-primary dark:bg-secondary
text-h5 text-contrast font-alata whitespace-nowrap hover:brightness-110 border-none`}
          >
            { t("retry")}
          </button>
        </div>
        <div className="h-full w-min flex justify-center items-center">
          <Icon404 />
        </div>
      </div>
    </div>
  );
};
