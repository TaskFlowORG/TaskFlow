"use client";

import { Icon404 } from "../icons/Errors/Icon404";

export const Page404 = ({ t }: { t?: any }) => {
  return (
    <div className="w-full text-modal-grey dark:text-white h-full flex justify-center items-center">
      <div className="w-full h-min flex justify-center items-center">
        <div className="w-[32rem] h-full gap-6 flex flex-col justify-center items-start">
          <span>
            <h1 className="h-min text-[100px] w-full text-center font-alata text-primary">
              404
            </h1>
            <h2 className="h-min text-h2 font-alata">
              {!t ? "AA" : t("page-not-found-title")}
            </h2>
          </span>
          <h4 className="text-h4 font-alata">
            {!t ? "AA" : t("page-not-found")}
          </h4>
          <pre className="text-h5 font-montserrat">
            {!t ? "AA" : t("page-not-found-cause")}
          </pre>
          <button
            onClick={() => window.location.reload()}
            className={` p-12 py-2 w-max rounded-lg bg-primary dark:bg-secondary
text-h5 text-contrast font-alata whitespace-nowrap hover:brightness-110 border-none`}
          >
            {!t ? "AA" : t("retry")}
          </button>
        </div>
        <div className="h-full w-min flex justify-center items-center">
          <Icon404 />
        </div>
      </div>
    </div>
  );
};
