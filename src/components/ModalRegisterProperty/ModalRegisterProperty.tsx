import { DatePost, LimitedPost, Page, Project, PropertyPost, SelectPost, TypeOfProperty } from "@/models";
import { Input } from "../Input";
import { Select } from "../Select";
import { SelectedArea } from "../Pages/components/Canvas/SelectedArea";
import { SelectWithImage } from "../SelectWithImage/SelectwithImage";
import { IconArchive, IconCalendar, IconCheckbox, IconNumber, IconProgress, IconRadio, IconSelect, IconText } from "../icons";
import { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { ZodError, object, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { propertyService } from "@/services";
import { log } from "console";
type ModalRegisterPropertyProps = {
    open: boolean;
    close: () => void;
    project: Project;
    page?: Page;

}

const schema = z.object({
    name: z.string().nonempty("Nome da propriedade não pode ser vazio")
        .min(3, "Nome da propriedade deve ter no mínimo 3 caracteres")
        .max(50, "Nome da propriedade deve ter no máximo 50 caracteres")
})

export const ModalRegisterProperty = ({ open, close, page, project }: ModalRegisterPropertyProps) => {
    const [selected, setSelected] = useState<TypeOfProperty>(TypeOfProperty.TEXT);
    const [nameProperty, setNameProperty] = useState<string>("");
    const [object, setObject] = useState({} as FormData)
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

    const postProperty = async () => {
        try {

            if ([TypeOfProperty.TIME, TypeOfProperty.USER, TypeOfProperty.ARCHIVE, TypeOfProperty.NUMBER, TypeOfProperty.PROGRESS, TypeOfProperty.TEXT].includes(selected)) {
                propertyService.saveLimited(new LimitedPost(undefined, nameProperty, true, false, selected, page ? [page] : [], page ? undefined : project!, 1000))
            } else if ([TypeOfProperty.CHECKBOX, TypeOfProperty.TAG, TypeOfProperty.RADIO, TypeOfProperty.SELECT].includes(selected)) {
                propertyService.saveSelect(new SelectPost(undefined, nameProperty, true, false, selected, page ? [page] : [], page ? undefined : project!))

            } else {
                propertyService.saveDate(new DatePost(undefined, nameProperty, true, false, selected, page ? [page] : [], page ? undefined : project!, false, false, false, false, "black"))
            }


        } catch (error) {
            console.log(error)
        }

    }
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
                                console.log(selected)

                            }} />
                        <Input register={{ ...register("name") }} value={object.name} classNameInput={" p outline-none w-[90%] h-full"} placeholder="Nome da Propriedade" />

                    </div>
                </div>
                <div className="h-1/6 w-[95%] flex justify-between">
                    <button className="w-8 h-5/6 flex justify-center items-center rounded-sm"><img src="/img/trash.svg" alt="" onClick={()=>{close()}}/></button>
                    <button className="w-8 h-5/6 flex justify-center items-center rounded-sm" onClick={() => {
                        const result = schema.parse({ name: nameProperty, type: selected })
                        setNameProperty(getValues().name)
                        console.log(nameProperty)
                        try {
                            if (nameProperty !== "") {
                                postProperty()
                                close()
                            } else {
                                console.log("Nome da propriedade não pode ser vazio")
                            }
                        } catch (error) {
                            console.log(error)
                        }
                    }} ><img src="/img/iconCorrect.svg" alt="" /></button>
                </div>
            </div>}
        </>
    );
}
