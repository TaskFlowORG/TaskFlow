import { Page, Property } from "@/models";
import { IconsSelector } from "./IconsSelector";
import { useTranslation } from "next-i18next";

interface Props {
    name: string;
    page?: Page;
    p?: Property;
}

export const HeaderList = ({name, page, p}:Props) => {
  const {t} = useTranslation();

    return (
        <div className="flex h5 text-primary dark:text-secondary ml-4 gap-4 p-3 h-14 w-[90%]  sm:h-20 items-center justify-start text-modal-grey
        dark:text-white font-normal " key={p?.id} title={name??t("withoutname")}>
            <span className={"flex " + (page ? "w-min h-min" : "w-[18px] h-[18px]")}>
                <IconsSelector property={p} page={page} />
            </span>
           <p className={"w-min truncate font-alata text-h5 " + (name?  "":"opacity-50")}>{ name ? name : t("withoutname") }</p>
        </div>
    )
}