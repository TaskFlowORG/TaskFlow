"use client"

import { archiveToSrc } from "@/functions";
import { Group, TaskPage, User } from "@/models";
import { SimpleUserGet } from "@/models/user/user/SimpleUserGetDTO";
import Link from "next/link";
import { useState } from "react";

interface Props {
    objs: Group[] | User[] | SimpleUserGet[]| TaskPage[],
    max: number,
    functionObj: (o: Object) => void;
}



export const Obj = ({ objs = [], max, functionObj }: Props) => {
    function getIndex(o: Group| User | SimpleUserGet| TaskPage):number{
        for(let i = 0; i < objs.length; i++){
            if(objs[i].equals(o)) return i
        }
        return 0;
    }
    const [isHovering, setIsHovering] = useState<boolean>()
    return (
        <div className="flex justify-center z-20 relative" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            {
                objs.map(o => {
                    if (getIndex(o) == max && !isHovering) {
                        return <div className="rounded-full absolute w-8 h-8 bg-primary dark:bg-secondary text-white overflow-clip flex shadow-blur-10 items-center justify-center" key={0}>+</div>
                    }else if(getIndex(o) > max && !isHovering){
                        return <></>
                    }else {
                        if(o instanceof TaskPage){
                            return <div className="rounded-full absolute w-8 h-8 bg-primary dark:bg-secondary text-white overflow-clip flex shadow-blur-10 items-center justify-center" key={o.id} title={o.task.name ?? "Sem Nome"}></div>
                        }else if (o instanceof User || o instanceof SimpleUserGet) {
                            return <div className="rounded-full absolute w-8 h-8 bg-primary dark:bg-secondary text-white overflow-clip flex shadow-blur-10 items-center justify-center" key={o.username} title={o.name ?? "Sem Nome"}> {o.picture && <img src={archiveToSrc(o.picture)} />}</div>
                        }else{
                            return <div className="rounded-full absolute w-8 h-8 bg-primary dark:bg-secondary text-white overflow-clip flex shadow-blur-10 items-center justify-center" key={o.id} title={o.name ?? "Sem Nome"}>{o.picture && <img src={archiveToSrc(o.picture)} />}</div>
                        }
                    }
                })
            }
        </div>
    )
}