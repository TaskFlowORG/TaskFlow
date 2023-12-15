import React, { forwardRef, useId } from "react";
import { InputHTMLAttributes } from "react";
import * as S from './style';
type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    image?: string;
    helperText?: string;
    register: any;
    classNameInput: string;
};



// forwardRef o primeiro parametro é o tipo de elemento que vai ser referenciado e o segundo é o tipo de props que ele vai receber;
export const Input = forwardRef<HTMLInputElement, InputProps>(({ type = 'text', name = '', className = "", classNameInput = "", required = false, image = '', label = '', placeholder = '', helperText = '', register, ...props }, ref) => {

    const inputId = useId();


    const hasError: boolean = helperText.length > 0;


    return (
        <>
            <S.Container $haserror={hasError} className={className}>
                {label && <label className="w-1/6 flex justify-center items-center" htmlFor={inputId}>{label}</label>}
                <img src={image} alt="" />
                <S.Input className={classNameInput} type={type} id={inputId}   {...register} placeholder={placeholder} {...props}

                    required={required} />
            </S.Container>
            {hasError && <S.Label className="text-red-500 text-sm px-5">{helperText}</S.Label>}

        </>
    )
})