import { Group } from "@/models"

interface Props {
    group: Group
}
export const GroupUnique = ({ group }: Props) => {

    const description = group.description;

    const displayFullDescription = description ? (description.length > 23 ? `${description.substring(0, 23)}...` : description) : '';

    return (
        <div className="flex flex-row w-full gap-2">
            {/* <img src="/img/miniGroup.svg" className="h-5 w-5 rounded-md" /> */}
           <div> <img src="/img/themeLight/group.svg"/> </div>
            <div className="flex flex-col">
                <div key={group.id} className="text-start p rounded-md h-7 w-full hover:brightness-95">{group.name}</div>
                {/* 26 letras */}
                <div className="text-start m14 rounded-md h-7 w-full hover:brightness-95">{displayFullDescription}</div>
                
            </div>
        </div>
    )

}
