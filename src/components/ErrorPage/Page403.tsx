import { Button } from "../Button"
import { Icon403 } from "../icons/Errors/Icon403"

export const Page403 = ({t}:{t:any}) => {
    return (
        <div className="w-full text-modal-grey dark:text-white h-full flex justify-center items-center">
        <div className="w-full h-min flex justify-center items-center">
          <div className="w-[32rem] h-full gap-6 flex flex-col justify-center items-start">
            <span>
            <h1 className="h-min text-[100px] w-full text-center font-alata text-primary">403</h1>
            <h2 className="h-min text-h2 font-alata">{t("forbidden-title")}</h2>
            </span>
            <h4 className="text-h4 font-alata">{t("forbidden")}</h4>
            <pre className="text-h5 font-montserrat">{t("forbidden-cause")}</pre>
            <Button fnButton={() => window.location.reload()} text={t("retry")} />
          </div>
          <div className="h-full w-min flex justify-center items-center">
              <Icon403 />
          </div>
        </div>
      </div>
    )
}