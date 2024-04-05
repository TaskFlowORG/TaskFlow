

import { InputHTMLAttributes, useState } from "react";
import { boolean } from "zod";
type InputCheckBoxProps = InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    image?: string;
    helperText?: string;
    register: any;
    isChecked: any;
};

export const InputCheckbox = ( isChecked: any, props : InputCheckBoxProps) => {

  
    const { label, ...rest } = props;
    return (
        <div className=" h-min flex items-center w-max gap-2">
            <input type="checkbox" className="w-8 aspect-square accent-primary dark:accent-secondary border-primary border-2 bg-grey" checked={checked} onChange={isChecked} />
            <label className="">{label}</label>
        </div>
    );
}

