import { Group } from "@/models"

interface Props {
    group: Group
}
export const GroupComponent = ({ group }: Props) => {

    const description = group.description;

    const displayFullDescription = description ? (description.length > 23 ? `${description.substring(0, 23)}...` : description) : '';

    return (
        <div className="flex flex-row w-full gap-2">
           <div className=""> <img className="rounded-full w-14 h-14" src="/img/images.jfif"/> </div>
            <div className="flex flex-col">
                <div key={group.id} className="text-start p rounded-md h-7 w-full hover:brightness-95">{group.name}</div>
                <div className="text-start m14 rounded-md h-7 w-full hover:brightness-95">{displayFullDescription}</div>
            </div>
        </div>
    )

}
