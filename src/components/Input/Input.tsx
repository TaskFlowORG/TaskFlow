import React, { ChangeEventHandler, forwardRef, useId, useState } from "react";
import { InputHTMLAttributes } from "react";

import * as S from "./style";
import { If } from "@/components/If";
import Image from "next/image";
import { InvisibleIcon, VisibleIcon } from "../icons";

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
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      disabled,
      onChange = () => {
        return;
      },
      type = "text",
      name = "",
      className = "",
      classNameInput = "",
      required = false,
      image = "",
      label = "",
      placeholder = "",
      helperText = "",
      register,
      ...props
    },
    ref
  ) => {
    const inputId = useId();

    const hasError: boolean = helperText.length > 0;

    const [show, setShow] = useState(false);

    return (
      <>
        <S.Container $haserror={hasError} className={className + " relative"}>
          {label && (
            <label className="dark:bg-modal-grey" htmlFor={inputId}>
              {label}
            </label>
          )}
          {image &&
          
          <Image width={20} height={20} src={image} alt="" />
          }
          <S.Input
            autoComplete="off"
            className={classNameInput + " bg-transparent appearance-none"}
            title={placeholder}
            type={type == "password" ? (show ? undefined : type) : type}
            id={inputId}
            disabled={disabled}
            {...register}
            placeholder={placeholder}
            {...props}
            onChange={(e) => {
              onChange();
              register.onChange(e);
            }}
            required={required}
          />
          <If condition={type == "password"}>
            <If condition={show}>
              <span className="absolute right-2" onClick={() => setShow(false)}><VisibleIcon /></span>
              <span className="absolute right-2" onClick={() => setShow(true)}><InvisibleIcon/></span>
            </If>
          </If>
        </S.Container>
        <div className="h-8">
          {hasError && (
            <S.Label className="text-red-500 text-sm">{helperText}</S.Label>
          )}
        </div>
      </>
    );
  }
);

