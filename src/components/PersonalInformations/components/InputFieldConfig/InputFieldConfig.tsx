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
}

export const InputFieldConfig = ({ id, label, type, value, onChange, placeholder, disabled, classes}: InputFieldConfigProps) => {

    return (
        <div className={"w-full " + (classes)}>
            <label className="text-p font-montserrat flex flex-col w-full dark:text-white">
                {label}
                <input
                    className={`shadow-blur-10 bg-input-grey-opacity border-2 border-input-grey border-opacity-[70%] rounded-md pl-4 focus:outline-none h-12`}
                    id={id} type={type} value={value} onChange={onChange} placeholder={placeholder} disabled={disabled} />
            </label>
        </div>
    )
}