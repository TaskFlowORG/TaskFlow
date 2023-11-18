'use client'
import { useEffect } from "react"
import { useState } from "react"

export const LandingPageCardContent = ({ title, text, color }) => {


    return (
        <div className="w-full flex flex-col gap-12">
            <h3 className={color}>{title}</h3>
            <p>{text}</p>
        </div>
    )
}