interface Props{
    groups:Array<Group>,
    max:number
}
interface Group{
    id:number,
    image:string
}


export const Groups = ({ groups, max }:Props) => {
    const style = "rounded-full -m-6 w-8 h-8 bg-primary dark:bg-secondary text-white overflow-clip flex shadow-blur-10 items-center justify-center";
    return (
        <div className="flex justify-center">
            {
                groups.length <= max ?
                    groups.map(g => {
                        // Falta Navegação para Pagina de grupo
                        return <div className={style} key={g.id}> {g.image && <img src={g.image} />}</div>
                    })
                    :
                    groups.map(g => {
                        if (groups.indexOf(g) > max) {
                            return <div className={style} key={g.id} > {g.image && <img src={g.image} />}</div>
                        } else if (groups.indexOf(g) == max) {
                            return <div className={style} key={g.id} >+</div>
                        }
                    })
            }
        </div>
    )
}