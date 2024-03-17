import { Page, Property, TaskValue } from "@/models";
import { IconsSelector } from ".";

interface Props {
    name: string;
    page?: Page;
    p?: Property;
}

export const HeaderList = ({name, page, p}:Props) => {
    return (
        <div className="flex h5 text-primary dark:text-secondary gap-4 p-3 h-14 w-full sm:h-20 items-center justify-start text-modal-grey
        dark:text-white font-normal" key={p?.id}>
           <IconsSelector property={p} page={page} />
           <p className={" w-min truncate " + (name?  "":"opacity-50")}>{ name? name : "Sem Nome" }</p>
        </div>
    )
}