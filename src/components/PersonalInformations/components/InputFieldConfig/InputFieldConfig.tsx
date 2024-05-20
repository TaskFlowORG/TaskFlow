import { EditIcon } from "@/components/icons"
import { ChangeEventHandler } from "react"

interface InputFieldConfigProps {
    id: string
    label?: string
    type: string
    value?: string
    onChange?: ChangeEventHandler<HTMLInputElement>
    placeholder?: string
    disabled?: boolean
    classes?: string,
    helperText?: string
    hasImage: boolean
    onClick?: () => void
}

export const InputFieldConfig = ({ id, label, type, value, onChange, placeholder, disabled, classes, hasImage, onClick }: InputFieldConfigProps) => {

    return (
        <div className={"w-full " + (classes)}>
            <label className="text-p font-montserrat flex flex-col w-full dark:text-white ">
                {label}
                <div className="flex items-center shadow-blur-10 bg-input-grey-opacity border-2 border-input-grey border-opacity-[70%] rounded-md focus:outline-none h-12">

                    <input
                        className={`bg-transparent w-full h-full text-p font-montserrat outline-none placeholder: pl-4`}
                        id={id} type={type} value={value} onChange={onChange} placeholder={placeholder} disabled={disabled} />
                    
                    <div onClick={onClick}>
                        {hasImage && <EditIcon classes="w-6 h-6 stroke-primary dark:stroke-secondary" />}
                    </div>
                </div> 
            </label>
        </div>
    )
}