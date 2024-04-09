import { LocalModal } from "@/components/Modal"
import { Group } from "@/models"

interface Props{
    isOpen: boolean 
    group: Group
}

export const GroupModal = ({isOpen, group}: Props) =>{

    if(isOpen){
        return(
            <LocalModal
        )

    }

}