import { Button } from "../Button"
import {OtherError as  OtherErrorIcon } from "../icons/Errors/OtherError"
export const OtherError = ({t}:{t:any}) => {
    return (
        <div className="w-full text-modal-grey dark:text-white h-full flex justify-center items-center">
        <div className="w-full h-min flex justify-center items-center">
          <div className="w-[32rem] h-full gap-6 flex flex-col justify-center items-start">
            <span>
            <h1 className="h-min text-[100px] w-full text-center font-alata text-primary">{":("}</h1>
            <h2 className="h-min text-h2 font-alata">{t("other-error-title")}</h2>
            </span>
            <h4 className="text-h4 font-alata">{t("other-error")}</h4>
            <pre className="text-h5 font-montserrat">{t("other-error-cause")}</pre>
            <Button fnButton={() => window.location.reload()} text={t("retry")} />
          </div>
          <div className="h-full w-min flex justify-center items-center">
              <OtherErrorIcon />
          </div>
        </div>
      </div>
    )
}