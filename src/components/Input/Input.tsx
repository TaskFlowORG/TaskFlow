import React, { ChangeEventHandler, forwardRef, useId } from "react";
import { InputHTMLAttributes } from "react";
import * as S from './style';
import { If } from "@/components/If"
type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    image?: string;
    helperText?: string;
    register?: any;
    classNameInput: string;
    onChange?: () => void;
};



// forwardRef o primeiro parametro é o tipo de elemento que vai ser referenciado e o segundo é o tipo de props que ele vai receber;
// eslint-disable-next-line react/display-name
export const Input = forwardRef<HTMLInputElement, InputProps>(({ disabled,  onChange = () => {return}, type = 'text', name = '', className = "", classNameInput = "", required = false, image = '', label = '', placeholder = '', helperText = '', register, ...props}, ref) => {

    const inputId = useId();


    const hasError: boolean = helperText.length > 0;


    return (
        <>
            <S.Container $haserror={hasError} className={className}>
                {label && <label className="dark:bg-modal-grey" htmlFor={inputId}>{label}</label>}
                <img src={image} alt="" />
                <S.Input className={classNameInput + " bg-transparent"} title={placeholder} type={type} id={inputId} disabled={disabled}  {...register} placeholder={placeholder} {...props}
                    onChange={(e) => {
                        onChange();
                        register?.onChange(e);
                    }}
                    required={required} />

            </S.Container>
            <div className="h-8">
            {hasError && <S.Label className="text-red-500 text-sm ">{helperText}</S.Label>}
            </div>
        </>
    )
})