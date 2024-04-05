
import { DatePost, LimitedPost, Page, Project, Property, SelectPost, TypeOfProperty } from "@/models";
import { useEffect, useRef, useState } from "react";
import { ModalRegisterProperty } from "../ModalRegisterProperty";

import { propertyService } from "@/services";
import { set } from "react-hook-form";
import { SideBarButton } from "../SideBarProjects/components/SideBarButton";
import { IconArchive, IconCalendar, IconCheckbox, IconNumber, IconProgress, IconRadio, IconSelect, IconText } from "../icons";
import { ModalDeleteProperty } from "../ModalDeleteProperty";
import { InputCheckbox } from "../Properties/InputCheckbox";
import { useClickAway } from "react-use";
import { ModalProperty } from "../ModalProperty/ModalProperty";

type RegisterPropertyProps = {
    properties: Property[],
    project: Project,
    page?: Page
}

export const RegisterProperty = ({ properties, project, page }: RegisterPropertyProps) => {
    const [propertiesArray, setPropertiesArray] = useState<Property[]>(properties)
    useEffect(() => {
        console.log(propertiesArray)
    }
        , [propertiesArray])

    const postProperty = async (name: string, selected: TypeOfProperty) => {
        try {
            console.log(name)
            let propertyObj;
            if ([TypeOfProperty.TIME, TypeOfProperty.USER, TypeOfProperty.ARCHIVE, TypeOfProperty.NUMBER, TypeOfProperty.PROGRESS, TypeOfProperty.TEXT].includes(selected)) {
                propertyObj = await propertyService.saveLimited(new LimitedPost(undefined, name, true, false, selected, page ? [page] : [], page ? undefined : project!, 1000));
            } else if ([TypeOfProperty.CHECKBOX, TypeOfProperty.TAG, TypeOfProperty.RADIO, TypeOfProperty.SELECT].includes(selected)) {
                propertyObj = await propertyService.saveSelect(new SelectPost(undefined, name, true, false, selected, page ? [page] : [], page ? undefined : project!))

            } else {
                propertyObj = await propertyService.saveDate(new DatePost(undefined, name, true, false, selected, page ? [page] : [], page ? undefined : project!, false, false, false, false, "black"))
            }
            
            setPropertiesArray([...propertiesArray, propertyObj])

        } catch (error) {
            console.log(error)
        }

    }



    const deleteProperty = async (property: Property) => {
        try {
            propertyService.delete(property.id)
            let list = [...propertiesArray];

            propertiesArray.includes(property) && list.splice(properties.indexOf(property), 1)
            setPropertiesArray(list)

        } catch (error) {
            console.log(error)
        }
    }
    const [modalProperty, setModalProperty] = useState(false)

 

    
    
    return (
        <>
            <div className="w-full h-full flex justify-end">
                <div className="w-96 h-full bg-white flex flex-col items-center rounded-sm  dark:bg-modal-grey shadow-blur-20 justify-center z-20 ">
                    <div className="h-[15%] w-[90%] flex justify-evenly items-center">
                        <p className="h4  bottom-8 right-5 relative text-grey-icon cursor-pointer hover:text-primary" onClick={() => close()}>{">>"}</p>
                        <p className="h4 text-primary dark:text-secondary">Propriedades</p>
                        <div className=" flex items-center justify-center h-7 w-7  rounded-full  shadowww cursor-pointer hover:bg-primary dark:hover:bg-secondary" onClick={() => { setModalProperty(true) }}>
                            <p className="h5 text-primary h-min w-min dark:text-secondary hover:text-white dark:hover:text-white">+</p>
                        </div>

                    </div>
                    <div className="h-[85%] w-72 flex flex-col items-center gap-5">
                        <ModalRegisterProperty postProperty={postProperty} open={modalProperty} project={project && project} page={page} close={() => { setModalProperty(false) }} />
                        <div className="w-full  h-full flex flex-col overflow-y-scroll none-scrollbar">
                            {propertiesArray.map((property,index) => {
                               
                                return (
                                    <ModalProperty key={index} property={property} deleteProperty={deleteProperty}/>
                                )
                            })}
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}