import Image from "next/image"

interface Props {
    iconSrc: string,
    open: () => any,
    acessibilityLabel:string;
}


export const SearchIcon = ({ iconSrc, open, acessibilityLabel }: Props) => {
    return (
        <span className="w-12 h-12 flex justify-center rounded-full dark:bg-secondary cursor-pointer items-center bg-primary" onClick={() =>{

            open()
            
        } }> <img src={iconSrc} alt={acessibilityLabel} /></span>
    )
}