import { ChangeEventHandler } from "react"

export const InputFieldConfig = ({ id, label, type, value, onChange, placeholder }: { id: string, label: string, type: string, value: string, onChange: ChangeEventHandler<HTMLInputElement>, placeholder: string }) => {

    return (
        <div className="px-6 w-full">
            <label className="flex flex-col w-full dark:text-white">
                {label} <input
                    className={`shadow-blur-10 bg-input-grey-opacity border-2 border-input-grey border-opacity-[70%] rounded-md w-full pl-4 focus:outline-none h-12`}
                    id={id}
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                />
            </label>
        </div>
    )
}