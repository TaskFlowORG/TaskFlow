import { ChangeEventHandler } from "react"
import * as S from './style';
import { If } from "@/components/If";

interface InputFieldConfigProps {
    id: string
    label?: string
    type: string
    value?: string
    onChange?: ChangeEventHandler<HTMLInputElement>
    placeholder: string
    disabled?: boolean
    classes?: string
    helperText?: string
    hasError: boolean
}

export const InputFieldConfig = ({ id, label, type, value, onChange, placeholder, disabled, classes, helperText, hasError }: InputFieldConfigProps) => {

    return (
        <div className={"w-full " + (classes)}>
            <label className="flex flex-col w-full dark:text-white">
                {label}
                <input
                    className={`shadow-blur-10 bg-input-grey-opacity border-2 border-input-grey border-opacity-[70%] rounded-md w-full pl-4 focus:outline-none h-12`}
                    id={id} type={type} value={value} onChange={onChange} placeholder={placeholder} disabled={disabled} />
            </label>
            <If condition={hasError}>
                <S.Label className="text-red-500 text-sm">{helperText}</S.Label>
            </If>
        </div>
    )
}