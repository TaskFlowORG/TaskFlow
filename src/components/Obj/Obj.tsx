import { Group } from "@/model/Group";
import { User } from "@/model/User";
import Link from "next/link";

interface Props {
    objs: Array<Group | User>,
    max: number,
    functionObj: (o: Object) => void;
}


export const Obj = ({ objs, max, functionObj }: Props) => {
    const style = "rounded-full  w-8 h-8 bg-primary dark:bg-secondary text-white overflow-clip flex shadow-blur-10 items-center justify-center";
    return (
        <div className="flex justify-center">
            {
                objs.map(o => {
                    if (objs.indexOf(o) < max) {
                        return <div className={style} key={o.id} title={o.name}> {o.picture && <img src={o.picture} />}</div>
                    } else if (objs.indexOf(o) == max) {
                        return <div className={style} key={o.id}>+</div>
                    }
                })
            }
        </div>
    )
}