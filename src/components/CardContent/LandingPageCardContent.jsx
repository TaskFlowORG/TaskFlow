'use client'
import { useEffect } from "react"
import { useState } from "react"

export const LandingPageCardContent = ({ title, text, color }) => {


    return (
        <div className="w-full flex flex-col gap-4 md:gap-12">
            <h3 className={" text-[24px]   md:text-[32px] " + color}>{title}</h3>
            <p className=" text-[12px] font-montserrat md:text-[16px]"> {text}</p>
        </div>
    )
}