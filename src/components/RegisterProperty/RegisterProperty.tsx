import { z } from "zod";
import { Page, Project, Property, TypeOfProperty } from "@/models";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select } from "../Select";
import { useEffect, useState } from "react";
import { ModalRegisterProperty } from "../ModalRegisterProperty";
import { ModalProperty } from "../ModalProperty/ModalProperty";
const schema = z.object({
    name: z.string().min(3, { message: "Nome deve conter no minimo 3 caracteres" }).max(20, { message: "Nome deve conter no maximo 20 caracteres" }),
    type: z.enum(["TEXT", "DATE", "ARCHIVE", "NUMBER", "CHECKBOX", "RADIO", "PROGRESS", "SELECT"]),
})

type RegisterPropertyProps = {
    open: boolean;
    close: () => void;
    properties: Property[],
    project: Project,
    page?: Page
}

export const RegisterProperty = ({ open = false, close, properties, project, page }: RegisterPropertyProps) => {

    useEffect(() => {
        console.log(properties)
    }
        , [properties])

    const [modalProperty, setModalProperty] = useState(false)
    const registerProperty = () => {
        console.log('register')
    }



    type FormData = z.infer<typeof schema>;
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm<FormData>({
        mode: "all",
        reValidateMode: "onChange",
        resolver: zodResolver(schema),
    });

    return (
        <>
            {open &&
                <div className="h-screen w-screen   z-10 justify-end flex " >
                    <div className="w-[80%]" onClick={()=> close()}></div>
                    <div className="w-[20%]  h-full bg-white flex flex-col items-center rounded-sm  dark:bg-modal-grey shadow-blur-20 justify-center z-20 ">
                        <div className="h-[15%] w-[90%] flex justify-evenly items-center">
                            <p className="h4  bottom-8 right-5 relative text-grey-icon cursor-pointer hover:text-primary" onClick={()=> close()}>{">>"}</p>
                            <p className="h4 text-primary dark:text-secondary">Propriedades</p>
                            <div className=" flex items-center justify-center h-7 w-7  rounded-full  shadowww cursor-pointer hover:bg-primary dark:hover:bg-secondary" onClick={() => { setModalProperty(true) }}>
                                <p className="h5 text-primary h-min w-min dark:text-secondary hover:text-white dark:hover:text-white">+</p>
                            </div>
                        </div>
                        <div className="h-[85%] w-[70%] flex flex-col items-center gap-5">
                            <ModalRegisterProperty open={modalProperty} project={project && project} page={page} close={() => { setModalProperty(false) }} />
                            <div className="w-full gap-5 h-full flex flex-col overflow-scroll">
                                {properties.map((property) => {
                                    return (
                                        <ModalProperty property={property} onClose={() => { return false }} onClick={() => { return true }} />
                                    )
                                })}
                            </div>
                        </div>

                    </div>
                </div>
            }
        </>
    )
}