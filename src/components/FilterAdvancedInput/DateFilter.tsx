import { useState, useEffect } from "react";

interface DateProps {
  id: number;
  name: string;
  value: string;
}

export const DateFilter = ({ name, value, id }: DateProps) => {
  const [valued, setValued] = useState("");

  useEffect(() => {
    setValued(value ?? "");
  }, [value]);

  return (
    <div className="flex gap-4 w-full items-center justify-between border-b-[1px]  pb-2">
      <p className=" text-black dark:text-white">{name}:</p>
      <input
        className="flex-1 py-1 px-3 relative text-black dark:text-white border-2 focus:dark:border-zinc-400 focus:border-zinc-500 border-zinc-200 outline-none dark:border-zinc-600 rounded-lg text-sm"
        type="date"
        value={valued}
        placeholder="Insira uma data"
        onChange={(e) => setValued(e.target.value)}
        name=""
        id={`prop${id}`}
      />
    </div>
  );
};
