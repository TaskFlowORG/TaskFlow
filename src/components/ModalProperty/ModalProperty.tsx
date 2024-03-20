import { useState, useRef } from "react";
import { useClickAway } from "react-use";
import { ModalDeleteProperty } from "../ModalDeleteProperty";
import { InputCheckbox } from "../Properties/InputCheckbox";
import { SideBarButton } from "../SideBarProjects/components/SideBarButton";
import { Property } from "@/models";
import { IconText, IconArchive, IconCalendar, IconNumber, IconProgress, IconRadio, IconSelect, IconCheckbox, IconTrashBin } from "../icons";
import { IconSave } from "../icons/Slidebarprojects/IconSave";

type ModalPropertyProps = {
    property: Property,
    deleteProperty: (property: Property) => void

}

export const 
ModalProperty = ({property,deleteProperty}:ModalPropertyProps) => {
  
    const [isHovering, setIsHovering] = useState(false)
    const [ModalDelete, setModalDelete] = useState(false)
    const [openOptions, setOpenOptions] = useState(false)
    const ref = useRef(null)
    useClickAway(ref, () => setOpenOptions(false))
    const fnReturnImageProperty = (type: string) => {
        switch (type) {
            case "TEXT":
                return <IconText />
            case "ARCHIVE":
                return <IconArchive />
            case "DATE":
                return <IconCalendar />
            case "NUMBER":
                return <IconNumber />
            case "PROGRESS":
                return <IconProgress />
            case "RADIO":
                return <IconRadio />
            case "SELECT":
                return <IconSelect />
            case "CHECKBOX":
                return <IconCheckbox />
            default:
                break;
        }
    }
    return (
        <div key={property.id} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} className="w-full">
            <SideBarButton text={property.name} icon={fnReturnImageProperty(property.type)}
                openOptions={openOptions} fnOpenOptions={() => setOpenOptions(true)} openOptionsRef={ref} isHovering={isHovering}>
                <div className="w-full h-full flex flex-col justify-center items-center dark:bg-modal-grey">
                    <div className="h-full w-full flex flex-col items-center">
                        <InputCheckbox register={undefined} className="w-[30%] h-1/3 flex justify-center items-center border-primary outline-none border-2" classNameDiv={"h-2/6 flex justify-center items-center"} label="Visible"></InputCheckbox>
                        <InputCheckbox register={undefined} className="w-[30%] h-1/3 flex justify-center items-center border-primary outline-none border-2" classNameDiv={"h-2/6 flex justify-center items-center"} label="Obligatory"></InputCheckbox>

                    </div>
                    <div className=" h-min pb-2 w-[95%] flex justify-between">
                        <button className="w-8 h-5/6 flex justify-center items-center rounded-sm stroke-primary dark:stroke-secondary" onClick={() => { setModalDelete(true) }}> <IconTrashBin /></button>
                        <button className="w-8 h-5/6 flex justify-center items-center rounded-sm" onClick={() => { }} ><IconSave/></button>
                        {ModalDelete && <ModalDeleteProperty property={property} close={() => setModalDelete(false)} deleteProperty={deleteProperty} />}
                    </div>
                </div>
            </SideBarButton>
        </div>
    );
}