import { useTranslation } from "next-i18next";

interface Props {
    setCondition: (value: boolean) => void;
    modalPages: boolean;
    }
export const Navigate = ({modalPages, setCondition}:Props) => {
  const {t} = useTranslation();
  return (
    <div className="w-full h-1 relative text-primary dark:text-secondary font-alata decoration-solid z-[60]">
        <span className="flex gap-2 text-p" onClick={() => setCondition(false)}>
          <span className=" text-p hover:underline cursor-pointer">{t("main-sidebar")}</span>/
          <span className="text-p ">{modalPages? t("pages"):t("groups")}</span>
        </span>

    </div>
  );
};
