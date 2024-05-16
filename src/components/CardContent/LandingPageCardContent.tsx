'use client'
import { useEffect } from "react"
import { useState } from "react"
import { useTheme } from "next-themes";
interface Props {
    title: string,
    text?: string,
    dark?: string,
    color?: string
}
export const LandingPageCardContent = ({ title, text, dark, color }: Props) => {

    const { theme } = useTheme()
    let style = null;

    if (theme == "light") {
        style = {
            color: color ? color : "#0000FF"
        }
    } else {
        style = {
            color: dark ? dark : (color ? color : "#FF0000")
        }
    }

    return (
        <div className="w-full  flex flex-col gap-4">
            <h3 style={style} className={" text-h4 lg:text-h3 font-alata " + color}>{title}</h3>
            <p className=" text-xs font-montserrat md:text-p text-modal-grey leading-relaxed dark:text-white"> {text}</p>
        </div>
    )
}