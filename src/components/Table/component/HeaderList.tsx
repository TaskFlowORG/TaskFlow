import { Property, TaskValue } from "@/models";
import { IconsSelector } from ".";

interface Props {
    name: string;
    justName: boolean;
    p?: Property;
}

export const HeaderList = ({name, justName, p}:Props) => {
    return (
        <div className="flex h5 text-primary dark:text-secondary gap-4 p-3 h-14 w-full sm:h-20 items-center justify-start text-modal-grey
        dark:text-white font-normal" key={p?.id}>
           <IconsSelector property={p} justName={justName}  />
           <p className={" w-min truncate " + (p?.name || justName ? "":"opacity-50")}>{  "Sem Nome asdukjghsjkdfhgjldhfgdjkdfhgjdkfgjkndfhjlk" }</p>
        </div>
    )
}