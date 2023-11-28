import { Tag } from "../CardContent/CardProperties"

export const List = ({ list, icon, headName, multivalued }) => {
    return (

        <div className="w-min min-w-[150px] h-min p-2 bg-white shadow-blur-10 flex flex-col items-start rounded-sm">
            <div className="flex p-3 gap-4 items-center justify-start">
                <img src={icon} alt="" className="h-[20px]" />
                <p>{headName}</p>
            </div>
            {list.map((l, index) => {
                return <div className="w-full max-h-[96px] overflow-auto gap-px flex flex-wrap border-t-2  p-2 items-center" key={index}> 
                    {multivalued ?
                        l.map((v, i) => <Tag key={i} />)
                        :
                        <div key={index} className="w-full justify-start text-zinc-400 items-center flex flex-wrap" style={{backgroundColor:l.color}}>{l.value}</div>
                        }
                </div>
            })}
        </div>
    )
}