import { Page, Project, TypeOfProperty } from "@/models";
import { Input } from "../Input";
import { SelectWithImage } from "../SelectWithImage/SelectwithImage";
import { IconArchive, IconCalendar, IconCheckbox, IconNumber, IconProgress, IconRadio, IconSelect, IconText, IconTrashBin } from "../icons";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconSave } from "../icons/Slidebarprojects/IconSave";
import { ContentModalProperty } from "../ContentModalProperty";

type ModalRegisterPropertyProps = {
    open: boolean;
    close: () => void;
    project: Project;
    page?: Page;
    postProperty: (name: string, values:any, select: TypeOfProperty) => void;
}

const schema = z.object({
    name: z.string().nonempty("Nome da propriedade não pode ser vazio")
        .min(3, "Nome da propriedade deve ter no mínimo 3 caracteres")
        .max(50, "Nome da propriedade deve ter no máximo 50 caracteres"),
    maximum: z.number().optional().default(0),
    visible: z.boolean().optional().default(true),
    obligatory: z.boolean().optional().default(false),
    pastDate: z.boolean().optional().default(false),
    schedule: z.boolean().optional().default(false),
    hours: z.boolean().optional().default(false),
    deadline: z.boolean().optional().default(false),
    color: z.string().optional().default("black")
})

export const ModalRegisterProperty = ({ open, close, page, project, postProperty}: ModalRegisterPropertyProps) => {
    const [selected, setSelected] = useState<TypeOfProperty>(TypeOfProperty.TEXT);
    const [object, setObject] = useState({  } as FormData);

    type FormData = z.infer<typeof schema>;
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors }
    } = useForm<FormData>(
        {
            mode: "all",
            reValidateMode: "onChange",
            resolver: zodResolver(schema)
        }
    );
    return (
        <>
            {open && <div className="h-1/6 w-full   flex flex-col justify-center items-center">
                <div className="h-3/6 w-full flex flex-col">
                    <div className="h-full w-full border-b border-primary dark:border-secondary flex  items-center  justify-evenly gap-1">
                        <SelectWithImage list={[
                            { value: TypeOfProperty.ARCHIVE, image: <IconArchive /> },
                            { value: TypeOfProperty.CHECKBOX, image: <IconCheckbox /> },
                            { value: TypeOfProperty.DATE, image: <IconCalendar /> },
                            { value: TypeOfProperty.NUMBER, image: <IconNumber /> },
                            { value: TypeOfProperty.PROGRESS, image: <IconProgress /> },
                            { value: TypeOfProperty.RADIO, image: <IconRadio /> },
                            { value: TypeOfProperty.SELECT, image: <IconSelect /> },
                            { value: TypeOfProperty.TEXT, image: <IconText /> }
                        ]}
                            selected={selected} onChange={function (value: string): void {
                                setSelected(value as TypeOfProperty)
                                console.log(value.toString())
                            }} />
                        <Input register={{ ...register("name") }} value={object.name} className="flex justify-center items-center" classNameInput={"bg-transparent p outline-none w-[90%] h-full"} placeholder="Nome da Propriedade" />
                        <button className="w-5 h-5/6 flex justify-center items-center rounded-sm stroke-primary dark:stroke-secondary" onClick={()=>{close()}}><IconTrashBin/></button>
                    <button className="w-5 h-5/6 flex justify-center items-center rounded-sm" onClick={() => {
                        if (errors.name ||  getValues().name === ""){
                            return
                        }
                        postProperty(getValues().name, getValues(),selected)
                        close()
                        
                        setValue("name",'')
                     
                    }} ><IconSave/></button>
                    </div>    
                </div>
                <p className=" w-full h-2/6 flex items-center p text-red-500  justify-center">{errors.name?.message}</p>
                
            </div>}
        </>
    );
}
