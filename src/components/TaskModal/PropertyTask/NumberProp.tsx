"use client";

import { useState } from "react";
type Props = {
  id: number;
};


export const NumberProp = ({ id }: Props) => {
  const [valued, setValued] = useState<number>();
  return (
    <div className="flex">
      <input
        className=" input-number  max-w-[100px] text-center py-1 px-3 text-black dark:text-white border-y-2  focus:dark:border-zinc-400 focus:border-zinc-500 border-zinc-200 outline-none dark:border-zinc-600 text-sm"
        placeholder="Insira o número esperado"
        type="number"
        name=""
        value={valued}
        onChange={(e) => {
          setValued(parseInt(e.target.value));
        }}
        id={`prop${id}`}
      />
      <span
        onClick={() => {
          setValued(valued ? valued - 1 : -1);
        }}
        className="bg-primary dark:bg-secondary bah rounded-l-lg w-6 relative -order-1"
      >
        <p className="absolute  text-white left-1/2 top-[6px] leading-none -translate-x-1/2">
          -
        </p>
      </span>

      <span
        onClick={() => {
          setValued(valued ? valued + 1 : 1);
          // change(valued ? valued + 1 : 1);
        }}
        className="bg-primary dark:bg-secondary bah rounded-r-lg w-6 relative right"
      >
        <p className="absolute  text-white leading-none left-1/2 top-[6px] -translate-x-1/2">
          +
        </p>
      </span>
    </div>
  );
};
