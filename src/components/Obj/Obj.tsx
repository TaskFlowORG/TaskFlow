"use client"

import { Group } from "@/model/Group";
import { TaskCanvas } from "@/model/relations/TaskCanvas";
import { User } from "@/model/User";
import Link from "next/link";
import { useState } from "react";

interface Props {
    objs: Array<Group | User | TaskCanvas>,
    max: number,
    functionObj: (o: Object) => void;
}


export const Obj = ({ objs, max, functionObj }: Props) => {
    const [isHovering, setIsHovering] = useState<boolean>()
    return (
        <div className="flex justify-center z-20" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(true)}>
            {
                objs.map(o => {
                    if (objs.indexOf(o) == max && !isHovering) {
                        return <div className="rounded-full w-8 h-8 bg-primary dark:bg-secondary text-white overflow-clip flex shadow-blur-10 items-center justify-center" key={o.id}>+</div>
                    }else if(objs.indexOf(o) > max && !isHovering){
                        return <></>
                    }else {
                        if(o instanceof TaskCanvas){
                            return <div className="rounded-full w-8 h-8 bg-primary dark:bg-secondary text-white overflow-clip flex shadow-blur-10 items-center justify-center" key={o.id} title={o.task.name ?? "Sem Nome"}></div>
                        }else{
                            return <div className="rounded-full w-8 h-8 bg-primary dark:bg-secondary text-white overflow-clip flex shadow-blur-10 items-center justify-center" key={o.id} title={o.name ?? "Sem Nome"}> {o.picture && <img src={o.picture} />}</div>
                        }
                    }
                })
            }
        </div>
    )
}