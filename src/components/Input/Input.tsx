import React, { forwardRef, useId } from "react";
import { InputHTMLAttributes } from "react";
import * as S from './style';
type InputProps = InputHTMLAttributes<HTMLInputElement> &{
    label?: string;
    image?: string;
    helperText?: string;
    register : any;
};
 


// forwardRef o primeiro parametro é o tipo de elemento que vai ser referenciado e o segundo é o tipo de props que ele vai receber;
export const Input = forwardRef<HTMLInputElement, InputProps> (({type='text', name='', required=false , image='', label='',placeholder='', helperText='', register , ...props},ref) => {
   
   const inputId = useId();
  
   const haserror: boolean = helperText.length>0;

    return (
        <>
            <S.Container $haserror={haserror} className="w-full flex justify-center items-center gap-2 shadow-blur-10 h-1/6  bg-white rounded-md font-montserrat focus-within:border-primary border-2 dark:focus-within:border-secondary duration-300 dark:bg-modal-grey dark:shadow-blur-20">
                    {label && <label className="w-1/6 flex justify-center items-center" htmlFor={inputId}>{label}</label>}
                    <img src={image} alt="" />
                    <S.Input className="w-5/6 h-full outline-none  px-5 dark:bg-modal-grey" type={type} id={inputId}   {...register} placeholder={placeholder} {...props}
                    required={required} />
            </S.Container>
           {haserror && <S.Label className="text-red-500 text-sm px-5">{helperText}</S.Label>}
        </>
    )
})