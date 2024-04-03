import { LocalModal } from "@/components/Modal"
import { Group } from "@/models"
import { useState } from "react"

interface Props {
    group: Group
}
export const GroupComponent = ({ group }: Props) => {
    const [showIcon, setShowIcon] = useState(false);

    const description = group.description;
    const displayFullDescription = description ? (description.length > 20 ? `${description.substring(0, 20)}...` : description) : '';

    return (
        <div
            className="flex flex-row w-full gap-2"
            onMouseEnter={() => setShowIcon(true)}
            onMouseLeave={() => setShowIcon(false)}
        >
            {/* colocar aqui a imagem do grupo */}
            <div className="rounded-full w-14 h-14 bg-purple-300"> </div>
            <div className="flex flex-col">
                <div key={group.id} className="text-start p rounded-md h-7 w-full hover:brightness-95">{group.name}</div>
                <div className="text-start m14 rounded-md h-7 w-full hover:brightness-95">{displayFullDescription}</div>
            </div>
            <div className="flex self-center pl-5">
                {showIcon && (
                    <div className="flex flex-row-reverse">
                        <span className="h-8 w-8 p-2 mr-2 rounded-full rotate-90 bg-white dark:bg-modal-grey hover:brightness-95">
                            <svg className="w-full h-full" viewBox="0 0 14 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5 1.5L12.5 12.5L1.5 23.5" className="stroke-primary dark:stroke-secondary" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                        </span>
                    </div>
                )}
            </div>
        </div>
    )
}
