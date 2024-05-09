import { useTranslation } from "next-i18next"

interface Props {
    onClick: () => void
}

export const SaveChangesButton = ({ onClick }: Props) => {

    const { t } = useTranslation();

    return (
        <div className="row-start-4 z-[-1] flex">
            <div className="px-6 flex items-center h-20">
                <button className="h4 w-60 drop-shadow-xl h-12 rounded-md bg-primary dark:bg-secondary text-contrast" onClick={onClick}>
                    {t("save-changes-button")}
                </button>

            </div>
        </div>
    )
}