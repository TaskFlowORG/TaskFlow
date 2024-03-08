"use client"

import { archiveToSrc } from "@/functions";
import { Group, TaskPage, User } from "@/models";
import { SimpleUserGet } from "@/models/user/user/SimpleUserGetDTO";
import Link from "next/link";
import { ComponentProps, useState } from "react";

interface Props extends ComponentProps<'div'>{
    objs: Group[] | User[] | SimpleUserGet[]| TaskPage[],
    max: number,
    functionObj: (o: Object) => void;
}



export const Obj = ({ objs = [], max, functionObj }: Props) => {
    const [isHovering, setIsHovering] = useState<boolean>(false)

    const classes = `rounded-full xl:w-8 xl:h-8 lg:w-6 lg:h-6 md:w-4 md:h-4 w-3 h-3 xl:-mr-4 lg:-mr-3 md:-mr-2 -mr-1 text-[10px] md:text-[14px] lg:text-[18px]  xl:text-[32px]
    bg-primary dark:bg-secondary -mr-4 text-white overflow-clip flex shadow-[0_0_4px_1px_rgba(0,0,0,0.1)] items-center justify-center`

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
                        }else{
                            return <div className={classes} key={index} title={o.name ?? "Sem Nome"}>{o.picture && <img src={archiveToSrc(o.picture)} />}</div>
                        }
                    }
                })
            }
        </div>
    )
}