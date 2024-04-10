


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
        <div className=" h-min flex items-center w-max gap-2">
            <input type="checkbox" className="w-8 aspect-square accent-primary dark:accent-secondary border-primary border-2 bg-grey" {...register}  />
            
            <label className="">{label}</label>
        </div>
    );
}
