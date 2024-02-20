import { z } from "zod";
import { Input } from "../Input";
import { TypeOfProperty } from "@/models";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select } from "../Select";
import { get } from "http";
import { useState } from "react";
const schema = z.object({
    name: z.string().min(3, { message: "Nome deve conter no minimo 3 caracteres" }).max(20, { message: "Nome deve conter no maximo 20 caracteres" }),
    type: z.enum(["TEXT", "DATE", "ARCHIVE", "NUMBER" , "CHECKBOX", "RADIO","PROGRESS", "SELECT" ]),
})

type RegisterPropertyProps = {
    open: boolean;
    close: () => void;
}

export const RegisterProperty = ({ open = false, close }: RegisterPropertyProps) => { 
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

    const [type, setType] = useState("")
    console.log(type)
    return (

        <>
            {open &&
                <div className="h-screen w-screen absolute  z-10 justify-end flex ">

                    <div className="w-[20%] h-full bg-white flex flex-col items-center rounded-sm  dark:bg-modal-grey shadow-blur-20">
                        <div className="h-[5%] w-full flex justify-end items-center">
                            <p className='  p-[8%] lg:p-[4%] text-2xl hover:text-red-500 cursor-pointer' onClick={close}>x</p>
                        </div>
                        <form onSubmit={handleSubmit()} className='h-[80%] w-[90%]'>
                                <Input register={{ ...register("name") }} className="h-[10%] w-[50%] outline-none"
                                    classNameInput={' outline-none bg-transparent border-b-4 border-input-grey-opacity dark:border-back-grey text-3xl'}
                                    placeholder="Nome da Propriedade" />

                                <Select options={["TEXT", "DATE", "ARCHIVE", "NUMBER" , "CHECKBOX", "RADIO","PROGRESS", "SELECT" ]} defaultValue={undefined}  change={setType} />
                               

                        </form>
                    </div>
                </div>

            }
        </>
    )

}