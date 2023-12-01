

import { useTheme } from "next-themes";
import { ReactNode } from "react";
interface Props {
    color?: String,
    dark?: String,
    children?: ReactNode,
    changeImage?: () => void,
    choose?: String
}

export const RoundedCard = ({ color, dark, children, changeImage, choose }: Props) => {

    const { theme, setTheme } = useTheme()
    let style: Object = {}

    if (theme == "light") {
        style = {
            borderColor: color ? color : "#0000FF"
        }
    } else {
        style = {
            borderColor: dark ? dark : (color ? color : "#FF0000")
        }
    }



    return (

        <div style={style} className={` border-l-8  dark:bg-modal-grey shadowww w-full min-w-[300px]  rounded-lg bg-white p-4 flex flex-col justify-between gap-4 max-w-[440px]`} onClick={() => {
            changeImage && changeImage()
        }}>
            {children}
        </div>
    )




}