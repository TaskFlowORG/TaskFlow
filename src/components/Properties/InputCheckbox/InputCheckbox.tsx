


import { InputHTMLAttributes, useState } from "react";
type InputCheckBoxProps = InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    image?: string;
    helperText?: string;
    register: any;
};

export const InputCheckbox = ( {label, image, helperText, register}: InputCheckBoxProps) => {

    const [isChecked, setIsChecked] = useState<boolean>(false);
    return (
        <div className=" h-min flex items-center w-full gap-2" title={label}>
            <input type="checkbox" className="w-8 aspect-square accent-primary dark:accent-secondary border-primary border-2 bg-grey" {...register}  />
            
            <label className="truncate w-full">{label}</label>
        </div>
    );
}
