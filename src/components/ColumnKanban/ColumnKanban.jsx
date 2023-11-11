import { RoundedCard } from "@/components/RoundedCard/RoundedCard"

export const ColumnKanban = ({color}) => {
return (
    <div className="w-[18%] flex flex-col gap-6 p-16 brightness-[0.95] hover:brightness-[1]">
    <div className="flex gap-6 items-center">
      <span className={`w-2 h-2 rounded-full bg-[${color}]`}></span>
      <h4>To Do</h4>
    </div>
    <RoundedCard color={color} />
    <RoundedCard color={color} />


  </div>
)
}