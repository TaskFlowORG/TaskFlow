import { useState, useEffect } from "react";
import { Input } from "../Input";

interface Props {
  id: number;
  name: string;
  value: string;
}

export const TextFilter = ({ id, name, value }: Props) => {
  const [valued, setValued] = useState("");

  useEffect(() => {
    setValued(value ?? "");
  }, [value]);
  return (
    <div className="flex gap-4 w-full items-center border-b-2 pb-2">
      <p className=" text-black dark:text-white">{name}:</p>

      <input
        className="flex-1 py-1 px-3 text-black dark:text-white border-2 focus:dark:border-zinc-400 focus:border-zinc-500 border-zinc-200 outline-none dark:border-zinc-600 rounded-lg text-sm"
        placeholder="Insira o valor esperado"
        value={valued}
        onChange={(e) => setValued(e.target.value)}
        type="text"
        id={`prop${id}`}
      />
    </div>
  );
};
