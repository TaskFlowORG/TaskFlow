import Image from "next/image"

interface Props {
    iconSrc: string,
    action: () => any
    open: () => any
}


export const SearchIcon = ({ iconSrc, action, open }: Props) => {
    return (
        <span className="w-12 h-12 flex justify-center rounded-full dark:bg-secondary cursor-pointer items-center bg-primary" onClick={() =>{

            open()
            
        } }> 
        <span className="w-full h-full relative m-3">

        <Image fill src={iconSrc} alt="ícon of searchbar" />
        </span>
        </span>
    )
}