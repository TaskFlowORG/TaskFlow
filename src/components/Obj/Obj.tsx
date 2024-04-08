"use client"

import { archiveToSrc } from "@/functions";
import { Group, TaskPage, User } from "@/models";
import { SimpleUserGet } from "@/models/user/user/SimpleUserGetDTO";
import Link from "next/link";
import { ComponentProps, useState } from "react";


interface Props{
    objs: Group[] | User[] | SimpleUserGet[]| TaskPage[] | string[],
    max: number,
    functionObj: (o: Object) => void;
    color?:boolean;
}

export const Obj = ({ objs = [], max, functionObj, color }: Props) => {
    const [isHovering, setIsHovering] = useState<boolean>(false)

    const classes = `rounded-full xl:w-8 xl:h-8 lg:w-6 lg:h-6 md:w-4 md:h-4 w-3 h-3 xl:-mr-4 lg:-mr-3 md:-mr-2 -mr-1 text-[10px] md:text-[14px] lg:text-[18px]  xl:text-[32px]
   -mr-4 text-white overflow-clip flex shadow-[0_0_4px_1px_rgba(0,0,0,0.1)] items-center justify-center ` + (color ? "bg-white dark:bg-back-grey" : " bg-primary dark:bg-secondary ")


    return (
        <div className="flex justify-center z-20 absolute xl:right-5 lg:right-4 md:right-3 right-5  top-1 " onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            {
                objs.map((o, index) => {
                    if (index == max+1 && !isHovering) {
                        return <div className={classes} key={index}>+</div>
                    }else if(index > max && !isHovering){
                        return <></>
                    }else {
                        if(o instanceof TaskPage){
                            return <div className={classes} key={index} title={o.task.name ?? "Sem Nome"}></div>
                        }else if (o instanceof User || o instanceof SimpleUserGet) {
                            return <div className={classes} key={index} title={o.name ?? "Sem Nome"}> {o.picture && <img src={archiveToSrc(o.picture)} />}</div>
                        }else if (o instanceof Group){
                            return <div className={classes} key={index} title={(o as Group).name ?? "Sem Nome"}>{(o as Group).picture && <img src={archiveToSrc((o as Group).picture)} />}</div>
                        }else{
                            return <div className={classes} style={{backgroundColor:o}} onClick={() => functionObj(o)} key={index} title={o}>{o == "+" ? o :  ""}</div>

                        }
                    }
                })
            }
        </div>
    )
}