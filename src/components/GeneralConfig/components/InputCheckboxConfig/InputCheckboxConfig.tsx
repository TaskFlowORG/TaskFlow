import Cookies from "js-cookie";
import { useEffect } from "react";

interface Props{
    checked: boolean;
    func: (e: any, value: string) => void;
    value: string;
    label: string;
}

export const InputCheckboxConfig = ({checked, func, value, label}:Props) => {

    
    return (
        <div className="flex items-center w-full">
            <input
                type="checkbox"
                className=" min-w-[2.2vh] min-h-[2.2vh] w-full h-full"
                id={value}
                checked={checked}
                onChange={(e) => func(e, value)}
            />
            <p className="text-p font-montserrat pl-4 ">{label}</p>
        </div>
    )
}