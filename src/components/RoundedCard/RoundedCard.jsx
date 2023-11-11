
'use client'

import { useEffect } from "react";
import { CardContent } from "../CardContent/CardContent";


export const RoundedCard = ({color}) => {



 const style = {
    borderColor: color
 }

    let hasProperty = true;
    return (

        <div style={style} className= {` border-l-8   shadowww w-full  rounded-lg bg-[#FCFCFC] p-4 flex flex-col gap-4 max-w-[362px]`}>
            <CardContent />
        </div>
    )
}