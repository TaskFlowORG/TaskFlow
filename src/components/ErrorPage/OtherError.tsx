import { Button } from "../Button"
import {OtherError as  OtherErrorIcon } from "../icons/Errors/OtherError"
export const OtherError = ({t}:{t:any}) => {
    return (
      <div className="w-full px-4 sm:px-[5%]  xl:px-[10%] 2xl:px-[15%] text-modal-grey dark:text-white h-full flex justify-center items-center">
      <div className="w-full sm:flex-row flex-col-reverse h-full none-scrollbar  sm:gap-10 lg:gap-20  flex justify-center items-center">
        <div className="w-full sm:w-[750px] h-full gap-6 flex flex-col justify-center items-center sm:items-start">
          <span className="w-full h-min">
            <h1 className="h-min text-[50px]  lg:text-[100px] w-full text-center font-alata text-primary dark:text-secondary"> {":("}</h1>
            <h2 className="h-min text-h4 text-center whitespace-pre-wrap w-full sm:text-start lg:text-h2 font-alata">
{t("other-error-title")}</h2>
            </span>
            <h4 className="text-p lg:text-h4 text-center sm:text-start font-alata">
{t("other-error")}</h4>
<pre className="text-p14 lg:text-h5  whitespace-pre-wrap text-center sm:text-start font-montserrat">
{t("other-error-cause")}</pre>
<button
            onClick={() => window.location.reload()}
            className={` p-12 py-2 w-max rounded-lg bg-primary dark:bg-secondary 
text-p14 lg:text-h5 text-contrast font-alata whitespace-nowrap hover:brightness-110 border-none`}
          >
            {t("retry")}
          </button>
          </div>
          <div className="sm:h-max  sm:w-max w-max h-48 flex justify-end sm:mt-0 items-start sm:items-center">

              <OtherErrorIcon />
          </div>
        </div>
      </div>
    )
}