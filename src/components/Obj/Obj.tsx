import { Group } from "@/model/Group";
import Link from "next/link";

interface Props{
    objs:Array<Group>,
    max:number,
    functionObj:(o:Object) => void;
}


export const Obj = ({ objs, max, functionObj }:Props) => {
    const style = "rounded-full -m-6 w-8 h-8 bg-primary dark:bg-secondary text-white overflow-clip flex shadow-blur-10 items-center justify-center";
    return (
        <div className="flex justify-center">
            {
                objs.length <= max ?
                    objs.map(o => {
                        if(o instanceof Group){
                            o = (o as Group)
                        }
                        // Falta Navegação para Pagina de grupo
                        return <div className={style} onClick={() => functionObj(o)} key={o.id} title={o.name}> {o.picture && <img src={o.picture} />}</div>
                    })
                    :
                    objs.map(o => {
                        if(o instanceof Group){
                            o = (o as Group)
                        }
                        if (objs.indexOf(o) > max) {
                            return <div className={style} key={o.id}> {o.picture && <img src={o.picture} />}</div>
                        } else if (objs.indexOf(o) == max) {
                            return <div className={style} key={o.id}>+</div>
                        }
                    })
            }
        </div>
    )
}