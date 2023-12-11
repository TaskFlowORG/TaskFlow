import Link from "next/link";

interface Props{
    objs:Array<Obj>,
    max:number,
    functionObj:(o:Obj) => void;
}
interface Obj{
    id:number,
    image:string,
    name:string
}


export const Obj = ({ objs, max, functionObj }:Props) => {
    const style = "rounded-full -m-6 w-8 h-8 bg-primary dark:bg-secondary text-white overflow-clip flex shadow-blur-10 items-center justify-center";
    return (
        <div className="flex justify-center">
            {
                objs.length <= max ?
                    objs.map(o => {
                        // Falta Navegação para Pagina de grupo
                        return <div className={style} onClick={() => functionObj(o)} key={o.id} title={o.name}> {o.image && <img src={o.image} />}</div>
                    })
                    :
                    objs.map(o => {
                        if (objs.indexOf(o) > max) {
                            return <div className={style} key={o.id} > {o.image && <img src={o.image} />}</div>
                        } else if (objs.indexOf(o) == max) {
                            return <div className={style} key={o.id} >+</div>
                        }
                    })
            }
        </div>
    )
}