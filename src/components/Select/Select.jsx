'use client'

import { useState } from "react"

export const Select = ({ options, defaultValue, change }) => {

    useState(() => {
    }, [defaultValue, options])

    return (
        <div className="h-min w-fit relative">
            <select className="appearance-none bg-transparent p-4 outline-none border-[2px] border-primary rounded-sm text-primary text-center w-full pr-20"
                onChange={e => change(e.target.value)} defaultValue={defaultValue}>
                {options.map((o, index) => {
                    return <option value={o} key={index} className="w-full text-center">{o}</option>
                })}
            </select>
            <div className=" border-l-[2px] border-primary -z-[10] w-16 top-0 right-0 h-full absolute flex justify-center text-2xl items-center font-bold text-primary font-mono ">
                <span className=" rotate-90">{">"}</span>            
                </div>
        </div>
    )
}