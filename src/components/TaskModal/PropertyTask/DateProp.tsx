import { useState } from "react";
type Props = {
  id:number
}
export const DateProp = ({id}:Props) => {
  const [valued, setValued] = useState("");
  return (
    <input
    className="flex-1 py-1 px-3 relative text-black dark:text-white border-2 focus:dark:border-zinc-400 focus:border-zinc-500 border-zinc-200 outline-none dark:border-zinc-600 rounded-lg text-sm"
    type="date"
    value={valued}
    placeholder="Insira uma data"
    onChange={(e) => {
      setValued(e.target.value);
      
    }}
    name=""
    id={`prop${id}`}
  />
  )

}