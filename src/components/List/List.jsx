import { Tag } from "../CardContent/CardProperties"
import { If } from "../If"

export const List = ({ list, icon, headName, multivalued, justName, property }) => {

    function getValuedProp(l, property){
        for(let lp of l.uniProperties){
            if(lp.property.id == property.id){
                return lp;
            }
        }
        for(let lp of l.multiProperties){
            if(lp.property.id == property.id){
                return lp;
            }
        }
        for(let lp of l.userProperties){
            if(lp.property.id == property.id){
                return lp;
            }
        }
    }
    return (

        <div className="w-full h-full p-2  min-w-[150px] bg-white dark:bg-modal-grey shadow-blur-10 flex flex-col items-start rounded-sm truncate">

            <div className="flex gap-4 p-3 h-20 items-center justify-start truncate text-modal-grey dark:text-white">
                {icon}
                <p>{headName}</p>
            </div>
            <div className="h-full overflow-auto w-full ">

                <If condition={justName}>
                    {list.map((l) => {
                        return <div key={l.id} className="w-full py-4 px-3 border-zinc-400 dark:border-zinc-800 border-t-2 justify-start text-zinc-400 items-center flex flex-wrap truncate">{l.name}</div>
                    })}
                    {list.map((l) => {
                        const prop =  getValuedProp(l, property);
                        if(prop.property.type == "CHECKBOX" || prop.property.type == "TAG"){
                            return (<div key={l.id} className="w-full py-4 px-3 border-zinc-400 dark:border-zinc-800 border-t-2 justify-start text-zinc-400 items-center flex flex-wrap truncate">
                                    {prop.value.map(v => {
                                        //Logica que to com preguiça de fazer
                                    })}
                                </div>)
                        }
                        return <div key={l.id} className="w-full py-4 px-3 border-zinc-400 dark:border-zinc-800 border-t-2 justify-start text-zinc-400 items-center flex flex-wrap truncate">{prop.value}</div>

                    })}
                </If>
            </div>

        </div>
    )
}