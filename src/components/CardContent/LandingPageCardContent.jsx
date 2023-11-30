'use client'
import { useEffect } from "react"
import { useState } from "react"
import { useTheme } from "next-themes";

export const LandingPageCardContent = ({ title, text, dark, color }) => {

    const {theme, setTheme} = useTheme()
    let style = null;

    if (theme=="light"){
         style = {
            color: color ? color : "#0000FF"
        }
    } else {
         style = {
            color: dark ? dark : (color ? color :"#FF0000")
        }
    }

    return (
        <div className="w-full  flex flex-col gap-4">
            <h3 style={style} className={ " text-[24px]   md:text-[32px] " + color }>{title}</h3>
            <p className=" text-[12px] font-montserrat md:text-[16px] text-modal-grey dark:text-white"> {text}</p>
        </div>
    )
}