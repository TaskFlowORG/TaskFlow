import { DatePost, LimitedPost, Page, Project, PropertyPost, SelectPost, TypeOfProperty } from "@/models";
import { Input } from "../Input";
import { SelectWithImage } from "../SelectWithImage/SelectwithImage";
import { IconArchive, IconCalendar, IconCheckbox, IconNumber, IconProgress, IconRadio, IconSelect, IconText, IconTrashBin } from "../icons";
import { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { ZodError, object, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconSave } from "../icons/Slidebarprojects/IconSave";

type ModalRegisterPropertyProps = {
    open: boolean;
    close: () => void;
    project: Project;
    page?: Page;
    postProperty: (name: string, selected: TypeOfProperty) => void;

}

const schema = z.object({
    name: z.string().nonempty("Nome da propriedade não pode ser vazio")
        .min(3, "Nome da propriedade deve ter no mínimo 3 caracteres")
        .max(50, "Nome da propriedade deve ter no máximo 50 caracteres")
})

export const ModalRegisterProperty = ({ open, close, page, project, postProperty}: ModalRegisterPropertyProps) => {
    const [selected, setSelected] = useState<TypeOfProperty>(TypeOfProperty.TEXT);
    const [nameProperty, setNameProperty] = useState<string>("");
    const [object, setObject] = useState({  } as FormData);

    type FormData = z.infer<typeof schema>;
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors }
    } = useForm<FormData>(
        {
            mode: "all",
            reValidateMode: "onChange",
            resolver: zodResolver(schema)
        }
    );


    useEffect(() => {
        const obj = new LimitedPost(undefined, "", true, true, TypeOfProperty.TEXT, [], undefined, 0)
        console.log(obj)
    }, [])

   
    return (
        <>
            {open && <div className="h-2/6 w-full   flex flex-col justify-center items-center border-b border-primary dark:border-secondary">
                <div className="h-5/6 w-full flex flex-col">
                    <div className="h-2/6 w-full border-b border-primary dark:border-secondary flex justify-center items-center">
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
                            selected={TypeOfProperty.TEXT} onChange={function (value: string): void {
                                setSelected(value as TypeOfProperty)
                                console.log(value.toString())
                            }} />
                        <Input register={{ ...register("name") }} value={object.name} classNameInput={"bg-transparent p outline-none w-[90%] h-full"} placeholder="Nome da Propriedade" />

                    </div>
                </div>
                <div className="h-1/6 w-[95%] flex justify-between">
                    <button className="w-8 h-5/6 flex justify-center items-center rounded-sm dark:stroke-secondary" onClick={()=>{close()}}><IconTrashBin/></button>
                    <button className="w-8 h-5/6 flex justify-center items-center rounded-sm" onClick={() => {
                        postProperty(getValues().name, selected)
                        close()
                     
                    }} ><IconSave/></button>
                </div>
            </div>}
        </>
    );
}
