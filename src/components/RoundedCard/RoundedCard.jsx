
import { useEffect, useState } from "react";
import { CardContent } from "../CardContent/CardContent";
import { getListData } from "@/services/http/api";
import { useTheme } from "next-themes";


export const RoundedCard = ({ color, dark, children, changeImage, choose}) => {

    const {theme, setTheme} = useTheme()
    let style = null;

    if (theme=="light"){
         style = {
            borderColor: color ? color : "#0000FF"
        }
    } else {
         style = {
            borderColor: dark ? dark : (color ? color :"#FF0000")
        }
    }


    let hasProperty = true;

        return (

            <div style={style}  className={` border-l-8  dark:bg-modal-grey shadowww w-full min-w-[300px]  rounded-lg bg-white p-4 flex flex-col justify-between gap-4 max-w-[440px]`} onClick={()=>{
                changeImage()
            }}>
               {children}
            </div>
        )



   
}