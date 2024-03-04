import { InputHTMLAttributes } from "react";
type InputCheckBoxProps = InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    image?: string;
    helperText?: string;
    register: any;
    classNameDiv: string;
};

export const InputCheckbox = ( props : InputCheckBoxProps) => {
    const { label, ...rest } = props;
    return (
        <div className=" flex items-center w-[50%] ">
            <input type="checkbox" className="w-1/6 accent-primary dark:accent-secondary border-primary border-2 bg-grey"  />
            <label className="">{label}</label>
        </div>
    );
}