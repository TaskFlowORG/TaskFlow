import { useTranslation } from "react-i18next"
import { Function } from "./Function"

export const Features = () => {
    const {t} = useTranslation()
    return (
        <div className="w-full flex items-center padding-x-10 flex-col gap-[4.5rem] " id="features">
            <h2 className="h3 w-min text-primary lg:text-[48px] dark:text-white text-center md:whitespace-nowrap">{t('our-features')}</h2>
            <div className="flex relative flex-col gap-8 md:gap-32 items-center max-w-[956px] w-full p-8 ">
                <div className="w-2 h-full md:hidden bg-primary absolute centeredAbsolute">

                </div>
                <Function src={"/process.svg"}  title={t('see-in-different-ways')} content={t('complete-platform')}  text={"text-[#E41CEF]"} bg={"timeline__primaryToPurple"} size={"h-[400px]"} />
                <Function src={"/permit.svg"} title={t('who-can-can')} content={t('total-control')} text={"text-primary"} bg={"timeline__purpleTosecondary"} size={"h-[600px]"} />
                <Function src={"/chatting.svg"}  title={t('blah-blah-blah')} content={t('complete-communication')} text={"text-secondary"} bg={"bg-secondary"} size={"h-[400px]"} />
            </div>
        </div>
    )
}