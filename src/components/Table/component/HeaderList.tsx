import { TaskValue } from "@/models";
import { IconsSelector } from ".";

interface Props {
    name: string;
    justName: boolean;
    p?: TaskValue;
}

export const HeaderList = ({name, justName, p}:Props) => {
    return (
        <th className="flex h5 text-primary dark:text-secondary gap-4 p-3 h-14 sm:h-20 w-max truncate items-center justify-start text-modal-grey
        dark:text-white border-zinc-400 dark:border-zinc-600 border-b-2 font-normal" key={p?.id}>
           <IconsSelector property={p?.property} justName={false}  />
           <p className={"w-full truncate " + (p?.property.name ? "":"opacity-50")}>{ p?.property.name ?? "Sem Nome"}</p>
        </th>
    )
}