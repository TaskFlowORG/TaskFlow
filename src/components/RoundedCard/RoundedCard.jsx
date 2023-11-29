
'use client'

import { useEffect, useState } from "react";
import { CardContent } from "../CardContent/CardContent";
import { getListData } from "@/services/http/api";


export const RoundedCard = ({ color, children, changeImage, choose}) => {


    const style = {
        borderColor: color ? color : "#FF0000"
    }
    let hasProperty = true;

        return (

            <div style={style} className={`${choose} border-l-8   shadowww w-full min-w-[300px]  rounded-lg bg-[#FCFCFC] p-4 flex flex-col justify-between gap-4 max-w-[440px]`} onClick={()=>{
                changeImage()
            }}>
               {children}
            </div>
        )



   
}