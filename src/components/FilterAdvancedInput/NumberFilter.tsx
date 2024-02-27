import { useState, useEffect } from "react";

interface Props {
  id: number;
  name: string;
  value: number;
}

export const NumberFilter = ({ id, value, name }: Props) => {
  const [valued, setValued] = useState(0);

  useEffect(() => {
    setValued(value ?? 0);
  }, [value]);

  return (
    <div className="text-black dark:text-white cursor-all-scroll">
      <p>{name}</p>
      <div className="flex py-2 w-full max-w-1/2">
        <input
          className=" input-number flex-1 py-1 px-3 text-black dark:text-white border-y-2  focus:dark:border-zinc-400 focus:border-zinc-500 border-zinc-200 outline-none dark:border-zinc-600 text-sm"
          placeholder="Insira o número esperado"
          type="number"
          name=""
          value={valued}
          onChange={(e) => setValued(parseInt(e.target.value))}
          id={`prop${id}`}
        />
        <span
          onClick={() => setValued((prev) => prev - 1)}
          className="bg-primary bah rounded-l-lg w-6 relative -order-1"
        >
          <p className="absolute left-1/2 top-[5px] leading-none -translate-x-1/2">
            -
          </p>
        </span>

        <span
          onClick={() => setValued((prev) => prev + 1)}
          className="bg-primary bah rounded-r-lg w-6 relative right"
        >
          <p className="absolute leading-none left-1/2 top-[5px] -translate-x-1/2">
            +
          </p>
        </span>
      </div>
    </div>
  );
};
