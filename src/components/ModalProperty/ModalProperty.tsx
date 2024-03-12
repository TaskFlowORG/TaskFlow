import { Property, Select } from "@/models";
import { useState } from "react";
import { IconArchive, IconCalendar, IconCheckbox, IconNumber, IconProgress, IconRadio, IconSelect, IconText } from "../icons";
import { Input } from "../Input";
import { ModalDeleteProperty } from "../ModalDeleteProperty"
import { InputCheckbox } from "../Properties/InputCheckbox";

type ModalPropertyProps = {
    property: Property;
    onClose: () => boolean;
    onClick: () => boolean;
    deleteProperty: (property: Property) => void;
};


export const ModalProperty = ({ property, onClose, onClick, deleteProperty}: ModalPropertyProps) => {


    const [open, setOpen] = useState(false);
    const openModal = () => {

        if (open) {
            setOpen(onClose())
        } else {
            setOpen(onClick())
        }
    }

    const [ModalDelete, setModalDelete] = useState(false)

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
        <>
            <div key={property.id} className="w-full h-10 flex items-center justify-center border-b border-primary dark:border-secondary cursor-pointer bg-white dark:bg-modal-grey hover:brightness-95" onClick={() => openModal()}>
                <div className="h-10 w-1/5 flex items-center "> {fnReturnImageProperty(property.type)}</div>
                <p className="h-full w-3/5 flex items-center justify-centerd">{property.name}</p>
            </div>
            {open &&
                <div className="w-full  flex flex-col justify-center items-center border-b border-primary dark:border-secondary">
                    <div className="h-32 w-full flex flex-col items-center">
                       <InputCheckbox register={undefined} className="w-[30%] h-1/3 flex justify-center items-center border-primary outline-none border-2" classNameDiv={"h-2/6 flex justify-center items-center"} label="Visible"></InputCheckbox>
                       <InputCheckbox register={undefined} className="w-[30%] h-1/3 flex justify-center items-center border-primary outline-none border-2" classNameDiv={"h-2/6 flex justify-center items-center"} label="Obligatory"></InputCheckbox>
            
                    </div>
                    <div className="h-1/6 w-[95%] flex justify-between">
                        <button className="w-8 h-5/6 flex justify-center items-center rounded-sm"><img src="/img/trash.svg" alt="" onClick={() => { setModalDelete(true) }} /></button>
                        <button className="w-8 h-5/6 flex justify-center items-center rounded-sm" onClick={() => { }} ><img src="/img/iconCorrect.svg" alt="" /></button>
                        {ModalDelete && <ModalDeleteProperty property={property} close={() => setModalDelete(false)} deleteProperty={deleteProperty} />}
                    </div>
                </div>

            }
        </>
    );

}