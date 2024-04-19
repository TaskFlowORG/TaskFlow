import Image from "next/image"
import { twMerge } from "tailwind-merge";

interface Props {
    icon: React.ReactNode,
    open: () => any,
    acessibilityLabel:string;
    invert?: boolean;
}


export const SearchIcon = ({ icon, open, acessibilityLabel, invert }: Props) => {
    const classes = twMerge("w-12 h-12 flex justify-center rounded-full p-3 cursor-pointer items-center ", 
    invert ? "bg-contrast" : "bg-primary dark:bg-secondary")
    return (
        <span className={classes} onClick={() =>{

            open()
            
        } }> {icon}</span>
    )
}