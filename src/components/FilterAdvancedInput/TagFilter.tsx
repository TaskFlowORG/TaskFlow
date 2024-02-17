import { Tag } from "../CardContent/CardProperties/Tag"

export const TagFilter = () => {
  return (
    <div>
      <p>Luka ta doiding nas tags</p>
<div className="flex gap-4 overflow-scroll">
{Array.from([1,21,2,32,3,33]).map(()=>{
        return <Tag value="lçsd" key={"a"}/>
      })}
</div>
     
    </div>
  )
}