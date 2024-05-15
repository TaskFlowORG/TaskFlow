import { useTranslation } from "react-i18next"

export const ChatDontExists = () => {
    const {t} = useTranslation()

    return (
        <div className="flex justify-center text-p font-alata">
            <h1>{t("no-possible-chat")}</h1>
        </div>
    )
}