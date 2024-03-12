
import { DatePost, LimitedPost, Page, Project, Property, SelectPost, TypeOfProperty } from "@/models";
import { useEffect, useState } from "react";
import { ModalRegisterProperty } from "../ModalRegisterProperty";
import { ModalProperty } from "../ModalProperty/ModalProperty";
import { propertyService } from "@/services";

type RegisterPropertyProps = {
    properties: Property[],
    project: Project,
    page?: Page
}

export const RegisterProperty = ({ properties, project, page }: RegisterPropertyProps) => {

    useEffect(() => {
        console.log(properties)
    }
        , [properties])

    const postProperty = async (name: string, selected: TypeOfProperty) => {
        try {
            let propertyObj = null;

            if ([TypeOfProperty.TIME, TypeOfProperty.USER, TypeOfProperty.ARCHIVE, TypeOfProperty.NUMBER, TypeOfProperty.PROGRESS, TypeOfProperty.TEXT].includes(selected)) {
                propertyObj = new LimitedPost(undefined, name, true, false, selected, page ? [page] : [], page ? undefined : project!, 1000);
                propertyService.saveLimited(propertyObj)
            } else if ([TypeOfProperty.CHECKBOX, TypeOfProperty.TAG, TypeOfProperty.RADIO, TypeOfProperty.SELECT].includes(selected)) {
                propertyObj = new SelectPost(undefined, name, true, false, selected, page ? [page] : [], page ? undefined : project!)
                propertyService.saveSelect(propertyObj)

            } else {
                propertyObj = new DatePost(undefined, name, true, false, selected, page ? [page] : [], page ? undefined : project!, false, false, false, false, "black")
                propertyService.saveDate(propertyObj)
            }

            if (propertyObj != null) {
                properties.push(propertyObj as Property)
            }

        } catch (error) {
            console.log(error)
        }

    }

    const deleteProperty = async (property: Property) => {
        try {
            console.log(properties, "antes")
            propertyService.delete(property.id)
            properties.includes(property) && properties.splice(properties.indexOf(property), 1)
            console.log(properties, "depois")
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
                    <div className="h-[85%] w-[70%] flex flex-col items-center gap-5">
                        <ModalRegisterProperty postProperty={postProperty} open={modalProperty} project={project && project} page={page} close={() => { setModalProperty(false) }} />
                        <div className="w-full gap-5 h-full flex flex-col overflow-scroll">
                            {properties.map((property) => {
                                return (
                                    <ModalProperty property={property} onClose={() => { return false }} onClick={() => { return true }}  deleteProperty={deleteProperty}/>
                                )
                            })}
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}