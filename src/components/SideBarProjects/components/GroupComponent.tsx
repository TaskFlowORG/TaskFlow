import { LocalModal } from "@/components/Modal"
import { Group } from "@/models"
import { groupService } from "@/services"
import { useEffect, useState } from "react"

interface Props {
    group: Group
}
export const GroupComponent = ({ group }: Props) => {
    const [showIcon, setShowIcon] = useState(false);
    const [groupImage, setGroupImage] = useState('');

    // useEffect (() =>{
    //     setGroupImage(group.picture.data);
    // })

    const description = group.description;
    const displayFullDescription = description ? (description.length > 13 ? `${description.substring(0, 13)}...` : description) : '';

    const deleteGroup = () => {
        groupService.delete(group.id)
    }

    return (
        <div
            className="flex flex-row w-full gap-2"
            onMouseEnter={() => setShowIcon(true)}
            onMouseLeave={() => setShowIcon(false)}
        >
            {/* colocar aqui a imagem do grupo depois*/}
            <div className="rounded-full w-14 h-14 bg-purple-300"> </div>
            <div className="flex flex-col">
                <div key={group.id} className="text-start p rounded-md h-7 w-full hover:brightness-95">{group.name}</div>
                <div className="text-start m14 rounded-md h-7 w-full hover:brightness-95">{displayFullDescription}</div>
            </div>
            <div className="flex self-center pl-4">
                {showIcon && (
                    <div className="flex flex-row-reverse" onClick={() => deleteGroup()}>
                        <span className="h-8 w-8 rounded-lg bg-white dark:bg-modal-grey hover:brightness-95 flex justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="25" viewBox="0 0 47 54" fill="none" className="text-primary dark:text-secondary stroke-current">
                                <path d="M42.6111 19.5L37.8453 47.865C37.6508 49.0234 37.0724 50.073 36.2117 50.8293C35.351 51.5856 34.263 52.0001 33.1392 52H13.8608C12.737 52.0001 11.649 51.5856 10.7883 50.8293C9.92758 50.073 9.34915 49.0234 9.15472 47.865L4.38889 19.5M45 12H31.5625M31.5625 12V7C31.5625 5.67392 31.0591 4.40215 30.1631 3.46447C29.2671 2.52678 28.0519 2 26.7847 2H20.2153C18.9481 2 17.7329 2.52678 16.8369 3.46447C15.9409 4.40215 15.4375 5.67392 15.4375 7V12M31.5625 12H15.4375M2 12H15.4375" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>

                    </div>
                )}
            </div>
        </div>
    )
}
